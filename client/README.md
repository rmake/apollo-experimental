```
curl -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{totalUsers, totalPhotos}" }' \
  http://localhost:4000/graphql
```

```js
const query = "{ totalPhotos, totalUsers }";
const url = "http://localhost:4000/graphql";
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
};

fetch(url, opts)
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);

fetch(url, opts)
  .then((res) => res.json())
  .then(
    ({ data }) => `
    <p>photos: ${data.totalPhotos}</p>
    <p>users: ${data.totalUsers}</p>
  `
  )
  .then((text) => (document.body.innerHTML = text))
  .catch(console.error);
```
