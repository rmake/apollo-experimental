```
curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/ \
  --data '{"query":"query { query ExampleQuery { launches { id } me { id } } }"}'
```
