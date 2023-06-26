import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { uni } from '../css/uni.js';

const PostCaption = {
    MediaPostCaption: (obj) => {
        return (
            <>
                <View style={{
                    marginHorizontal: 10 / 100 * uni.width,
                    marginVertical: 15,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1
                }}>
                    <Text style={{
                        paddingBottom: 15
                    }}>{obj.caption}</Text>
                </View>
            </>
        );
    },
    TextPostCaption: () => {
        return (
            <>
                <View style={{
                    marginHorizontal: 10 / 100 * uni.width,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    marginVertical: 15
                }}>
                </View>
            </>
        );
    }
}

export { PostCaption };