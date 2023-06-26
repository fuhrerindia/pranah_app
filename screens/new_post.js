import React, { useEffect, useState } from 'react';
import { Pranah } from '../pranah/cust';
import { View, StyleSheet, Text, TouchableOpacity, AppRegistry, ImageBackground } from 'react-native';
import { uni } from '../css/uni';
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import PranahUser from './tminc/cred';
import { colors } from '../pranah/colors';
import { useTranslation } from 'react-i18next';
import i18next from "../lang/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewPost = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const UpdateLangugae = () => {
        AsyncStorage.getItem("lang")
            .then((l) => {
                i18n.changeLanguage(l)
            });
    }
    useEffect(() => {
        UpdateLangugae();
    }, []);
    return (
        <ImageBackground
            source={uni.dev(require('../assets/background_mobile.png'), require('../assets/background_mobile.png'), require('../assets/background_wide.png'))}
            style={{ flex: 1 }}
            blurRadius={2}
        >
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                margin: 20,
                marginLeft: 40
            }}>{
                    t("newPost")
                }</Text>
            <View style={{
                alignItems: "center",
                alignContent: "center",
            }}>
                <TouchableOpacity onPress={() => navigation.navigate("TextPost")}>
                    <View style={styles.selectItem}>
                        <Ionicons name="ios-document-text-outline" size={40} color="black" />
                        <Text style={styles.textItem}>{t("textOnly")}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("MediaPostUpload")}>
                    <View style={styles.selectItem}>
                        <EvilIcons name="image" size={50} color="black" />
                        <Text style={styles.textItem}>{t("mediaWithText")}</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate("NewBlog")}>
                    <View style={styles.selectItem}>
                    <Entypo name="text" size={30} color="black" style={styles.marginTop} />
                        <Text style={[styles.textItem, styles.mtop]}>{"Blog"}</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    selectItem: {
        width: 300,
        borderRadius: 10,
        margin: 10,
        paddingVertical: 8,
        backgroundColor: colors.white,
        marginTop: 5,
        backgroundColor: colors.secondary,
        alignContent: "flex-start",
        flexDirection: "row",
        paddingLeft: 20
    },
    textItem: {
        fontSize: 18,
        textAlign: "center",
        margin: 10
    },
    marginTop: {
        marginTop: 4
    },
    mtop: {
        marginLeft: 10
    }
})

export { NewPost };
AppRegistry.registerComponent('new', () => NewPost);
