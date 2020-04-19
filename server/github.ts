import { Db } from 'mongodb';
import fetch from 'cross-fetch';

const toJson = res => res.json();
const throwError = error => { console.log(error); throw new Error(JSON.stringify(error)) }

const requestGithubToken = credentials =>
  fetch('https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  )
    .then(toJson)
    .catch(throwError);

const requestGithubUserAccount = token =>
  fetch(`https://api.github.com/user?access_token=${token}`)
    .then(toJson)
    .catch(throwError);

const authrizeWithGithub = async (credentials) => {
  const { access_token } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
}

export const githubAuth = async (parent, { code }, { db }: { db: Db }) => {
  const {
    message,
    access_token,
    avatar_url,
    login,
    name,
  } = await authrizeWithGithub({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  });

  if (message) throw new Error(message);

  const latestUserInfo = {
    name,
    githubLogin: login,
    githubToken: access_token,
    avatar: avatar_url,
  };

  const { ops: [user] } = await db
    .collection('users')
    .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

  return { user, token: access_token }
}
