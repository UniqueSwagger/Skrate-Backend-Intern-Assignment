# Skrate Backend Intern Assignment 21-22

API deployment URL: https://skrate-assignment.herokuapp.com/

## Requirements and Installation

For running the project, you will need nodejs and a node global package, npm, installed in your environment. Just go on [official Node.js website](https://nodejs.org/) and download it.
Also, be sure to have `git` available in your path, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation is successful, you should be able to run the following command in your terminal/command line:

```
node --version
v8.11.3

npm --version
6.1.0
```

### Yarn & Nodemon installation

After installing node, you have to install `Yarn` and `Nodemon` by running the following command in your terminal/command line before starting the project:

```
npm install -g yarn nodemon
```

### Project installation

```
git clone https://github.com/UniqueSwagger/Skrate-Backend-Intern-Assignment.git
cd Skrate-Backend-Intern-Assignment
yarn install
```

### Running the project

```
yarn start
Runs the server on http://localhost:5000
```

## External packages

```
@types/express, @types/node, @types/cors, cors, dotenv, express, mongoose, ts-node,typescript
```

`ExpressJs` is the most popular `NodeJs` web application framework. As it makes it easier to write `NodeJs` web applications, it was a good choice for this project.

`TypeScript` adds several additional features to JavaScript. The most important one is strict typing. It is a language feature that helps to prevent errors when you use the wrong types. So I decided to use it in this project.
And moreover I have used `@types/express` ,`@types/node`, `@types/node`, `@types/cors` ,`ts-node` for type checking.

`mongoose` is an Object Data Modeling library for `MongoDb` and `NodeJs`. We can define schemas for our database and use them to create models. Also, We can validate the data before saving it to the database. That is why I prefer to use it.

`cors` is a node.js package that allows making cross-origin HTTP requests. It is used to allow requests from different origins.

`dotenv` is a package that loads environment variables from a .env file into process.env. It is used to hide the credentials of the database. I have used it on this project but for assignment testing purposes I didn't hide it.

## Examples of API calls

### Users

#### Create a new user

```
POST /users/new

In the body of the request, you should pass the data like this:
{
  "username": "name of the user",
}

```

#### Get all user

```
GET /users/all

does not require any data
```

#### Update a user

```
Patch /users/update

In the body of the request, you should pass the data like this:
{
  "uid": "_id of the user",
  "userName": "new name of the user",
}
```

#### Delete a user

```
DELETE /users/delete

In the body of the request, you should pass the data like this:
{
  "uid": "_id of the user to delete",
}
```

### Meetings

#### Create a new meeting

```
POST /meetings/new

In the body of the request, you should pass the data like this:
{
  "uid1": "any unique id",
  "uid2": "any unique id",
  "date": "date of the meeting (format: MM-DD-YYYY)",
}
```

#### Get all meeting

```
GET /meetings/all

does not require any data
```

#### Update a meeting

```
Patch /meetings/update

In the body of the request, you should pass the data like this:
 {
    "meetingUid":"_id of the meeting",
    "date": "date of the meeting (format: MM-DD-YYYY)",
}
```

#### Delete a meeting

```
DELETE /meetings/delete

In the body of the request, you should pass the data like this:
{
  "meetingUid": "_id of the meeting you want to delete",
}
```
