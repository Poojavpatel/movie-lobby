# Movie lobby

## To setup and run API on local

Node version : v18.18.2  
Mongod version : v7.0.2

```bash
gh repo clone Poojavpatel/movie-lobby # clone the git repo
cd movie-lobby                        # cd to codebase
npm install                           # install all dependencies
npm run setupDB                       # (Optional) Creates dummy db entries
npm run dev                           # starts server
```

## To verify server running correctly

To verify if server is running correctly  
Visit http://localhost:8080/ in a browser  
Or send request to `GET localhost:8080/` from postman

```ts
// Expected response
{
  message: "Hello, welcome to Movie lobby!";
}
```

## API Documentation

### List all the movies in the lobby

```ts
// Route:
GET localhost:8080/movies

// Sample success response:
[
  {
    "_id": "65a116828c183b1918848656",
    "title": "Dhamaal",
    "genre": "COMEDY",
    "rating": 9.2,
    "streamingLink": "https://www.imdb.com/title/tt0845448/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_dhamaal",
    "updatedAt": "2024-01-12T15:04:24.569Z"
  },
  {
    "_id": "65a116828c183b1918848657",
    "title": "Chup chup ke",
    "genre": "COMEDY",
    "rating": 8.5,
    "streamingLink": "https://www.imdb.com/title/tt0464160/"
  }
]
```

### Search for a movie by title or genre

```ts
// Route:
GET localhost:8080/search?q=met

// Sample success response:
[
  {
    "_id": "65a116828c183b191884865a",
    "title": "Jab we met",
    "genre": "ROMANCE",
    "rating": 7.9,
    "streamingLink": "https://www.imdb.com/title/tt1093370/?ref_=nv_sr_srsg_0_tt_6_nm_1_q_jab%2520we%2520met"
  }
]

// Sample error response:
{
  "error": "Invalid request",
  "body": "query is empty"
}
```

### Add a new movie to the lobby

```ts
// Route:
POST localhost:8080/movies

// Headers:
{Authorization : adminToken}

// Sample request body (raw json):
{
  "title" : "Run",
  "genre": "ROMANCE"
}

// Sample success response:
{
  "message": "Movie added successfully"
}

// Sample error response:
{
  "error": "Invalid request",
  "body": "abc is not a valid enum."
}
```

### Update an existing movie's information

```ts
// Route:
PUT localhost:8080/movies/:id
PUT localhost:8080/movies/65a116828c183b1918848656

// Headers:
{Authorization : adminToken}

// Sample request body (raw json):
{
  "title": "Dhamaal 2"
}

// Sample success response:
{
  "message": "Movie updated successfully"
}

// Sample error response:
{
  "error": "Invalid request",
  "body": "No movie found with id 65a116828c183b1918848677"
}
```

### Delete a movie from the lobby

```ts
// Route:
DELETE localhost:8080/movies/:id
DELETE localhost:8080/movies/65a12d831aadbf655e6b303d

// Headers:
{Authorization : adminToken}

// Sample success response:
{
  "message": "Movie deleted successfully"
}

// Sample error response:
{
  "error": "Invalid request",
  "body": "No movie found with id 65a12d831aadbf655e6b30ff"
}
```

## To run testcases

```bash
npm run test
```
