

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

```
mutation newPhoto($name: $String!, $description: String) {
  postPhoto(name: $name, description: $description)
}
```

```
{
	"name": "name a",
  "description": "description a"   
}
```
