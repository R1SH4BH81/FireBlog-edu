# FireBlog

Welcome to the Blog Application repository! This project is a full-featured blogging platform built using React, Tailwind CSS, and Firebase.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Documentation](#documentation)
6. [License](#license)

## Overview

The Blog Application allows users to create, view, and manage blog posts. It integrates Firebase for backend services, including Firestore for data storage and Firebase Authentication for user management. [Live Preview](https://fireblog-edu.vercel.app/)
[Also Visit](https://eightbitblog.tech)

## Features

- **User Authentication**: Register, log in, and manage user sessions.
- **Post Creation**: Create and submit new blog posts.
- **Post Management**: View, update, and delete blog posts.
- **Comment Management**: Add, view, and delete comments on posts.
- **Responsive Design**: Tailwind CSS for a modern, responsive layout.

## Installation

To get started with the Blog Application, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/R1SH4BH81/FireBlog-edu.git
    ```
2. Navigate to the project directory:
    ```bash
    cd FireBlog-edu
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up Firebase:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Obtain your Firebase configuration and place it in a file named `firebase.js` in the `src` directory.

5. Start the development server:
    ```bash
    npm start
    ```

## Usage

- **Run the Application**: Once the server is running, open `http://localhost:3000` in your web browser.
- **Authentication**: Use the sign-up and login forms to authenticate users.
- **Create Posts**: Use the form provided to create new blog posts.
- **View Posts**: Browse through the list of all posts on the homepage.
- **View Post Details**: Click on a post to view its details and comments.
- **Manage Comments**: Add and delete comments on individual posts.

## Documentation

For detailed documentation on how each component works, refer to the [Documentation](https://fireblog-edu.vercel.app/docs) .

### Documentation Overview

- **NewPost Component**: Handles the creation of new blog posts. It includes form fields for title, description, content, and image, and uses Firebase Firestore to save posts.
- **HomePage Component**: Displays a list of all blog posts. Includes functionality for navigating to individual posts and creating new posts.
- **Post Component**: Shows detailed information about a single post, including its content and comments. Allows authenticated users to like posts and manage comments.
- **Firebase Integration**: Explains how Firebase is used for authentication and data storage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

