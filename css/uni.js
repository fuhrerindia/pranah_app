import React, { useState } from 'react';
import { Dimensions, Alert, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let deviceWidth = Dimensions.get('window').width;

const getLang = async () => {
    try {
        const value = await AsyncStorage.getItem('lang');
        if (value !== null) {
            // We have data!!
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
}
const uni = {
    lang: (hindi, english) => {
        return hindi;
    },
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    dev: (mob, tb, lap) => {
        if (deviceWidth < 400) {
            return mob;
        } else if (deviceWidth > 399 && deviceWidth < 900) {
            return tb;
        } else {
            return lap;
        }
    },
    theme: "#fff",
    isPC: () => {
        if (deviceWidth > 900) {
            return true;
        } else {
            return false;
        }
    },
    isTab: () => {
        if (deviceWidth > 399 && deviceWidth < 900) {
            return true;
        } else {
            return false;
        }
    },
    isMob: () => {
        if (deviceWidth < 400) {
            return true;
        } else {
            return false;
        }
    },
    stb: StatusBar.currentHeight,
    bind: (url) => {
        // return "http://192.168.43.89/pranah/" + url;
        return `https://web.pranahapp.in/services/${url}`;
    },
    string: (obj) => {
        if (obj !== undefined) {
            let prop = "";
            let prov = 0;
            Object.keys(obj).forEach(function (key) {
                if (prov == 0) {
                    prop = key + "=" + obj[key];
                    prov = prov + 1;
                } else {
                    prop = prop + "&" + key + "=" + obj[key]
                }
            });
            return prop;
        } else {
            return "";
        }
    },
    alert: (h, b) => {
        if (Platform.OS === "web"){
            alert(b);
        }else{
            Alert.alert(h, b);
        }
    },
    Error: (toPrint) => {
        if (toPrint == undefined) {
            Alert.alert(uni.lang("गड़बड़ !", "Error"), uni.lang("कुछ गड़बड़ हो गई है, कृपया कुछ देर बाद प्रयास करे। ", "Something Went Wrong, please try again later."));
        } else {
            Alert.alert("गड़बड़!", `कुछ गड़बड़ हो गई है, गड़बड़ की जानकारी नीचे है, ये जानकारियां भविष्य में हटा दी जाएँगी, अभी के लिए स्क्रीनशॉट ले के इसका विवरण प्रणह को बताये, आप ये निचे समायोजन में जा के कर सकते हैं। => ${toPrint}`);
        }
    },
    passLength: 2,
    logic: (val) => {
        let valn = String(val);
        valn = valn.replace(" ", "");
        return valn;
    },
    signOut: (nav) => {
        AsyncStorage.removeItem("mail");
        AsyncStorage.removeItem("pass");
        nav.replace("Login");
    }
}
export { uni };