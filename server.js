const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Temporary in-memory users
const users = [
  {
    id: 1,
    name: "Aisha Patel",
    email: "aisha@example.com",
    course: "Cloud Computing"
  },
  {
    id: 2,
    name: "David Smith",
    email: "david@example.com",
    course: "Cybersecurity"
  }
];

function renderPage(message = "") {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>User Management</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #eef4ff;
      color: #1f2937;
    }

    header {
      background: #174ea6;
      color: white;
      padding: 24px 8%;
    }

    header h1 {
      margin: 0;
    }

    header p {
      margin-bottom: 0;
    }

    .container {
      max-width: 1050px;
      margin: 35px auto;
      padding: 0 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 25px;
    }

    .card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
    }

    label {
      display: block;
      margin-top: 15px;
      margin-bottom: 6px;
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 15px;
    }

    button {
      width: 100%;
      margin-top: 22px;
      padding: 12px;
      border: none;
      border-radius: 6px;
      background: #174ea6;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background: #0f3473;
    }

    .message {
      background: #dcfce7;
      color: #166534;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    th,
    td {
      text-align: left;
      padding: 13px;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      background: #e8f0fe;
      color: #174ea6;
    }

    .status {
      display: inline-block;
      margin-top: 20px;
      padding: 8px 12px;
      border-radius: 20px;
      background: #dcfce7;
      color: #166534;
      font-size: 14px;
    }

    @media (max-width: 750px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>
  <header>
    <h1>User Management</h1>
    <p>Node.js and Express application deployed on Google App Engine</p>
  </header>

  <main class="container">
    ${message ? `<div class="message">${message}</div>` : ""}

    <div class="grid">
      <section class="card">
        <h2>Create User</h2>

        <form method="POST" action="/users">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            required
          />

          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            required
          />

          <label for="course">Course</label>
          <select id="course" name="course" required>
            <option value="">Select a course</option>
            <option value="Node.js">Node.js</option>
            <option value="React">React</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Machine Learning">Machine Learning</option>
          </select>

          <button type="submit">Create User</button>
        </form>

        <span class="status">Running on Google App Engine</span>
      </section>

      <section class="card">
        <h2>Registered Users</h2>
        <p>Total users: <strong>${users.length}</strong></p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
            </tr>
          </thead>

          <tbody>
            ${users
              .map(
                (user) => `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.course}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </section>
    </div>
  </main>
</body>
</html>
`;
}

// Display the user interface
app.get("/", (req, res) => {
  res.send(renderPage());
});

// Process the create-user form
app.post("/users", (req, res) => {
  const { name, email, course } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email,
    course
  };

  users.push(newUser);

  res.send(
    renderPage(`User ${name} was created successfully.`)
  );
});

// JSON API endpoint
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});