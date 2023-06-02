import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';

const AddChapter = ({ navigation }) => {

    const route = useRoute();
    const id = route.params.id;
    //
    const [chapter_number, setChapterNumber] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleAddChapter = () => {
        // Kiểm tra nếu một trong các trường bị bỏ trống, hiển thị thông báo lỗi
        if (!title || !chapter_number || !content) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Tạo đối tượng sách mới từ thông tin nhập vào
        const newChapter = {
            title: title,
            chapter_number: chapter_number,
            content: content,
            book_id: id,
        };

        // Gửi request POST đến API để thêm sách
        fetch('http://192.168.1.7:3001/api/chapters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChapter)
        })
            .then(response => response.json())
            .then(data => {
                // Xử lý phản hồi từ API (nếu cần)
                console.log(data);
                // Sau khi thêm sách thành công
                Alert.alert('Thêm chương thành công!');
                setTitle('');
                setChapterNumber('');
                setContent('');

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, padding: 24 }}>
            <Text style={styles.paragraph}>Thêm Chương</Text>
            <View>
                <TextInput style={styles.containerInput}
                    placeholder="Số Chương"
                    value={chapter_number}
                    keyboardType="numeric"
                    onChangeText={text => setChapterNumber(text)}
                />
                <TextInput style={styles.containerInput}
                    placeholder="Tiêu đề"
                    value={title}
                    onChangeText={text => setTitle(text)}
                />

                <TextInput style={[styles.containerInput, { height: 250 }]}
                    placeholder="Nội dung"
                    value={content}
                    onChangeText={text => setContent(text)}
                />
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    onPress={handleAddChapter}
                    underlayColor='#fff'
                    style={styles.button}><Text style={{ fontWeight: 'bold' }}>THÊM</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AddChapter

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
        borderColor: '#A6D4FF',
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
        backgroundColor: '#A6D4FF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 5,
        textAlign: 'center',
        borderRadius: 5,
    }
})