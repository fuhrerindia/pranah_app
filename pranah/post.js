import React from 'react';
import { View, Image } from 'react-native';
import { uni } from '../css/uni.js';

// TWO TYPES OF FUNCTIONS

const MainPostCont = (obj) => {
    return (
        <>
            <View style={{
                width: "100%",
                alignContent: "center",
                alignItems: "center",
                marginTop: 10
            }}>
                <Image
                    style={{
                        width: 95 / 100 * uni.width,
                        height: 95 / 100 * uni.width,
                        backgroundColor: "#ededed",
                        borderRadius: 10
                    }}
                    source={{ uri: obj.path }}
                />
            </View>
        </>
    );
}
export { MainPostCont };