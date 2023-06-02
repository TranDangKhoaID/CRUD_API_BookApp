const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Kết nối tới cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_reader'
});

// Sử dụng body-parser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối tới cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

//lấy danh sách bảng books
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';

    // Thực hiện truy vấn cơ sở dữ liệu
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing database query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Trả về kết quả cho ứng dụng React Native
            res.json(results);
        }
    });
});

//Đăng nhập
// API endpoint để đăng nhập
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    // Kiểm tra người dùng trong cơ sở dữ liệu
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error executing database query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // Đăng nhập thành công
                // Đăng nhập thành công
                const user = results[0];
                res.json({ success: true, message: 'Login successful', user:user });
            } else {
                // Sai email hoặc mật khẩu
                res.json({ success: false, message: 'Invalid email or password'});
            }
        }
    });
});
//Đăng kí
app.post('/api/users/register', (req, res) => {
    const { name, email, password, phone } = req.body;

    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error('Error executing database query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // Email đã tồn tại trong cơ sở dữ liệu
                res.json({ success: false, message: 'Email already exists' });
            } else {
                // Thêm người dùng vào cơ sở dữ liệu
                const insertQuery = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
                connection.query(insertQuery, [name, email, password, phone], (err, results) => {
                    if (err) {
                        console.error('Error executing database query:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        // Đăng kí thành công
                        res.json({ success: true, message: 'Registration successful' });
                    }
                });
            }
        }
    });
});



// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
