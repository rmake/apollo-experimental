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

### experimental

```
https://github.com/login/oauth/authorize?client_id=YOUR-ID-HERE&scope=user
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

```
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
