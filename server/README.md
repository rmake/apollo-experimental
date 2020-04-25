## examples

```
query {
  totalPhotos
}
```

```
mutation newPhoto {
  postPhoto(name: "sample photo")
}
```

### variable mutation

```
mutation newPhoto($name: String!, $description: String) {
  postPhoto(name: $name, description: $description)
}
```

```json
{
  "name": "name a",
  "description": "description a"
}
```

### type resolver

```
mutation newPhoto($name: String!, $description: String) {
  postPhoto(name: $name, description: $description) {
    id
    name
    description
  }
}
```

```
query listPhotos {
  allPhotos {
    id
    name
    description
    url
  }
}
```

### input type

```
mutation newPhoto($input: PostPhotoInput!) {
  postPhoto(input: $input) {
    id
    name
    url
    description
    category
  }
}
```

```json
{
  "input": {
    "name": "sample photo",
    "description": "A sample photo for examples."
  }
}
```

### edge and connection one-to-many

```
query photos {
  allPhotos {
    name
    url
    postedBy {
      name
    }
  }
}
```

```json
{
  "data": {
    "allPhotos": [
      {
        "name": "Dropping the Heart Chute",
        "url": "http://example.com/image/1.jpg",
        "postedBy": {
          "name": "Glen Plake"
        }
      },
      {
        "name": "Enjoying the sunshine",
        "url": "http://example.com/image/2.jpg",
        "postedBy": {
          "name": "Scot Schmidt"
        }
      },
      {
        "name": "Gunbarrel 25",
        "url": "http://example.com/image/3.jpg",
        "postedBy": {
          "name": "Scot Schmidt"
        }
      }
    ]
  }
}
```

### edge and connection many-to-many

```
query listPhotos {
  allPhotos {
    url
    taggedUsers {
      name
    }
  }
}
```

```json
{
  "data": {
    "allPhotos": [
      {
        "url": "http://example.com/image/1.jpg",
        "taggedUsers": [
          {
            "name": "Glen Plake"
          }
        ]
      },
      {
        "url": "http://example.com/image/2.jpg",
        "taggedUsers": [
          {
            "name": "Scot Schmidt"
          },
          {
            "name": "Mike Hattrup"
          },
          {
            "name": "Glen Plake"
          }
        ]
      },
      {
        "url": "http://example.com/image/3.jpg",
        "taggedUsers": []
      }
    ]
  }
}
```

## custom scalar

```
query listPhotos {
  allPhotos {
    name
    createdAt
  }
}
```

```json
{
  "data": {
    "allPhotos": [
      {
        "name": "Dropping the Heart Chute",
        "createdAt": "1977-03-27T15:00:00.000Z"
      },
      {
        "name": "Enjoying the sunshine",
        "createdAt": "1985-01-01T15:00:00.000Z"
      },
      {
        "name": "Gunbarrel 25",
        "createdAt": "2018-04-15T19:09:57.308Z"
      }
    ]
  }
}
```

```
query listPhotos {
  allPhotos(after: "2000/1/1") {
    name
    createdAt
  }
}
```

```json
{
  "data": {
    "allPhotos": [
      {
        "name": "Gunbarrel 25",
        "createdAt": "2018-04-15T19:09:57.308Z"
      }
    ]
  }
}
```

## github authorization

### Github 認可

### githubAuth mutation

```
https://github.com/login/oauth/authorize?client_id=c0f9aa1dac9249801791&scope=user
```

```
http://locahost:3000/?code=XYZ
```

```
mutation {
  githubAuth(code: "XYZ") {
    token
    user {
      githubLogin
      name
      avatar
    }
  }
}
```

```json
{
  "data": {
    "githubAuth": {
      "token": "ABC",
      "user": {
        "githubLogin": "dycoon",
        "name": "dycoon",
        "avatar": "https://avatars3.githubusercontent.com/u/553189?v=4"
      }
    }
  }
}
```

### ユーザーの認証

```json
{
  "Authorization": "<YOUR_TOKEN>"
}
```

```
query currentUser {
  me {
    githubLogin
    name
    avatar
  }
}
```

```json
{
  "data": {
    "me": {
      "githubLogin": "dycoon",
      "name": "dycoon",
      "avatar": "https://avatars3.githubusercontent.com/u/553189?v=4"
    }
  }
}
```

```
mutation post($input: PostPhotoInput!) {
  postPhoto(input: $input) {
    id
    url
    postedBy {
      name
      avatar
    }
  }
}
```

```json
{
  "input": {
    "name": "test name",
    "description": "test description"
  }
}
```

```json
{
  "data": {
    "postPhoto": {
      "id": "5ea3e7af06c39921eea5e4c5",
      "url": "/img/photos/5ea3e7af06c39921eea5e4c5.jpg",
      "postedBy": {
        "name": "Bently Harris",
        "avatar": "https://randomuser.me/api/portraits/thumb/men/14.jpg"
      }
    }
  }
}
```

```
query listPhotos {
  allPhotos {
    name
    postedBy {
      githubLogin
      name
      avatar
    }
    createdAt
  }
}
```

```
{
  "data": {
    "allPhotos": [
      {
        "name": "test name",
        "postedBy": {
          "githubLogin": "dycoon",
          "name": "dycoon",
          "avatar": "https://avatars3.githubusercontent.com/u/553189?v=4"
        },
        "createdAt": "2020-04-25T06:42:18.720Z"
      }
    ]
  }
}
```

### fake user mutation

```
mutation {
  addFakeUsers(count: 3) {
    githubLogin
    name
  }
}
```

```
{
  "data": {
    "addFakeUsers": [
      {
        "githubLogin": "silverlion931",
        "name": "Bently Harris"
      },
      {
        "githubLogin": "brownrabbit193",
        "name": "Kevin Welch"
      },
      {
        "githubLogin": "orangepeacock973",
        "name": "Beatriz Lefebvre"
      }
    ]
  }
}
```

```
mutation {
  fakeUserAuth(githubLogin: "silverlion931") {
    token
  }
}
```

```
{
  "data": {
    "fakeUserAuth": {
      "token": "eed4d82a01613ad5a8e3c338fdb4a5ec8a8ca252"
    }
  }
}
```
