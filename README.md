Event Management System

Project Description

The Event Management System is a web-based application designed to streamline the process of creating, managing, and attending events. It provides a platform for users to register for events, organizers to manage event details, and administrators to oversee the entire system. The project aims to make event planning more efficient and user-friendly.

Features

User registration and authentication

Event creation, editing, and deletion by organizers

Event search and filtering functionality

User role management (Admin, Organizer, Attendee)

Reporting and analytics for event organizers

Technologies Used

Frontend

React.js: For building interactive user interfaces

Bootstrap: For responsive design

Backend

Spring Boot (Java): For building the RESTful API

MySQL: For storing user and event data

Tools and Services

Postman: For API testing

GitHub: For version control

AWS / Localhost: For hosting (depending on deployment)

Optional: Cloudinary for image storage, Twilio for SMS notifications

System Architecture

The system follows a typical full-stack architecture:

Frontend: React.js application that interacts with the backend via API calls.

Backend: Spring Boot REST API that handles business logic and data persistence.

Database: MySQL relational database that stores event and user data.

Installation and Setup

Clone the repository:

git clone https://github.com/your-repo-url

Backend Setup:

Navigate to the backend directory.

Configure your MySQL database connection in application.properties.

Run the Spring Boot application.

Frontend Setup:

Navigate to the frontend directory.

Install dependencies:

npm install

Start the React development server:

npm start

Database Schema

The MySQL database includes the following tables:

users (id, username, password, role)

events (id, title, description, date, location, organizer, status, etc.)

attendees (id, user_id, event_id)

API Endpoints

POST /api/events: Create a new event

GET /api/events: Retrieve all events

PUT /api/events/{id}: Update an event by ID

DELETE /api/events/{id}: Delete an event by ID

POST /api/auth/login: User authentication

Challenges Faced

Managing state across different components in React.

Handling complex SQL queries for event filtering.

Implementing secure user authentication.

Lessons Learned

Improved understanding of full-stack web development.

Importance of secure API development and data management.

Effective team collaboration and project management.

Next Steps

Deploy the application on a cloud platform (e.g., AWS, Heroku).

Implement email and SMS notifications.

Add payment integration for paid events.

Improve UI/UX for better user experience.

Contribution

If you'd like to contribute to the project, please fork the repository and submit a pull request.

License

This project is licensed under the MIT License.

Contact

For any inquiries, please contact:

Name: Joshua Chifura

Email: pantherchif3@gmail.com

GitHub: joshchif3
