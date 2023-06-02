import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AddBook = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={styles.paragraph}>Quản lý sản phẩm</Text>
      <View>
        <TextInput style={styles.containerInput}
          placeholder="Tiêu đề"
        />
        <TextInput style={styles.containerInput}
          placeholder="Tác giả"
        />
        <TextInput style={styles.containerInput}
          placeholder="Thể loại"
        />
        <TextInput style={styles.containerInput}
          placeholder="Link ảnh"
        />
        <TextInput style={[styles.containerInput, { height: 150 }]}
          placeholder="Mô tả"
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          underlayColor='#fff'
          style={styles.button}><Text>ADD</Text></TouchableOpacity>
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