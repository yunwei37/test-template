# Users API Reference

Complete reference for user-related API endpoints.

## User Object

```json
{
  "id": 12345,
  "username": "johndoe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "avatar_url": "https://example.com/avatar.jpg",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-06-01T12:00:00Z"
}
```

## List Users

Retrieve a list of users with optional filtering and pagination.

**Endpoint:** `GET /api/v1/users`

**Query Parameters:**
- `page` (integer, optional): Page number for pagination (default: 1)
- `per_page` (integer, optional): Number of users per page (default: 20, max: 100)
- `search` (string, optional): Search users by username or email
- `is_active` (boolean, optional): Filter by active status

**Example Request:**
```bash
curl -X GET "https://api.example.com/v1/users?page=1&per_page=10&search=john" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 12345,
      "username": "johndoe",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "avatar_url": "https://example.com/avatar.jpg",
      "is_active": true,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-06-01T12:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 150,
    "total_pages": 15
  }
}
```

## Get User by ID

Retrieve a specific user by their ID.

**Endpoint:** `GET /api/v1/users/{id}`

**Path Parameters:**
- `id` (integer, required): The user ID

**Example Request:**
```bash
curl -X GET "https://api.example.com/v1/users/12345" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Create User

Create a new user account.

**Endpoint:** `POST /api/v1/users`

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword123",
  "first_name": "New",
  "last_name": "User"
}
```

**Example Request:**
```bash
curl -X POST "https://api.example.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com", 
    "password": "securepassword123",
    "first_name": "New",
    "last_name": "User"
  }'
``` 