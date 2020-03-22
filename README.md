
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
        friends {
          friends {
            id
          }
        }
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
            "id": "Hello World",
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
      },
      {
        "name": "Hello World",
        "reps": 2
      }
    ]
  }
}
```
