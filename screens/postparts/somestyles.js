import React from 'react';
import { StyleSheet } from 'react-native';
import {uni} from '../../css/uni';
const style = StyleSheet.create({
    web: {
        width: uni.dev("100%", "100%", "40%"),
        height: uni.dev("100%", "100%", uni.height - 50),
        marginLeft: uni.dev(0, 0, 10 / 100 * uni.width)
    }
});
const postDesign = {
    width: uni.dev(95 / 100 * uni.width, 95 / 100 * uni.width, 35 / 100 * uni.width),
    height: uni.dev(95 / 100 * uni.width, 95 / 100 * uni.width, 35 / 100 * uni.width),
    backgroundColor: "#ededed",
    borderRadius: 10,
}
const iconDynamicSizing = 25;
const iconDesign = StyleSheet.create({
    icon: {
        margin: 10
    }
});

export {style, postDesign, iconDynamicSizing, iconDesign};