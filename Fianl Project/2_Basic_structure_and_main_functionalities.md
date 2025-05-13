# Project phase 2 - Basic structure and main functionalities
The goal of this web app is to help users efficiently track expenses, analyze spending patterns, manage budgets, and gain insights for financial planning through an intuitive and interactive dashboard.

### **1. Environment**
- **Frontend Environment**: 
  - Framework: React.js (using Vite for development speed).
  - CSS: TailwindCSS for styling and responsive design.
  - Development Port: `http://localhost:5173`.

- **Backend Environment**: 
  - Framework: Node.js with Express.js for API management.
  - Development Port: `http://localhost:5000`.

- **Database Environment**: 
  - Database: SQLite for lightweight and file-based relational data storage.
  - Access via SQLite3 Node.js package.

- **Development Tools**: 
  - Code Editor: VS Code.
  - Version Control: Git with GitHub repository.
  - Testing Tools: Postman for API testing and debugging.

---

### **2. Backend**
- **Core Technologies**: 
  - Node.js with Express.js for RESTful API development.
  - SQLite3 for database connectivity.

- **Implemented Endpoints**:
  - `POST /api/users/register`: Allows new user registration.
  - `POST /api/users/login`: Handles user authentication.
  - `POST /api/expenses`: Adds new expense records.
  - `GET /api/expenses/:userId`: Retrieves expense records for a specific user.
  - `PUT /api/expenses/:id`: Updates an expense record.
  - `DELETE /api/expenses/:id`: Deletes an expense record.

- **Error Handling**:
  - Validation: Ensures all necessary fields are provided.
  - Error Responses: Returns appropriate HTTP status codes and error messages for client-side and server-side issues.

---
### **3. Frontend**
- **Core Technologies**: 
  - React.js with React Router for navigation.
  - Axios for API calls and state updates.

- **Implemented Pages**:
  - `Login Page`: Allows users to sign in using email and password.
  - `Registration Page`: Enables users to create an account.
  - `Dashboard`: Displays a summary of user expenses and provides forms for adding, updating, and deleting expenses.
  - `Expense Entry Form`: Includes fields for amount, date, category, and description.

- **Routing**:
  - `/register`: Registration page.
  - `/login`: Login page.
  - `/dashboard`: Dashboard page to view and manage expenses.

---

### **4. Database**
- **Schema Design**:
  - `Users` Table:
    - `id`: INTEGER (Primary Key, Auto-incremented).
    - `name`: TEXT (User's full name).
    - `email`: TEXT (Unique, required for login).
    - `password`: TEXT (User's hashed password).
  - `Expenses` Table:
    - `id`: INTEGER (Primary Key, Auto-incremented).
    - `userId`: INTEGER (Foreign key, links to Users table).
    - `amount`: REAL (Expense amount).
    - `date`: TEXT (Expense date).
    - `category`: TEXT (Expense category such as Food, Transportation).
    - `description`: TEXT (Optional, additional details).

---
### **5. Basic Structure and Architecture**
- **Frontend-Backend Communication**:
  - The frontend communicates with the backend via RESTful APIs.
  - Proxy configuration (`proxy: "http://localhost:5000"`) simplifies API calls during development.

- **Folder Structure**:
  - **Frontend**:
    ```
    src/
    ├── components/
    │   ├── Registration.jsx
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── ExpenseForm.jsx
    │   └── Navbar.jsx
    ├── App.jsx
    ├── index.jsx
    ```

  - **Backend**:
    ```
    backend/
    ├── server.js
    ├── database/
    │   └── expense_tracker.db
    └── package.json
    ```

---
### **6. Functionalities**
- **User Account Management**:
  - Users can create accounts using the registration form.
  - Users can log in to access the dashboard.

- **Expense Management**:
  - Add Expense: Users can input expense details (amount, date, category, description).
  - View Expenses: Users can view a dynamically updated list of their expenses on the dashboard.
  - Update Expense: Users can edit existing expense records.
  - Delete Expense: Users can remove unnecessary records.

- **Data Summarization**:
  - Dashboard displays a summary of all user expenses with a breakdown by category.

---
### **7. Code Quality and Documentation**
- **Best Practices**:
  - Use of descriptive variable and function names.
  - Separation of concerns (e.g., backend routes are modular and frontend components are reusable).
  - Organized folder structure for scalability.

- **Comments**:
  - Code is documented with inline comments for clarity.
  - Functions include comments explaining their purpose and logic.

- **API Documentation**:
  - API endpoints are described using tools like Postman or Swagger.
  - Example request and response payloads are defined for each endpoint.

---
### **8. Testing and Error Handling**
- **Testing**:
  - Backend APIs tested using Postman to verify functionality and edge cases.
  - Frontend 
  Using below test:

| Test Type | Test Method Represented | Typical Tools |
|-------------------|--------------------------|-------------------|
| Unit Testing | Dynamic, Automatic | Vitesta |
| End-to-End (E2E) Testing | Dynamic, Automated | Playwright |
| Load Testing | Dynamic, Automated | k6 |


- **Error Handling**:
  - Frontend:
    - Displays validation errors for missing or invalid input.
    

