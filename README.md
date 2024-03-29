# E-Commerce Back End

## Description

The project implements the back end of a simple e-commerce application and provides the used with the routes and functions to create, seed the database and perform CRUD operations

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Video

The following animation shows the application's GET routes to return all categories, all products, and all tags being tested in postman:

![Video explaining the functionality”.](./assets/video/e-commerce.mp4)
[Video Link](https://drive.google.com/file/d/127dMzqRor-XxlWrwr-6erylQd9zuGUPn/view?usp=sharing)
