Backend Voting App 

Base URL: https://voting-app-am02.onrender.com/

This is a backend-only project for a Voting Platform with no user interface (UI). To interact with the API, you can use tools like Postman.

FEATURES:

User Authentication: Supports user signup, login, and authorization using JWT tokens.


User Authentication POST /user/signup pass data in body eg:-
{ "name" : "user" "username": "example_user", "password": "example_password" "role" : "user_role" }

Register a new user. POST /user/login Login and receive a token for authentication.

DNS Record Handling GET /custom/get/:domain/:record Fetch the DNS record (A or CNAME) for a specific domain. Example: /custom/get/www.example.com/A

PATCH /custom/update/:id Update an existing DNS entry (admin access required).

Setup Clone the repository. Install dependencies with npm install. Use Postman or any API testing tool to interact with the backend endpoints. Testing To test the API:

Authentication: First, log in with a valid user account to receive a token. Authorization: Include the token in the Authorization header or as a cookie for subsequent requests. DNS Record Retrieval: Use the /get endpoint to resolve domain names. Admin Actions: Admins can update DNS entries using the /update endpoint.
