# Posts API Reference

Complete reference for post-related API endpoints.

## Post Object

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post...",
  "excerpt": "A brief excerpt of the post",
  "slug": "my-first-post",
  "status": "published",
  "author_id": 12345,
  "tags": ["technology", "programming"],
  "featured_image": "https://example.com/image.jpg",
  "published_at": "2023-01-01T10:00:00Z",
  "created_at": "2023-01-01T09:00:00Z",
  "updated_at": "2023-01-01T10:00:00Z"
}
```

## List Posts

Retrieve a list of posts with optional filtering and pagination.

**Endpoint:** `GET /api/v1/posts`

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `per_page` (integer, optional): Posts per page (default: 10, max: 50)
- `status` (string, optional): Filter by status (`draft`, `published`, `archived`)
- `author_id` (integer, optional): Filter by author ID
- `tag` (string, optional): Filter by tag
- `search` (string, optional): Search in title and content

**Example Request:**
```bash
curl -X GET "https://api.example.com/v1/posts?status=published&tag=technology" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Get Post by ID

Retrieve a specific post by its ID.

**Endpoint:** `GET /api/v1/posts/{id}`

**Path Parameters:**
- `id` (integer, required): The post ID

## Create Post

Create a new post.

**Endpoint:** `POST /api/v1/posts`

**Request Body:**
```json
{
  "title": "New Post Title",
  "content": "Full content of the post in markdown format",
  "excerpt": "Brief description of the post",
  "status": "draft",
  "tags": ["tag1", "tag2"],
  "featured_image": "https://example.com/image.jpg"
}
```

## Update Post

Update an existing post.

**Endpoint:** `PUT /api/v1/posts/{id}`

**Path Parameters:**
- `id` (integer, required): The post ID

**Request Body:** Same as create post

## Delete Post

Delete a post.

**Endpoint:** `DELETE /api/v1/posts/{id}`

**Path Parameters:**
- `id` (integer, required): The post ID 