import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import { uni } from '../css/uni';
import base64 from 'react-native-base64';
import { colors } from '../pranah/colors';
import { Pranah } from '../pranah/cust';
import i18next from "../lang/i18n";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextPost = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const { t, i18n } = useTranslation();
    const UpdateLangugae = () => {
        AsyncStorage.getItem("lang")
            .then((l) => {
                i18n.changeLanguage(l)
            });
    }

    function uploadPost() {
        setIsPosting(true);
        AsyncStorage.getItem("mail")
            .then((val) => {
                let mail = val;
                AsyncStorage.getItem("pass")
                    .then((pvalue) => {
                        let pass = pvalue;
                        //   CONNECTING TO SERVER
                        axios({
                            method: 'post',
                            url: uni.bind('textpost'),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            data: uni.string({
                                mail: mail,
                                pass: base64.encode(pass),
                                text: value
                            })
                        })
                            .then((resp) => {
                                if (resp.status == 200) {
                                    let page = resp.data;
                                    /*
                                        SERVER RETURNS
                                        nomore | followernull | error | invalid | {json data}
                                    */
                                    if (uni.logic(page) === "error") {
                                        uni.Error("ERROR FROM BACKEND");
                                    } else if (uni.logic(page) === "invalid") {
                                        //SIGNOUT
                                        // uni.signOut(navigation);
                                        // alert(page);
                                        uni.signOut();
                                    } else {
                                        //CLOSE SCREEN
                                        navigation.goBack(navigation);
                                        // alert(page);
                                    }
                                } else {
                                    uni.Error("ERROR 300");
                                }
                            })
                            .catch((e) => {
                                uni.Error(e);
                            });

                    })
                    .catch((e) => {
                        // uni.signOut(navigation)
                        uni.Error(e);
                    })
            })
            .catch((err) => {
                // uni.signOut(navigation)
                uni.Error(err)
            })
    }

    function updateText(value) {
        setValue(value);
    }
    useEffect(()=>{
        UpdateLangugae();
    }, []);
    let tclr = value.length == 1000 ? "green" : value.length > 1000 ? colors.primary : colors.realBlack;
    return (
        <KeyboardAvoidingView style={{ height: "100%", width: "100%" }}>
            <ScrollView style={{ height: "100%", width: "100%" }} contentContainerStyle={{ alignItems: "center" }} bounces={false}>
                <View style={{
                    alignContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <TextInput
                        placeholder={t("textHint")}
                        style={{
                            backgroundColor: colors.white,
                            paddingVertical: 10,
                            width: 90 / 100 * uni.width,
                            marginTop: 5 / 100 * uni.height,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            lineHeight: 26,
                            color: tclr
                        }}
                        placeholderTextColor={colors.realBlack}
                        multiline={true}
                        value={value}
                        onChangeText={(v) => setValue(v)}
                    />
                    <View style={{
                        width: 90 / 100 * uni.width,
                        alignItems: "flex-end",
                        alignContent: "flex-end",
                        paddingRight: 20,
                        marginTop: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            color: tclr
                        }}>{value.length}/1000</Text>
                    </View>
                    <View>
                        <Pranah.br height={20} />
                        {isPosting == true ? <ActivityIndicator color={colors.primary} size="large" /> : null}
                        {value.length < 1001 ? isPosting == false ? <Pranah.btn title={t("post")} width={150} onPress={uploadPost} /> : null : null}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export { TextPost };
