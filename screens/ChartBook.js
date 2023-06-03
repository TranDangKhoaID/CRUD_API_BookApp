import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const ChartBook = () => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [chapters, setChapters] = useState([]);
    useEffect(() => {
        fetch('http://192.168.1.7:3001/api/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        fetch('http://192.168.1.7:3000/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        fetch('http://192.168.1.7:3001/api/chapters')
            .then(response => response.json())
            .then(data => {
                setChapters(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text_1}>Số lượng sách</Text>
                <Text>{books.length}</Text>
            </View>
            <View style={styles.box}>
                <Text>Số lượng nguời dùng</Text>
                <Text>{users.length}</Text>
            </View>
            <View style={styles.box}>
                <Text>Số lượng chương</Text>
                <Text>{chapters.length}</Text>
            </View>
        </View>
    )
}

export default ChartBook

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    box:{
        margin: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 25,
        borderRadius: 20,
    },
    
})