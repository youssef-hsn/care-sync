# Auth API Endpoints

## POST /api/auth/register
Register a new user account.

**Request Body:**
- `phone`: User's phone number (required)
- `password`: User's password (required)
- `fullName`: User's full name (required) - will be split into firstName and lastName

**Response:**
- `201 Created`: User successfully registered
    - Returns user data without sensitive information
- `400 Bad Request`: Invalid input data
- `409 Conflict`: User with the provided phone number already exists
- `500 Internal Server Error`: Server error during registration

## POST /api/auth/login
Authenticate a user and create a session.

**Request Body:**
- `phone`: User's phone number (required)
- `password`: User's password (required)

**Response:**
- `200 OK`: Successful login
    - Sets HTTP-only refresh token cookie
    - Returns access token and basic user information
- `400 Bad Request`: Missing credentials
- `401 Unauthorized`: Invalid credentials

## POST /api/auth/logout
End the current user session.

**Authentication Required:** Yes

**Response:**
- `200 OK`: Successfully logged out
    - Clears the refresh token cookie

## GET /api/auth/me
Retrieve the current authenticated user's information.

**Authentication Required:** Yes

**Response:**
- `200 OK`: Returns user data (excluding password)
- `401 Unauthorized`: Missing or invalid authentication
- `404 Not Found`: User not found

## POST /api/auth/refresh
Generate a new access token using the refresh token.

**Requirements:**
- Valid refresh token cookie

**Response:**
- `200 OK`: Returns new access token
- `400 Bad Request`: Missing refresh token
- `401 Unauthorized`: Invalid refresh token