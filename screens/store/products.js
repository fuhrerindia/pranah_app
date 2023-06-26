import React from 'react';
import { View, ImageBackground, StyleSheet, FlatList } from 'react-native';
import bg from '../../assets/shopbg.png';
import { Header, ProductItem } from './comp';
import {createDrawerNavigation} from '@react-navigation/drawer';
export default function Products() {
    return (
        <View style={style.flex}>
            <ImageBackground source={bg} style={style.bg}>
                <FlatList
                    ListHeaderComponent={<Header />}
                    // stickyHeaderIndices={[0]}    
                    data={[
                        {
                            id: 1,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 2,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 3,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 4,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 5,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 6,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 7,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 8,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 9,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 10,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 11,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 12,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        },
                        {
                            id: 13,
                            title: "Sunsilk",
                            seller: "Some Random Shop",
                            price: "150"
                        }
                    ]}
                    renderItem={({ item: { id, title, seller, price } }) => <ProductItem id={id} title={title} seller={seller} price={price} />}
                    contentContainerStyle={style.list}
                />
            </ImageBackground>
        </View>
    )
}
const style = StyleSheet.create({
    flex: {
        flex: 1
    },
    bg: {
        width: "100%",
        height: "100%"
    },
    list: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
});
const iconSize = 30;