# Luís Freitas - Bridge In Exercise

This project was made by Luís Freitas as an interview exercise to Bridge In [https://www.bridgein.pt/](https://www.bridgein.pt/)

## Project Description

This projects makes use of the API from the {JSON} Placeholder [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/) to create a list of posts and its respective comments. On the application you are able to perform these 3 actions write, update(edit) and delete comments.
Note that the API provided does not allow us to change the server data, so the solution I created only saves the data modifications during your session so when you refresh your page all the data will be restored.

## How to run and Install the project

### 1) Install node packages `npm install`

Once you've downloaded this repository to your machine you need to run the command `npm install` so you can install all the node modules and dependencies.
Note that you must have node installed on your machine.

### 2) Create `.env` file

On this project files you can find a file named `.env.example`, you just need to replicate that file to the regular `.env` file.
Besides for this project, not being necessary to have a .env file since it is a public API and I'm even showing it explicitly in the example, I opted for it due to best practices.

### 3) Run project `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
