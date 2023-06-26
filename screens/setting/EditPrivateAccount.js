import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, ActivityIndicator, Pressable } from 'react-native';
import { uni } from '../../css/uni';
import { colors } from '../../pranah/colors';
import { Pranah } from '../../pranah/cust';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import PranahUser from '../tminc/cred';

const EditPrivateAccount = ({ navigation }) => {
    const [appData, setAppData] = useState(true);

    //PRIVATE ACC
    const [isPrivate, setIsPrivate] = useState(false)


    useEffect(() => {
        PranahUser()
            .then((cred) => {
                axios(
                    {
                        method: 'post',
                        url: uni.bind('privacy_check'),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: uni.string({
                            mail: cred.mail,
                            pass: base64.encode(cred.pass)
                        })
                    }
                ).then((resp) => {
                    setAppData(false);
                    if (resp.status == 200) {
                        let page = resp.data;
                        if (uni.logic(page) === "public" || uni.logic(page) === "private") {
                            if (uni.logic(page) === "public") {
                                setIsPrivate(false);
                            } else if (uni.logic(page) === "private") {
                                setIsPrivate(true);
                            }
                        } else {
                            uni.Error();
                        }
                    } else {
                        uni.Error();
                    }
                })
                    .catch();
            })
            .catch(() => {
                uni.Error();
            });
    }, []);

    function changeStatus() {
        setIsPrivate(isPrivate ? false : true);
        setAppData(true);
        PranahUser()
            .then((cred) => {
                axios(
                    {
                        method: 'post',
                        url: uni.bind('privacy_save'),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: uni.string({
                            mail: cred.mail,
                            pass: base64.encode(cred.pass),
                            dest: isPrivate == false ? "private" : "public"
                        })
                    }
                )
                    .then((resp) => {
                        setAppData(false);
                        if (resp.status == 200) {
                            let pge = resp.data;
                            if (uni.logic(pge) === "error") {
                                uni.Error();
                            } else if (uni.logic(pge) === "invalid") {
                                uni.signOut();
                            } else {
                                navigation.goBack();
                                // alert(pge);
                            }
                        } else {
                            uni.Error();
                        }
                    })
                    .catch(() => {
                        uni.Error();
                    });
            })
            .catch(() => {
                uni.Error();
            });
    }
    return appData == false ? (
        <View style={styles.view}>
            <View style={{
                flexDirection: "row",
                marginTop: 20
            }}>
                <Pressable onPress={changeStatus} style={{
                    marginTop: 3,
                    width: "70%"
                }}>
                    <Text style={{
                        fontSize: 18
                    }}>{uni.lang("निजी खता", "Private Account")}</Text>
                </Pressable>
                <Switch
                    trackColor={{ false: colors.grey, true: colors.grey }}
                    thumbColor={isPrivate ? colors.silver : colors.silver}
                    ios_backgroundColor={colors.grey}
                    onValueChange={changeStatus}
                    value={isPrivate}
                />
            </View>
            <View style={{ width: "100%", backgroundColor: "#ddd", height: 1, marginTop: 15 }}></View>
            <Text style={
                {
                    textAlign: "justify",
                    margin: 50,
                    marginTop: 20,
                    color: colors.grey
                }
            }>{uni.lang(
                "निजी खातों में जो लोग आपको फॉलो नहीं करते हैं वे आपके पोस्ट और तस्वीर नहीं देख पाएंगे। लोग सीधे आपका अनुसरण नहीं कर पाएंगे, उन्हें इसके बजाय अनुरोध भेजने की आवश्यकता होगी।", //HINDI CONTENT
                "In Private Accounts, people who don't follow you will not be able to see your Posts and DP. People will not be able to follow you directly, they will need to send request instead." //ENGLISH TRANSLATION
            )}</Text>
        </View>
    ) : (<>
        <View style={{ width: "100%", height: "100%", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    </>);
}

const styles = StyleSheet.create({
    view: {
        alignContent: "center",
        alignItems: "center"
    }
});

export { EditPrivateAccount };
