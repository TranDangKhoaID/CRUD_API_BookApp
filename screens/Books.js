import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FlatListBook from '../component/FlatListBook';


const Books = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={books}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return <FlatListBook item={item} />;
        }}
      />
    </SafeAreaView>
  )
}

export default Books

const styles = StyleSheet.create({})