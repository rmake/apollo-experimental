

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

### edge and connection

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
