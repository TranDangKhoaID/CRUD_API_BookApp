import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';

const handleDeleteChapter = (id) => {
    // Hiển thị cảnh báo xác nhận trước khi xóa sách
    Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn xóa chương này?',
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
                    fetch(`http://192.168.1.7:3001/api/chapters/${id}`, {
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

const FlatListChapter = ({ item, navigation }) => {
    return (
        <View style={styles.listItem}>
          <View style={{ alignItems: 'flex-start', flex: 4 }}>
            <Text style={{ color: '#000' }}>Chương: {item.chapter_number}</Text>
            <Text style={{ color: '#000' }}>{item.title}</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => handleDeleteChapter(item.id)}>
              <FontAwesomeIcon name="trash" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
    );
}


export default FlatListChapter

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderColor: 'blue',
        borderWidth: 2,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: "#A6D4FF",
    },
})