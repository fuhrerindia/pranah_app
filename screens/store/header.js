import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { uni } from '../../css/uni';
import { colors } from '../../pranah/colors';

export default function HeaderShop({navigation}) {
    const [searchInput, setsearchInput] = useState("");

    return (
        <>
            <View style={style.titlebar}>
                <View style={style.sides}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} color="black" style={style.backIcon} />
                    </Pressable>
                </View>
                <View style={[style.sides, style.centerbaazi]}>
                    <Text style={style.screentitle}>Shop</Text>
                </View>
                <View style={style.sides}></View>
            </View>
            <View style={[style.fullwidthbaazi, style.centerbaazi]}>
                <View style={[style.tb, style.flexbaazi]}>
                    <Ionicons name="ios-search-outline" size={20} color="black" style={style.searchicon} />
                    <TextInput
                        placeholder='What are you looking for?'
                        style={style.textinput}
                        onChangeText={setsearchInput}
                    />
                </View>
            </View>
        </>
    )
}
const style = StyleSheet.create({
    titlebar: {
        width: uni.width,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        flexDirection: "row"
    },
    sides: {
        width: uni.width / 3,
    },
    centerbaazi: {
        alignItems: "center",
        justifyContent: "center"
    },
    screentitle: {
        fontSize: 20,
    },
    backIcon: {
        marginLeft: 20
    },
    fullwidthbaazi: {
        width: "100%"
    },
    tb: {
        width: "80%",
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: 5
    },
    flexbaazi: {
        flexDirection: "row"
    },
    searchicon: {
        margin: 3
    },
    textinput: {
        width: "85%"
    }
});
