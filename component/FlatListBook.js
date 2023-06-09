import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';

const handleDeleteBook = (id) => {
    // Hiển thị cảnh báo xác nhận trước khi xóa sách
    Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn xóa sách này?',
        [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: () => {
                    // Gửi yêu cầu DELETE đến API để xóa sách
                    fetch(`http://192.168.1.7:3001/api/books/${id}`, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => {
                            // Xử lý phản hồi từ API (nếu cần)
                            console.log(data);
                            Alert.alert('Xóa thành công')
                            // Thực hiện cập nhật lại danh sách sách sau khi xóa thành công
                        })
                        .catch(error => {
                           console.error('Error:', error);
                        });
                },
            },
        ],
        { cancelable: false },
    );
};


const FlatListBook = ({ item,navigation }) => {
    return (
        <View style={styles.listItem}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Image style={{ flex: 3 }} source={{ uri: item.cover_image }} />
          </View>
          <View style={{ alignItems: 'flex-start', flex: 4 }}>
            <Text style={{ color: '#000' }}>Tiêu đề: {item.title}</Text>
            <Text style={{ color: '#000' }}>Tác giả: {item.author}</Text>
            <Text style={{ color: '#000' }}>Thể loại: {item.genre}</Text>
            <Text style={{ color: '#000' }}>Số chương: {item.chapters}</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity  onPress={() => navigation.navigate('Chapters', { id : item.id })}>
              <FontAwesomeIcon name="book" size={30} color="green" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditBook', { book: item })}>
              <FontAwesomeIcon name="edit" size={30} color="blue" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => handleDeleteBook(item.id)}>
              <FontAwesomeIcon name="trash" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
    );
}


export default FlatListBook

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderColor: '#f50057',
        borderWidth: 2,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: "pink",
    },
})