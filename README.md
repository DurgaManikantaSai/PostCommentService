# Simple Post-Comments Service

## Overview

This project implements a basic Post-Comments Service where users can create text-based posts and comment on them. The service includes rich text support for comments.

## Architecture

The service is built using Node.js and Express.js for the backend API, MongoDB as the database for storing posts and comments, and React for the frontend user interface.

### Backend (Server)

#### Technologies Used

- **Node.js** - JavaScript runtime environment.
- **Express.js** - Web application framework for Node.js.
- **MongoDB** - NoSQL database for storing posts and comments.
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB.

#### API Endpoints

- **POST /api/posts**
  - Creates a new post.
  - Request body: `{ userId, title, content }`

- **GET /api/posts**
  - Retrieves all posts.

- **GET /api/posts/:postId**
  - Retrieves a specific post by ID.

- **POST /api/comments**
  - Adds a comment to a post.
  - Request body: `{ postId, content, userId }`

- **GET /api/comments/:postId**
  - Retrieves all comments for a specific post.

#### Rich Text Support

Comments support rich text features such as bold, italics, and hyperlinks.

### Frontend (Client)

#### Technologies Used

- **React** - JavaScript library for building user interfaces.
- **Ant Design** - UI library for React components.
- **Zustand** - State management library for React.

#### Features

- Users can view posts and comments.
- Ability to create new posts and add comments.
- Rich text editor for comment creation.

## Setup Instructions

### Backend (Server)

1. **Clone the Repository:**
  
   git clone <repository-url>
   cd <repository-folder>/server


### Install Dependencies:

   
    npm install
    Set Environment Variables:

## Create a .env file in the server directory with the following variables:
    PORT=8080
    MONGODB_URI=mongodb://localhost:27017/post_comments_db
    JWT_SECRET=your_jwt_secret_here
    Replace mongodb://localhost:27017/post_comments_db with your MongoDB connection URI and `           
    your_jwt_secret_here with your JWT secret.

Build and Start the Server:


npm run build-and-start
This command builds the TypeScript code and starts the server. The server will be accessible at http://localhost:8080.

Frontend (Client)
Navigate to Client Directory:


cd <repository-folder>/client
Install Dependencies:


npm install
Start the Development Server:


npm start
This command starts the development server for the frontend. Open http://localhost:3000 in your browser to view the application.
