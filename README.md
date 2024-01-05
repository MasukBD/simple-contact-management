## Project Name: Contact Management

#### Live site: [Contact-Management](https://simple-contact-management-system.netlify.app/)

This is a contact management web application that allows users to add, view, update, and delete contacts. The application uses a MongoDB database to store contact details, a Node.js and Express.js backend to handle CRUD operations through a RESTful API, and a React.js frontend for user interaction.

# Table of Contents

- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contact Management](#contact-management)
- [Home Page](#home-page)
- [Search Functionality](#search-functionality)
- [Authentication with Firebase](#authentication-with-firebase)
- [API Security with JWT](#api-security-with-jwt)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Navigation Bar:

- Include a navigation bar with "Home," "Add Contacts," and "All Contacts" buttons.

### Home Page:

- Navigate to the Home page from the navbar.
- Beautiful Display of a Contact Management System with Relevent Animaiton.
- Two buttons on the Home page to navigate to "Add Contacts" and "All Contacts."

### Add Contacts Page:

- Implement an "Add Contacts" page allowing users to input and submit contact details, including Name, Email (optional), Phone number, Address, and Profile picture (upload).

### All Contacts Page:

- Display all contacts as visually appealing cards.
- Each contact card contains Name, Email, Phone number, Address, Profile picture, and buttons for update, delete and Add Favourite functionalities.

### Contact Management:

- Update contact details through a modal.

### Authentication with Firebase:

- Users can register and login via email/password.
- Users can log in using their Google account.

### API Security with JWT:

- Secure the API with JSON Web Tokens (JWT) for authentication.

## Technical Requirements

### Backend:

- Ensure MongoDB is installed and running.
- Navigate to the backend folder.
- Run `npm install` to install dependencies.
- Create a `.env` file with the MongoDB connection string (`DB_URI`).
- Run `npm start` to start the server.

### Frontend:

- lone the repository: `git clone https://github.com/MasukBD/simple-contact-management.git`
- Change into the project directory: `cd simple-contact-management`
- Run `npm install` to install dependencies to bash or powershell.
- Run `npm run dev` to launch the React app and run locally.

## Usage

1. Open the application in your browser.
2. By default you will be in Home page.
3. Use the navigation bar to switch between "Home," "Add Contacts," "All Contacts," "Login," and "Register" pages.
4. On the Home page, use the buttons to navigate to "Add Contacts" or "All Contacts."
5. Add contacts with the required details on the "Add Contacts" page.
6. View, update, or delete contacts on the "All Contacts" page.
7. Use the login and register pages for authentication.

## Search Functionality

- On the "All Contacts" page, users can search for contact cards using mobile numbers.

## Contact Management

### Update Contact Details

1. Click on the update button on the contact card.
2. Input the Proper updated data to the input of modal.
3. Click Update to update the contact details.

### Delete a Contact

1. Click on the Delete button on the contact card.
2. It will pop-up the confirmation button if you confirm then contact card will be deleted.

### Mark as Favorite

- Click the Add Favorite button to mark a contact as a favorite.

## Home Page

- Navigate to the Home page from the navbar.
- Use the buttons to quickly access "Add Contacts" or "All Contacts."

## Deployment

Optionally, you can deploy the application to a hosting service and share the live demo URL.

## Contributing

Feel free to contribute to the project.

## License

This project is licensed under the MIT License.


