const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Kết nối tới cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'book_reader'
});

// Sử dụng body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối tới cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

//lấy danh sách bảng books
app.get('/api/books', (req, res) => {
  const query = 'SELECT * FROM books';

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
//lấy ra danh sách chapter
app.get('/api/chapters', (req, res) => {
  const query = 'SELECT * FROM chapters';

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
//lấy ds chapters theo book_id:
app.get('/api/books/:book_id/chapters', (req, res) => {
  // Lấy book_id từ route parameter
  const bookId = req.params.book_id;

  // Sử dụng prepared statement để tránh SQL injection
  const query = 'SELECT * FROM chapters WHERE book_id = ?';

  // Thực hiện truy vấn cơ sở dữ liệu với book_id như là giá trị tham số
  connection.query(query, [bookId], (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Trả về kết quả cho ứng dụng React Native
      res.json(results);
    }
  });
});
app.get('/api/chapters/:id', (req, res) => {
  // Lấy book_id từ route parameter
  const id = req.params.id;

  // Sử dụng prepared statement để tránh SQL injection
  const query = 'SELECT * FROM chapters WHERE id = ?';

  // Thực hiện truy vấn cơ sở dữ liệu với id như là giá trị tham số
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Trả về kết quả cho ứng dụng React Native
      res.json(results);
    }
  });
});
//lấy comment từ book_id
app.get('/api/books/:book_id/comments', (req, res) => {
  // Lấy book_id từ route parameter
  const bookId = req.params.book_id;

  // Sử dụng prepared statement để tránh SQL injection
  const query = 'SELECT * FROM comments WHERE book_id = ?';

  // Thực hiện truy vấn cơ sở dữ liệu với book_id như là giá trị tham số
  connection.query(query, [bookId], (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Trả về kết quả cho ứng dụng React Native
      res.json(results);
    }
  });
});
//thêm comments mới:
app.post('/api/books/:book_id/comments', (req, res) => {
  // Lấy book_id từ route parameter
  const bookId = req.params.book_id;

  // Lấy dữ liệu bình luận từ body của yêu cầu
  const { author, content } = req.body;

  // Sử dụng prepared statement để tránh SQL injection
  const query = 'INSERT INTO comments (book_id, author, content) VALUES (?, ?, ?)';

  // Thực hiện truy vấn cơ sở dữ liệu với book_id, author và content như là giá trị tham số
  connection.query(query, [bookId, author, content], (err, result) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Trả về thông báo thành công cho ứng dụng React Native
      res.json({ message: 'Comment added successfully' });
    }
  });
});

//thêm books mới
// Định nghĩa endpoint API để thêm sách mới
app.post('/api/books', (req, res) => {
    const { title, author, genre, description, cover_image } = req.body;
    const query = 'INSERT INTO Books (title, author, genre, description, cover_image) VALUES (?, ?, ?, ?, ?)';
    const values = [title, author, genre, description, cover_image];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing database query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ id: result.insertId, title, author, genre, description, cover_image });
      }
    });
});
//xóa sách

// Xóa sách từ cơ sở dữ liệu
app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'DELETE FROM books WHERE id = ?';
    
    connection.query(query, [bookId], (err, result) => {
      if (err) {
        console.error('Error executing database query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          // Không tìm thấy sách có id tương ứng
          res.status(404).json({ error: 'Book not found' });
        } else {
          // Xóa sách thành công
          res.json({ message: 'Book deleted successfully' });
        }
      }
    });
  });
  
  
// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
