
# query examples.


### connections

query
```
query {
  users {
    id
    photos {
      id
      postedBy {
        id
      }
      taggedUser {
        id
      }
    }
    friends {
      friends {
        id
      }
    }
  }
}
```

response
```
{
  "data": {
    "users": [
      {
        "id": "Hello World",
        "photos": [
          {
            "id": "Hello World",
            "postedBy": {
              "id": "Hello World"
            },
            "taggedUser": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          },
          {
            "id": "Hello World",
            "postedBy": {
              "id": "Hello World"
            },
            "taggedUser": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          }
        ],
        "friends": [
          {
            "friends": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          },
          {
            "friends": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          }
        ]
      },
      {
        "id": "Hello World",
        "photos": [
          {
            "id": "Hello World",
            "postedBy": {
              "id": "Hello World"
            },
            "taggedUser": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          },
          {
            "id": "Hello World",
            "postedBy": {
              "id": "Hello World"
            },
            "taggedUser": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          }
        ],
        "friends": [
          {
            "friends": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          },
          {
            "friends": [
              {
                "id": "Hello World"
              },
              {
                "id": "Hello World"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### union

query
```
query schedule {
  agendas {
    ...on Workout{
      name
      reps
    }
    ...on StudyGroup {
      name
      subject
      students {
        id
      }
    }
  }
}
```

response
```
{
  "data": {
    "agendas": [
      {
        "name": "Hello World",
        "subject": "Hello World",
        "students": [
          {
            "id": "Hello World"
          },
          {
            "id": "Hello World"
          }
        ]
      },
      {
        "name": "Hello World",
        "reps": 48
      }
    ]
  }
}
```

### interface

query

```
query {
  agendas2 {
    name
    start
    end
    ...on StudyGroup2 {
      participents {
      	id
    	}
      topic
    }
    ...on Workout2 {
      reps
    }
  }
}
```

response

```
{
  "data": {
    "agendas2": [
      {
        "name": "Hello World",
        "start": -14,
        "end": -71,
        "participents": [
          {
            "id": "Hello World"
          },
          {
            "id": "Hello World"
          }
        ],
        "topic": "Hello World"
      },
      {
        "name": "Hello World",
        "start": 44,
        "end": -6,
        "reps": -20
      }
    ]
  }
}

```
