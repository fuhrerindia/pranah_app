import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, ActivityIndicator, Pressable } from 'react-native';
import { uni } from '../../css/uni';
import { colors } from '../../pranah/colors';
import { Pranah } from '../../pranah/cust';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import PranahUser from '../tminc/cred';
import { RadioButton } from 'react-native-paper';


const LanguageSelect = ({ navigation }) => {
    const [appData, setAppData] = useState(false);

    //PRIVATE ACC
    const [isPrivate, setIsPrivate] = useState(false)
    const [checked, setChecked] = useState('hi');


    useEffect(() => {
        AsyncStorage.getItem("lang")
        .then((v)=>{
            setChecked(v == null || v == undefined || v === 'hi' ? 'hi' : 'en');
        })
    }, []);
    function saveLanguage(lang){
        setChecked(lang);
        AsyncStorage.setItem("lang", lang)
        .then(()=>{
            navigation.goBack();
        })
        .catch(()=>{uni.Error()});
    }
    return appData == false ? (
        <View style={[styles.view, {padding:8}]}>
            <View style={{flexDirection:"row"}}>
            <RadioButton
                value="hi"
                status={checked === 'hi' ? 'checked' : 'unchecked'}
                onPress={() => saveLanguage('hi')}
            />
            <Pressable onPress={()=>saveLanguage("hi")}>
            <Text style={{
                fontSize:18,
                marginTop: 8
            }}>हिंदी</Text>
            </Pressable>
            </View>
            <Pranah.br height={5} />
            <View style={{flexDirection:"row"}}>
            <RadioButton
                value="en"
                status={checked === 'en' ? 'checked' : 'unchecked'}
                onPress={() => saveLanguage('en')}
            />
            <Pressable onPress={()=>saveLanguage("en")}>
            <Text style={{
                fontSize:18,
                marginTop: 8
            }}>English</Text>
            </Pressable>
            </View>
            <Text style={
                {
                    textAlign: "justify",
                    margin: 50,
                    marginTop: 20,
                    color: colors.grey
                }
            }>{uni.lang(
                "आप इस संस्करण में कोई बदलाव नहीं देखेंगे क्योंकि REDUX तकनीक का अभी तक उपयोग नहीं किया गया है।", //HINDI CONTENT
                "You will not see any change in this version as REDUX Technology is not used yet." //ENGLISH TRANSLATION
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
        alignContent: "flex-start",
        alignItems: "flex-start",
        margin: 10
    }
});

export { LanguageSelect };
