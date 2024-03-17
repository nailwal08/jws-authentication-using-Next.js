# jws-authentication-using-Next.js

Description
This project implements JWT authentication for user login and signup functionalities with CryptoJS encrytion, usernames, emails, and passwords securely stored in MongoDB.

Features
User signup: Allows users to create an account by providing a username, email, and password.
User login: Allows registered users to log in with their email and password and name will be autopopulated.
JWT Authentication: Implements JSON Web Token (JWT) authentication for secure user authentication.
CryptoJS: For encrypting passwords.
MongoDB Storage: Utilizes MongoDB to securely store user information, including hashed passwords.
Toasts: For showing successful login/signup or other error responses.
Top loader: For better UI interface.

Technologies Used:
1. Next.js
2. MongoDB
3. JSON Web Tokens (JWT)
4. React toastify
5. React toploader

Installation
Clone the repository:
bash
npx create-next-app app
Install dependencies:
npm install cryptojs
npm install jsonwebtoken
npm install --save react-top-loading-bar
npm install --save react-toastify

Start the server:
Mongodb
npm run dev

Usage
Signup:
Go to (http://localhost:3000/authentication) OR the given URL and send a POST request to http://localhost:3000/api/signup with the following JSON body:

{
  "name": "username",
  "email": "user@example.com",
  "password": "demo@123"
}
Upon successful signup, the server will respond with a success message.

Login:
Go to (http://localhost:3000/authentication) OR the given URL and send a POST request to http://localhost:3000/api/login with the following JSON body:

{
  "email": "user@example.com",
  "password": "demo@123"
}
Upon successful login, the server will respond with a JWT token containing user information.
Access protected routes:

Include the JWT token in the authorization header of subsequent requests to access protected routes.

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, feature requests, or suggestions.

License
MIT License

We are not parsing the response in this code so there is no specific toast message about the errors that we used in our API's. Will add this parsing in future.
