import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native';
import FlatListChapter from '../component/FlatListChapter';
import { useRoute } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Chapters = ({navigation}) => {
    //lấy id books
    //Lấy item books qua
    const route = useRoute();
    const id = route.params.id;
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetch(`http://192.168.1.7:3001/api/books/${id}/chapters`)
          .then(response => response.json())
          .then(data => {
            setChapters(data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    if(chapters.length == 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{flex: 1, marginTop: 100}}>Sách chưa có chương nào hết, vui lòng thêm chương</Text>
                <TouchableOpacity style={{alignItems: 'center',padding: 20, width: '100%', backgroundColor: '#A6D4FF'}} onPress={() => navigation.navigate('AddChapter',{id})}>
                    <FontAwesomeIcon name="plus-circle" size={30} color="blue" />
                </TouchableOpacity>
            </View>
        )
    }else{
        return (
            <View style={{ flex: 1, justifyContent: 'center'  }}>
                <FlatList
                    data={chapters}
                    style={{ flex: 1 }}
                    renderItem={({ item }) => {
                        return <FlatListChapter item={item}/>;
                    }}
                    keyExtractor={(item) => item.id.toString()} // Using id as the key
                />
                <TouchableOpacity style={{width: '100%', alignItems: 'center', padding: 20, backgroundColor: '#A6D4FF'}} onPress={() => navigation.navigate('AddChapter',{id})}>
                    <FontAwesomeIcon name="plus-circle" size={30} color="blue" />
                </TouchableOpacity>
            </View>
        )
    }
    
}

export default Chapters

const styles = StyleSheet.create({})