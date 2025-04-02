# API Documentation

## Base URL
`http://localhost:3000`

## Endpoints

### 1. Get All Blog Posts
**Endpoint:** `/posts`  
**Method:** `GET`  
**Description:** Fetches all blog posts from the database.  
**Response:**
```json
[
  {
    "_id": "unique-id",
    "title": "Post Title",
    "content": "Post Content",
    "author": "Author Name",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### 2. Create a New Blog Post
**Endpoint:** `/new-post`  
**Method:** `POST`  
**Description:** Adds a new blog post to the database.  
**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post Content",
  "author": "Author Name"
}
```
**Response:**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "unique-id",
    "title": "Post Title",
    "content": "Post Content",
    "author": "Author Name",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### 3. Delete a Blog Post
**Endpoint:** `/post/:id`  
**Method:** `DELETE`  
**Description:** Deletes a blog post by its ID.  
**Response:**
```json
{
  "message": "Post deleted successfully"
}
```

### 4. Update a Blog Post
**Endpoint:** `/post/edit/:id`  
**Method:** `PUT`  
**Description:** Updates a blog post by its ID.  
**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated Content",
  "author": "Updated Author"
}
```
**Response:**
```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "unique-id",
    "title": "Updated Title",
    "content": "Updated Content",
    "author": "Updated Author",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

## Error Responses
- **200 Success OK:** Resource found.
- **201 Success OK:** Resource updated.
- **400 Bad Request:** Invalid input data.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Server encountered an error.
