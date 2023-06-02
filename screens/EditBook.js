import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'

const EditBook = () => {
  //Lấy item books qua
  const route = useRoute();
  const book = route.params.book;
  //update
  const [updatedBook, setUpdatedBook] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    cover_image: book.cover_image
  });
  const handleInputChange = (field, value) => {
    setUpdatedBook(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const handleUpdateBook = () => {
    fetch(`http://192.168.1.7:3001/api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBook)
    })
      .then(response => response.json())
      .then(data => {
        // Xử lý kết quả cập nhật sách thành công
        console.log('Sách đã được cập nhật:', data);
        Alert.alert('Cập nhật thành công!');
      })
      .catch(error => {
        // Xử lý lỗi
        console.error('Lỗi khi cập nhật sách:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={styles.paragraph}>Cập nhật sách</Text>
      <View>
        <TextInput
          style={styles.containerInput}
          placeholder="Tiêu đề"
          value={updatedBook.title}
          onChangeText={value => handleInputChange('title', value)}
        />
        <TextInput
          style={styles.containerInput}
          placeholder="Tác giả"
          value={updatedBook.author}
          onChangeText={value => handleInputChange('author', value)}
        />
        <TextInput
          style={styles.containerInput}
          placeholder="Thể loại"
          value={updatedBook.genre}
          onChangeText={value => handleInputChange('genre', value)}
        />
        <TextInput
          style={styles.containerInput}
          placeholder="Link ảnh"
          value={updatedBook.cover_image}
          onChangeText={value => handleInputChange('cover_image', value)}
        />
        <TextInput
          style={[styles.containerInput, { height: 150 }]}
          placeholder="Mô tả"
          value={updatedBook.description}
          onChangeText={value => handleInputChange('description', value)}
        />

      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={handleUpdateBook}
          underlayColor='#fff'
          style={styles.button}><Text>LƯU</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EditBook

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
    borderColor: 'blue',
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