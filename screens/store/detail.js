import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Touchable } from 'react-native';
import { uni } from '../../css/uni';
import { Pranah } from '../../pranah/cust';
import HeaderShop from './header';
import AnimatedLottieView from 'lottie-react-native';
import cartanimation from '../../assets/cart.json';

export default function Details({ navigation, route }) {
    const [addedToCart, setAddedToCart] = useState(false);
    const { id, image, name, brand, price } = route.params;
    const animation = useRef(null);
    useEffect(() => {
        
    }, []);
    function animateButton() {
        if (addedToCart === false) {
            setAddedToCart(true);
            animation.current.play(1, 94);
            console.log("CB1")
        } else if (addedToCart === true) {
            setAddedToCart(false);
            animation.current.play(94, 1);
            console.log("CB2")
        }
    }
    return (
        <View style={style.screen}>
            <ScrollView>
                <HeaderShop navigation={navigation} />
                <Pranah.br height={20} />
                <Image
                    source={{ uri: image }}
                    style={style.image}
                />
                <View style={style.titleprnt}>
                    <Text>STATUS: {String(addedToCart)}</Text>
                    <Text style={style.productname}>{name}</Text>
                    <Text>{brand}</Text>
                    <Text style={style.price}>₹{price}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <TouchableOpacity>
                        <Text>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>animateButton()}>
                        <AnimatedLottieView
                            source={cartanimation}
                            loop={false}
                            autoPlay={false}
                            style={{
                                width: 50,
                                height: 50
                            }}
                            ref={animation}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={style.about}>
                    Only left and right are set to grow and thanks to the facts that...

                    there are only two growing elements (doesn't matter if empty) and
                    that both get same widths (they'll evenly distribute the available space)
                    ...center element will always be perfectly centered.

                    This is much better than accepted answer in my opinion because you do not have to copy left content to right and hide it to get same width for both sides, it just magically happens (flexbox is magical).

                    In action:
                    Show code snippet

                    Share
                    Edit
                    Follow
                    Flag
                </Text>
            </ScrollView>
        </View>
    )
}
const style = StyleSheet.create({
    screen: {
        flex: 1
    },
    image: {
        width: uni.width,
        height: uni.width
    },
    productname: {
        fontSize: 30
    },
    titleprnt: {
        margin: 25
    },
    about: {
        margin: 20,
        lineHeight: 25,
        textAlign: "justify"
    },
    price: {
        fontSize: 25,
        marginTop: 10
    }
})