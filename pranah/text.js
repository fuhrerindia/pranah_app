import React from "react";
import { View, Image, Text } from "react-native";
import { uni } from "../css/uni.js";

// TWO TYPES OF FUNCTIONS

const TextPostCont = (obj) => {
    return (
        <>
            <View
                style={{
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        alignContent: "center",
                        width: (95 / 100) * uni.width,
                        height: (95 / 100) * uni.width,
                        backgroundColor: "#ededed",
                        alignItems: "center",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            alignItems: "center",
                            alignContent: "center",
                            textAlign: "justify",
                            lineHeight: 23,
                            margin: (10 / 100) * uni.width,
                        }}
                    >
                        {obj.text}
                    </Text>
                </View>
            </View>
        </>
    );
};
export { TextPostCont };
