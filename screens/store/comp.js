import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, FlatList } from 'react-native';
import bg from '../../assets/shopbg.png';
import { MaterialIcons } from '@expo/vector-icons';
import logo from '../../assets/logo.png';
import { uni } from '../../css/uni';

const ProductItem = ({ title, seller, price, navigation, id }) => {
    return (
        <>
            <View style={prod.element}>
                <Image source={bg} style={prod.image} />
                <View style={prod.prodsnap}>
                    <Text style={prod.title}>{title}</Text>
                    <Text style={prod.seller}>{seller}</Text>
                    <Text style={prod.price}>₹{price}</Text>
                </View>
            </View>
        </>
    );
}
const Header = ({navigation}) => {
    return (
        <View style={style.verticle}>
            <View style={style.width}>
                <MaterialIcons name="drag-handle" size={iconSize} color="black" style={style.iconMargin} />
            </View>
            <Image source={logo} style={style.logo} />
            <View style={[style.width, style.right]}>
                <MaterialIcons name="search" size={iconSize} color="black" style={style.iconMargin} />
            </View>
        </View>
    );
}
const prod = StyleSheet.create({
    element: {
        width: (90 / 100) * uni.width,
        backgroundColor: "#ffffff99",
        borderRadius: 10,
        flexDirection: "row",
        marginBottom: 15
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 15,
        marginVertical: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    seller: {
        color: "#404040"
    },
    price: {
        color: "green"
    },
    prodsnap: {
        marginTop: 24,
        marginLeft: 15
    }
});
const style = StyleSheet.create({
    screen: {
        flex: 1
    },
    bg: {
        width: "100%",
        height: "100%"
    },
    logo: {
        width: 50,
        height: 50
    },
    verticle: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20
    },
    width: {
        width: (uni.width - 50) / 2
    },
    right: {
        alignItems: "flex-end",
        alignContent: "flex-end"
    },
    iconMargin: {
        marginHorizontal: 20
    }
});
const iconSize = 30;
export {Header, ProductItem};