

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

```
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
