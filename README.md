This repository contains the backend implementation for the Roommate Finder System, a web application designed to help university students connect with compatible roommates based on their preferences, personality, and lifestyle. The backend serves as the foundation for the application, handling data processing, storage, and communication between the database and the client interface.

The backend is built using Node.js, MySQL, and a RESTful API following the Model-View-Controller (MVC) design pattern. This document provides an overview of the project structure, technology choices, and instructions for setting up the backend.

Technology Stack

1. Node.js

Reason for Choosing:
Node.js is an asynchronous, event-driven JavaScript runtime that excels in building scalable and high-performance applications. Its benefits include:
	•	Non-blocking I/O: Ensures efficient handling of concurrent requests, critical for a multi-user platform.
	•	Developer Familiarity: Node.js allows developers to use JavaScript for both frontend and backend, simplifying development and maintenance.
	•	Rich Ecosystem: Access to a vast collection of libraries and tools via npm enhances productivity.

 2. MySQL

Reason for Choosing:
MySQL is a robust, open-source relational database management system ideal for structured data storage and retrieval. Its benefits include:
	•	Relational Structure: Perfect for modeling user profiles, preferences, and requests in a structured format.
	•	Data Integrity: Ensures consistent and reliable storage, which is critical for user data and interactions.
	•	Performance: Optimized for complex queries, ensuring fast response times for user searches and matches.
	•	Widespread Support: Extensive community support and compatibility with numerous tools make MySQL a reliable choice.

 3. RESTful API

Reason for Choosing:
The REST architecture style provides a standardized approach to client-server communication. Its benefits include:
	•	Scalability: Independent services allow seamless scaling as the application grows.
	•	Platform Independence: APIs are accessible from any client platform, ensuring flexibility for future integrations.
	•	Ease of Use: Clear and predictable endpoints make it easy for frontend developers to interact with the backend.


 4. MVC Design Pattern

Reason for Choosing:
The MVC design pattern promotes a clean separation of concerns, improving maintainability and scalability. Its components:
	•	Model: Manages data logic and database interactions (e.g., user profiles, requests).
	•	View: Handles data presentation (not directly applicable here but aligns with the overall architecture).
	•	Controller: Orchestrates interactions between models and views, managing API requests and responses.

This structure simplifies debugging, testing, and onboarding new developers while ensuring that each component is loosely coupled.

### Project Structure

```
roommate-finder-backend/
├── controllers/    # Contains logic for handling API requests
├── models/         # Defines the database schema and interacts with MySQL
├── routes/         # Defines API endpoints and routes
├── config/         # Configuration files (e.g., database connection)
├── middleware/     # Custom middleware for validation and security
├── utils/          # Utility functions for reusable logic
├── server.js       # Entry point of the application
├── package.json    # Dependencies and scripts
└── README.md       # Documentation
```

License

This project is licensed under the MIT License.
