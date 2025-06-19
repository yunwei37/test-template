# API Endpoints

Complete reference for all available API endpoints.

## Base URL

All API requests should be made to:
```
https://api.example.com/v1
```

## Users

### Get User Profile

```http
GET /users/me
```

**Response:**
```json
{
  "id": 12345,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-01-01T00:00:00Z"
}
```

### Update User Profile

```http
PUT /users/me
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

## Posts

### List Posts

```http
GET /posts
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of posts per page (default: 10)
- `tag` (optional): Filter by tag

**Response:**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "My First Post",
      "content": "Post content...",
      "tags": ["tech", "web"],
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_posts": 50
  }
}
```

### Create Post

```http
POST /posts
```

**Request Body:**
```json
{
  "title": "New Post Title",
  "content": "Post content in markdown",
  "tags": ["tag1", "tag2"]
}
``` 