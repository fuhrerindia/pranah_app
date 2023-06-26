import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

const UserPostHeader = (obj) => {
    return (
        <TouchableOpacity>
            <View style={{
                flexDirection: "row",
                marginLeft: 20,
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                alignContent: "flex-start"
            }}>
                <Image source={{ uri: obj.dp }}
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#dddddd",
                        borderRadius: 25
                    }}
                />
                <View
                    style={{
                        flexDirection: "column",
                        margin: 7
                    }}
                >
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>{obj.name}</Text>
                    <Text
                        style={{
                            marginTop: -5
                        }}
                    >@{obj.username}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export { UserPostHeader };