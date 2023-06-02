import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'

const AddBook = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [cover_image, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  // Hàm xử lý khi nhấn nút "ADD"
  const handleAddBook = () => {
    // Kiểm tra nếu một trong các trường bị bỏ trống, hiển thị thông báo lỗi
    if (!title || !author || !genre || !cover_image || !description) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Tạo đối tượng sách mới từ thông tin nhập vào
    const newBook = {
      title: title,
      author: author,
      genre: genre,
      cover_image: cover_image,
      description: description
    };

    // Gửi request POST đến API để thêm sách
    fetch('http://192.168.1.7:3001/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
    .then(response => response.json())
    .then(data => {
      // Xử lý phản hồi từ API (nếu cần)
      console.log(data);
      // Sau khi thêm sách thành công
      Alert.alert('Thêm sách thành công!');
      setTitle('');
      setAuthor('');
      setGenre('');
      setCoverImage('');
      setDescription('');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={styles.paragraph}>Quản lý sản phẩm</Text>
      <View>
        <TextInput style={styles.containerInput}
          placeholder="Tiêu đề"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput style={styles.containerInput}
          placeholder="Tác giả"
          value={author}
          onChangeText={text => setAuthor(text)}
        />
        <TextInput style={styles.containerInput}
          placeholder="Thể loại"
          value={genre}
          onChangeText={text => setGenre(text)}
        />
        <TextInput style={styles.containerInput}
          placeholder="Link ảnh"
          value={cover_image}
          onChangeText={text => setCoverImage(text)}
        />
        <TextInput style={[styles.containerInput, { height: 150 }]}
          placeholder="Mô tả"
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={handleAddBook}
          underlayColor='#fff'
          style={styles.button}><Text>THÊM SÁCH</Text></TouchableOpacity>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Books')}
          underlayColor='#fff'
          style={styles.button}><Text>Danh Sách</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddBook

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  name: {
    marginTop: 10,
    fontSize: 25,
    color: "blue",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerInput: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'pink',
    padding: 10,
    margin: 5,
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    textAlign: 'center',
    borderRadius: 5,
  }
})