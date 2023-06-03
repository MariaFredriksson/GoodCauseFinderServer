
# Good Cause Finder Server

## Description

Good Cause Finder is a web application that makes it easier for people to find and support aid projects that resonate with their passions. By gathering projects from different organizations on one platform, users can filter projects based on themes to find suitable ones to support. The application is designed for anyone who wants to make a positive difference and contribute to global sustainable development. The web-application offers a simple and user-friendly design for filtering, and reading project information. Users can easily make a donation by clicking on a button to visit the individual project pages.

The deployed application can be found at:
[Good Cause Finder](https://cscloud7-221.lnu.se/good-cause-finder/)

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Usage](#usage)
- [API](#api)
- [Cron Job](#cron-job)
- [Error Handling](#error-handling)
- [Tests](#tests)
- [Contact](#contact)

## Introduction

The project is a web application built with Node.js and Express. It includes functionality for scraping data from different websites and provides an API to access the scraped data. The application uses MongoDB for data storage and follows best practices for security.

## Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command: `npm install`
3. Set up a MongoDB database and update the MongoDB connection string in the `config/mongoose.js` file.
4. Modify the CORS origin in the `server.js` file if needed.
5. Optionally, update the cron schedule in the `server.js` file.
6. Start the application by running the following command: `npm start`

## Usage

Once the project is set up and running, you can access the API endpoints to retrieve the scraped data. The API endpoints are defined in the `routes/router.js` file. 

## API

The API provides the following endpoints:

### GET /api/projects

Retrieves all projects from the database.

**Request**

- Method: GET
- Path: `/api/projects`

**Response**

- Status: 200 OK
- Body: An object containing an array of projects.

Example response body:

```json
{
  "projects": [
    {
      "title": "Project Title",
      "imgURL": "https://example.com/image.jpg",
      "organization": "Organization Name",
      "text": "Project Description",
      "category": ["category1", "category2"],
      "articleURL": "https://example.com/article",
      "id": "1234567890",
      "createdAt": "2022-01-01T12:00:00.000Z",
      "updatedAt": "2022-01-01T12:30:00.000Z"
    },
    {
      "title": "Project Title",
      "imgURL": "https://example.com/image.jpg",
      "organization": "Organization Name",
      "text": "Project Description",
      "category": ["category1", "category2"],
      "articleURL": "https://example.com/article",
      "id": "1234567890",
      "createdAt": "2022-01-01T12:00:00.000Z",
      "updatedAt": "2022-01-01T12:30:00.000Z"
    },
    ...
  ]
}
```

### GET /api/projects/:id
Retrieves a specific project by its ID.

**Request**

- Method: GET
- Path: `/api/projects/:id`
- Replace :id with the ID of the project you want to retrieve.

**Response**

- Status: 200 OK
- Body: The project object with the specified ID.

Example response body:
```json
{
  "title": "Project Title",
  "imgURL": "https://example.com/image.jpg",
  "organization": "Organization Name",
  "text": "Project Description",
  "category": ["category1", "category2"],
  "articleURL": "https://example.com/article",
  "id": "1234567890",
  "createdAt": "2022-01-01T12:00:00.000Z",
  "updatedAt": "2022-01-01T12:30:00.000Z"
}
```
If the project with the specified ID is not found, the API will respond with a 404 Not Found status and an error message.

Example error response:
```json
{
  "error": "Project with id 1234567890 not found."
}
```

## Cron Job

The project includes a cron job that runs at a scheduled time to perform the scraping of data from various websites. By default, the cron job is scheduled to run every Saturday at 14:15. You can modify the cron schedule in the `server.js` file by updating the `cron.schedule` function.

## Error Handling

The project includes an error handling middleware that catches errors and sends an appropriate response to the client. If any errors occur during the execution of the application, they will be logged to the console, and the client will receive an "Internal Server Error" response.

## Tests

Tests can be run using the following command: `npm run test`

## Contact

For any inquiries or suggestions, please contact Maria Fredriksson at [mf223wk@student.lnu.se](mailto:mf223wk@student.lnu.se).
