import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
class FlatListBook extends React.Component {
    render() {
        return (
            <View style={styles.listItem}>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Image style={{ flex: 3 }} source={{ uri: this.props.item.cover_image }} />
                </View>
                <View style={{ alignItems: 'flex-start', flex: 4 }}>
                    <Text style={{ color: "#000" }}>Tiêu đề: {this.props.item.title}</Text>
                    <Text style={{ color: "#000" }}>Tác giả: {this.props.item.author}</Text>
                    <Text style={{ color: "#000" }}>Thể loại: {this.props.item.genre}</Text>
                    <Text style={{ color: "#000" }}>Số chương: {this.props.item.chapters}</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={()=>{}}>
                        <FontAwesomeIcon name="trash" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
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