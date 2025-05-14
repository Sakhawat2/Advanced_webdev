# **Personal Expense Tracker**  
### **Phase 4 – Project Presentation**  
## 📝 **Project Overview**  
This project is a **personal finance tracking application** designed to help users **manage their expenses, monitor spending habits, and generate reports**.  The goal of this project is to provide users with an **intuitive and efficient way to record, analyze, and plan their expenses**. Many individuals struggle with keeping track of their spending, leading to financial stress and poor budgeting. This project addresses that issue by offering **a simple yet powerful expense management tool**. 

### 📌 **Key Features & Functionalities**  

✅ **Secure User Authentication:** Users must sign up and log in securely.  
✅ **Expense Entry & Management:** Users can add, update, and delete expenses.  
✅ **Categorization:** Expenses can be organized into categories like Food, Travel, Shopping, etc.  
✅ **Graphical Insights:** Spending trends visualized through dynamic charts.  
✅ **Expense Reports:** Monthly and yearly reports for better financial planning.  
✅ **User-Friendly Dashboard:** A clean and interactive interface for tracking expenses at a glance.  
✅ **Data Persistence:** Expenses are stored securely in a database for retrieval anytime.  

### 🎯 **Target Users**  

🚀 **Students** – Keeping track of daily expenses and budgeting limited funds.  
🚀 **Working Professionals** – Managing salary distributions efficiently.  
🚀 **Household Budget Planners** – Controlling monthly expenditures to save more.  
🚀 **Small Business Owners** – Monitoring operational costs effectively.  

### 🖥️ **User Experience & Accessibility**  

The **Personal Expense Tracker** is designed with simplicity in mind, ensuring that users can quickly **add transactions, view reports, and analyze spending habits** without technical expertise.  

**✨ Interface Benefits:**  
💡 **Minimalist & Clean UI** – Easy navigation without distractions.  
💡 **Side-by-Side Expense Entry & Summary** – Improves workflow efficiency.  
💡 **Visual Insights with Graphs** – Helps users understand financial habits better.  
💡 **Mobile-Friendly Design** – Accessible across different devices.  

### 📈 **Importance of this Project**  

💰 **Improves Financial Awareness** – Users become more mindful of spending habits.  
📊 **Encourages Budgeting** – Helps plan budgets based on data-driven insights.  
📉 **Prevents Overspending** – Spending patterns help users avoid unnecessary expenses.  
✅ **Future Expansion Possibilities** – Can integrate AI-based financial suggestions.  

The **Personal Expense Tracker** is not just an academic project but a **practical tool that can help individuals improve financial management**.  Users can **log expenses, view detailed reports, analyze spending trends**, and make informed financial decisions.  

---

## 📌 **Use Case Summary**  

| Use Case | Implemented (Yes/No) | Demonstration / Notes |
|----------|----------------------|------------------------|
| User logs in and accesses the dashboard | ✅ Yes | Implemented with secure session handling. Demo at **2:27** in the video. |
| User registers for an account | ✅ Yes | Registration system with backend validation. Demo at **1:12** in the video. |
| User adds expenses | ✅ Yes | Users enter amount, category, date, and description. Demo at **3:44**. |
| User updates and deletes expenses | ✅ Yes | Edit and delete functions available. Demo at **4:45**. |
| Expense reports and spending trends | ✅ Yes | Chart.js used for visualization. Demo at **2:00**. |
| Admin panel for managing users | ❌ No | Not prioritized—possible future feature. |

✅ **Demo timestamps** help guide viewers through key project features.  

---

## ✍️ **Technical Implementation**  
This phase focuses on the **architecture, technologies, and development practices** used to build the Personal Expense Tracker.  


### **🛠 Technologies Used**  

#### **Frontend:**  
✅ **React.js (Vite)** – Fast UI rendering, component-based structure.  
✅ **React Router** – Handles navigation between Login, Dashboard, Report pages.  
✅ **Chart.js** – Generates expense trend graphs dynamically.  
✅ **CSS (Flexbox, Grid)** – Organizes UI elements neatly.  

#### **Backend:**  
✅ **Node.js (Express.js)** – Handles API requests securely.  
✅ **SQLite Database** – Stores expense data, user accounts.  
✅ **JWT Authentication** – Ensures secure user login sessions.  

#### **APIs & Data Handling:**  
✅ **REST API Architecture** – CRUD operations for expenses.  
✅ **Axios** – Handles API calls smoothly between frontend and backend.  
✅ **Local Storage** – Maintains user sessions.  


### **📁 Project Structure**  
```
Personal-Expense-Tracker/
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseReport.jsx
│   │   │   ├── Header.jsx
│   │   ├── styles.css
│   ├── package.json (React dependencies)
│── backend/
│   ├── server.js (Handles API)
│   ├── database.db (SQLite DB)
│   ├── package.json (Backend dependencies)
│── README.md
```


✅ **Frontend (React)** handles UI updates dynamically.  
✅ **Backend (Express, SQLite)** securely stores and retrieves expense data.  


### **🔍 Architectural Decisions**  

#### **1️⃣ Authentication System**  
🔹 **JWT-based login** – User credentials are encrypted securely.  
🔹 **LocalStorage for session handling** – Users remain logged in.  

#### **2️⃣ Database Structure**  
🔹 **SQLite** used for fast queries with minimal setup.  
🔹 **Expense table:** `id, userId, amount, date, category, description`.  
🔹 **Users table:** `id, name, email, password`.  

#### **3️⃣ Expense Tracking Features**  
🔹 Users **can add, edit, delete expenses** via the dashboard.  
🔹 Graphs update **in real-time** using Chart.js.  
🔹 Categorization helps analyze spending.  

---

### **🚀 Key Features & Implementation Details**  

#### **✅ Secure User Authentication**
```js
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error encrypting password' });

    db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      function (err) {
        if (err) return res.status(500).json({ message: 'Error registering user' });
        res.status(201).json({ message: 'User registered successfully!', id: this.lastID });
      }
    );
  });
});
```
✅ **Ensures encrypted user password storage.**  

---

#### **✅ Expense Entry & Data Handling**
```js
app.post('/api/expenses', (req, res) => {
  const { userId, amount, date, category, description } = req.body;

  db.run(`INSERT INTO expenses (userId, amount, date, category, description) VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, date, category, description],
    function (err) {
      if (err) return res.status(500).json({ message: 'Error adding expense' });
      res.status(201).json({ message: 'Expense added successfully!', id: this.lastID });
    }
  );
});
```
✅ **Stores expense details in the SQLite database.**  


#### **✅ Dynamic Graph Updates in Reports**
```js
new Chart(chartRef.current.getContext('2d'), {
  type: 'bar',
  data: {
    labels: expenses.map(exp => exp.category),
    datasets: [{
      label: 'Total Spending',
      data: expenses.map(exp => exp.amount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  }
});
```
✅ **Displays spending trends dynamically using Chart.js.**  

---

### **🚀 Scalability & Future Improvements**  
✔ **Cloud deployment** – Hosting on Firebase or AWS.  
✔ **Export financial reports** – CSV/PDF format.  
✔ **Machine learning insights** – Expense predictions based on history.  

### **🚀 Testing and Error Handling**
- **Testing**:
  - Backend APIs tested using Postman to verify functionality and edge cases.
  - Frontend 
  Using below test:

| Test Type | Test Method Represented | Typical Tools |
|-------------------|--------------------------|-------------------|
| Unit Testing | Dynamic, Automatic | Vitesta |
| End-to-End (E2E) Testing | Dynamic, Automated | Playwright |
| Load Testing | Dynamic, Automated | k6 |



### **🔍 Summary**  
✅ **Well-structured architecture** ensuring smooth performance.  
✅ **Secure authentication** with **password encryption & session handling**.  
✅ **Optimized UI design** for a great user experience.  
✅ **Graphical expense tracking** for clear financial insights.  

---


## 🚂 **Development Process**  
### **Key Steps in Progress:**  
1️⃣ **Phase 1:** **Planning & Defining Use Cases**  
2️⃣ **Phase 2:** **Building Core Features (Login, Expense Entry, Reports)**  
3️⃣ **Phase 3:** **Enhancing User Experience (Graphs, UI Improvements)**  
4️⃣ **Phase 4:** **Final Testing, Fixes & Presentation Preparation**  

### **Key Decisions & Changes:**  
✅ Improved **Expense Report design** to show graphs beside tables  
✅ Added **Expense Form on the Dashboard** for seamless tracking  
✅ Used **flexbox layout** to **align forms & reports properly**  
✅ Shifted **header design** for **better user navigation**  

---
## ☀️ **Reflection & Future Work**  
### **What Worked Well?**  
✅ **Smooth UI** with real-time expense updates  
✅ **Well-structured backend** API endpoints  
✅ **Graph integration** for enhanced financial visualization  

### **Challenges Faced:**  
❌ **Fixing layout issues** (overlapping sections, misaligned text)  
❌ **User authentication bugs** (fixed session errors)  
❌ **Scaling database structure** for future multi-user support  

### **Future Improvements:**  
🚀 **Add AI-powered expense recommendations**  
🚀 **Provide CSV export for financial records**  
🚀 **Integrate cloud-based storage** for accessibility  

---

## 📊 **Work Hours Log**  
| Date | Task | Hours Spent |
|------|------|------------|
| Week 15 (07.04.2025) | Research & Planning | 4 hrs |
| Week 16 (14.04.2025) | Backend Setup (Authentication, APIs) | 16 hrs |
| Week 17 (21.04.2025) | UI Development (Login, Dashboard) | 25 hrs |
| Week 18 (28.04.2025) | Expense Entry Form + Database | 25 hrs |
| Week 19 (05.05.2025) | Testing | 6 hrs |
| Week 20 (12.05.2025) |  Graphs & Report Design | 16 hrs |
| Week 20 (12.05.2025) | Debugging & Styling Improvements | 5 hrs |
| Week 20 (12.05.2025) | Final Testing & Presentation Setup | 6 hrs |

---

### **Conclusion**  

The **Personal Expense Tracker** project has been a valuable experience in building a functional, user-friendly financial management tool. From conceptualization to implementation, we successfully developed a secure platform where users can track their expenses, visualize spending habits, and improve financial awareness. User-Centric Design ensuring simplicity and efficiency in managing expenses. Robust Backend secure data handling and structured API endpoints for seamless operations. Graphical Insights enabling users to interpret financial trends visually. Continuous Iteration enhancing features based on user feedback and usability improvements. Several Challenges has been Overcome by fixing authentication issues for smooth user login and registration. In addition, by improving UI layout for clearer financial data presentation. Moreover, aligning dashboard & report sections properly for enhanced accessibility. In terms of Future Scope, Mobile App Version for better accessibility across devices. AI-driven expense recommendations for smarter financial management. Automated budget tracking based on historical spending patterns. This project demonstrates the importance of structured financial tracking and highlights our ability to build scalable, well-designed web applications. It serves as a foundation for future enhancements and real-world implementations.   



