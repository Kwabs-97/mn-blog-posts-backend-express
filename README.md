# BPM Backend

## Description
This is the backend for the BPM application. It uses MongoDB for data storage and provides APIs for managing blog posts.

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running instance)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bpm/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     ```

4. Populate the database:
   - Ensure `db.json` exists in the `data` directory with the required posts data.

*** CHECK OUT models/blogs.model.js to generate and insert data into database ***

5. Start the server:
   ```bash
   nodemon app.js
   ```

## Folder Structure
- `models/`: Contains database models.
- `schema/`: Defines MongoDB schemas.
- `config/`: Contains configuration files.
- `data/`: Stores static data like `db.json`.

## Usage
- The server will run on the default port (e.g., `http://localhost:3000`).
- Use the provided APIs to interact with the backend.
