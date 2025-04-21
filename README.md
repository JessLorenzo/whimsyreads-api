# Whimsy Reads API

This is the backend repository for **Whimsy Reads**, a full-stack web app designed to help book lovers create and manage book clubs, share monthly reads, and organize community events. This RESTful API provides all server-side functionality, including user authentication, book club management, event creation, and poll voting.

## 🔧 Tech Stack

- **Node.js** + **Express.js**
- **MySQL** + `mysql2` for database connection
- **dotenv** for environment variable management
- **JWT** for user authentication
- **CORS**, **bcrypt**, and standard Express middleware
- Optional integrations: Google Books API, Cloudinary or Firebase (for image storage)

## 🛠 Setup Instructions

### 1. Clone the Repository
git clone https://github.com/JessLorenzo/whimsyreads-api.git
cd whimsyreads-api
npm install

2. Environment Variables
Create a .env file in the root with the following values:
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=whimsy_reads
PORT=8081
JWT_SECRET=your_secret_key

3. Set Up the Database
Ensure MySQL is installed and running.
Create the database manually or using a migration script if provided:
CREATE DATABASE whimsy_reads;

Import the schema and seed data if applicable.

4. Start the Server: npm run dev
   
Your API will run at http://localhost:8081/api.

📁 Folder Structure
whimsyreads-api/
├── routes/         # Route handlers for all endpoints
├── controllers/    # Request logic and business rules
├── middleware/     # Auth middleware (e.g., JWT validation)
├── db/             # Database connection logic
├── .env            # Environment variables (not committed)
├── server.js       # Entry point
└── package.json

🧪 Testing the API
Use Postman or Insomnia to test endpoints
Make sure to include the appropriate headers (e.g., Authorization: Bearer <token> for protected routes)

