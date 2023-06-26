import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Touchable } from 'react-native'
import { uni } from '../css/uni';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StyledText from 'react-native-styled-text';



export default function NewBlog({ navigation }) {
    const [blogText, setBlogText] = useState("");
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    const doBold = () => {
        if (bold == true) {
            setBlogText(`${blogText}</b>`);
            setBold(false);
        } else {
            setBlogText(`${blogText}<b>`);
            setBold(true);
        }
    }
    const doItalic = () => {
        if (italic == true) {
            setBlogText(`${blogText}</i>`);
            setItalic(false);
        } else {
            setBlogText(`${blogText}<i>`);
            setItalic(true);
        }
    }
    const doUnderline = () => {
        if (underline == true) {
            setBlogText(`${blogText}</u>`);
            setUnderline(false);
        } else {
            setBlogText(`${blogText}<u>`);
            setUnderline(true);
        }
    }
    return (
        <View style={style.screen}>
            <ScrollView>
                <View style={style.flex}>
                    <TouchableOpacity style={[style.btn, bold === true ? { backgroundColor: "#666" } : null]} onPress={doBold}>
                        <FontAwesome5 name="bold" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.btn, italic === true ? { backgroundColor: "#666" } : null]} onPress={doItalic}>
                        <FontAwesome5 name="italic" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.btn, underline === true ? { backgroundColor: "#666" } : null]} onPress={doUnderline}>
                        <FontAwesome5 name="underline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    value={blogText}
                    onChangeText={setBlogText}
                    style={[style.tinput, {color: blogText.length > 8000 ? "red": "#000"}]}
                    placeholder='Enter Blog'
                    multiline={true}
                />
                <View style={style.flexright}>
                    <Text>
                        {`${blogText.length} / 8000`}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}
const style = StyleSheet.create({
    screen: {
        flex: 1
    },
    flex: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        marginTop: 20
    },
    flexright: {
        marginTop: 25,
        flexDirection: "row",
        width: "100%",
        paddingRight: 50,
        alignItems: "flex-end",
        alignContent: "flex-end",
        justifyContent: "flex-end"
    },
    tinput: {
        backgroundColor: "#fff",
        width: uni.width - 50,
        borderRadius: 15,
        marginTop: 15,
        marginLeft: 25,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    btn: {
        marginHorizontal: 10,
        padding: 10,
        // backgroundColor: "",
        borderRadius: 10
    }
});