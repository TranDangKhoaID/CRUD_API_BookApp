import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>QUẢN LÝ SÁCH</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddBook')} style={styles.btn}>
        <Text style={{color: '#FFF', fontSize: 20}}>SÁCH</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('StatisticBook')} style={styles.btn}>
        <Text style={{color: '#FFF', fontSize: 20}}>THỐNG KÊ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    btn:{
        backgroundColor: '#f50057',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'pink',
        marginVertical: 20,
    }
})