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
        <View>
            <Text>Thống kê sách</Text>
            <Text>Số lượng sách: {books.length}</Text>
            <Text>Số lượng người dùng: {users.length}</Text>
            <Text>Số lượng chương: {chapters.length}</Text>
        </View>
    )
}

export default ChartBook

const styles = StyleSheet.create({})