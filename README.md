This repository contains the backend implementation for a Voting App. The system allows users to create and participate in various voting events through a RESTful API. This backend manages user authentication, vote casting, and result tallying, among other functionalities. Built with scalability and performance in mind .

Backend Voting App 
Base URL: https://voting-app-am02.onrender.com/

This is a backend-only project in which you are provided a Voting Platform with no user interface (UI). To interact with this Project , you can use tools like Postman which can help you to test the API .

FEATURES:
First of all , it includes an endpoint where A User can signUp to the voting platform
The modelSchema for User signUp is :
{ "name" : "" ,"age": "", "Adhaar": "" , "email" : ""  , "mobile : "" , "address" : "" , "password" : ""  , "role" : [voter or admin]}

To register the candidate , the modelSchema is : 
{ "name" : "" ,"party": "", "age": ""} 
For Candidate Registration , Only a User who has a role of 'Admin' can add and update Candidates .

After registration of Users and candidates , A particular user can login to the app and then they will be provided a token which acts as an grant key for giving access for the user to vote , that means that the user can only vote if they have logged in and have a token , also, an Admin is not allowed to vote . 
After Voting , users can see the results by an endpoint given below , it will show the candidate names ,their party and their vote count.

Technicalities used in this project - 
User Authentication: Supports user signup, login, and helps generating JWT tokens.
User Authorization : Only the users who have token are authorized to vote and Only Admin is allowed to make changes in candidate Data.
Password Hashing : Password hashing guarantees that plaintext passwords are difficult for attackers to find, even in a situation where a database is compromised.

Endpoints - 
for user signUp POST /user/signup
for user login POST /user/login
for candidate Registration POST /candidate
for candidate Data GET /candidate
for voting a candidate POST /candidate/vote/:candidateId
for getting vote counts GET /candidate/vote/count
for editing candidate data PUT /candidate/:candidateId
for deleting candidate data DELETE /candidate/:candidateId
for getting User profile GET /user/profile
for editing User profile PUT /user/profile/password


Setup - Clone the repository. Install dependencies with 'npm install'. Use Postman or any API testing tool to interact with the backend endpoints. 

Testing To test the API:
1 . Create a User , give the user role  'Admin' .
2 . Now Copy the token generated and use this token for accessing the candidate manipulation .
3 . After doing registration of Candidates , you can allow more users to login who can vote to the candidates .
4 . At last , User can see the results .
