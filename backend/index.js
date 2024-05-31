const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  user: 'system',
  password: 'cscorner',
  connectString: 'DESKTOP-814Q6D9:1521/orcl' // e.g., 'localhost:1521/your_service_name'
};

//---------------------------------------------regtable
// Retrieve all records from regtable
app.get('/regtable', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM regtable');
    res.json(result.rows);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Retrieve a specific record by ID
app.get('/regtable/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM regtable WHERE id = :id', [id]);
    res.json(result.rows[0]);
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Insert a new record
app.post('/regtable', async (req, res) => {
  const { id, name, role, email, password, confirm_password } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      'INSERT INTO regtable (id, name, role, email, password, confirm_password) VALUES (:id, :name, :role, :email, :password, :confirm_password)',
      [id, name, role, email, password, confirm_password]
    );
    await connection.commit();
    res.send('Record added successfully');
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a record by ID
app.put('/regtable/:id', async (req, res) => {
  const id = req.params.id;
  const { name, role, email, password, confirm_password } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      'UPDATE regtable SET name = :name, role = :role, email = :email, password = :password, confirm_password = :confirm_password WHERE id = :id',
      [name, role, email, password, confirm_password, id]
    );
    await connection.commit();
    res.send('Record updated successfully');
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a record by ID
app.delete('/regtable/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute('DELETE FROM regtable WHERE id = :id', [id]);
    await connection.commit();
    res.send('Record deleted successfully');
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//-------------------------login table
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Assuming regtable contains user registration information
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM regtable WHERE email = :email AND password = :password', [email, password]);

    if (result.rows.length === 1) {
      // User is authenticated
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


//----------------------------------------- CRUD operations for marks table

// Retrieve all marks
app.get('/marks', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM marks');
    res.json(result.rows);
    connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Retrieve a specific mark by student_id
app.get('/marks/:student_id', async (req, res) => {
  const studentId = req.params.student_id;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM marks WHERE student_id = :student_id', [studentId]);
    res.json(result.rows[0]);
    connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Insert a new mark
app.post('/marks', async (req, res) => {
  const { student_id, telugu, english, science, maths, social, exam_type } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute('INSERT INTO marks (student_id, telugu, english, science, maths, social, exam_type) VALUES (:student_id, :telugu, :english, :science, :maths, :social, :exam_type)',
      [student_id, telugu, english, science, maths, social,exam_type]);
    await connection.commit();
    res.send('Mark added successfully');
    connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a mark by student_id
app.put('/marks/:student_id', async (req, res) => {
  const studentId = req.params.student_id;
  const { telugu, english, science, maths, social, exam_type } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute('UPDATE marks SET telugu = :telugu, english = :english, science = :science, maths = :maths, social = :social, exam_type = :exam_type WHERE student_id = :student_id',
      [telugu, english, science, maths, social,exam_type, studentId]);
    await connection.commit();
    res.send('Mark updated successfully');
    connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a mark by student_id
app.delete('/marks/:student_id', async (req, res) => {
  const studentId = req.params.student_id;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute('DELETE FROM marks WHERE student_id = :student_id', [studentId]);
    await connection.commit();
    res.send('Mark deleted successfully');
    connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
