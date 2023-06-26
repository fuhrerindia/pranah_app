import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, ScrollView } from 'react-native';
import { Pranah } from '../../pranah/cust';
import { uni } from '../../css/uni';
import { style } from '../postparts/somestyles';
import { WebBasedNavigation } from '../tminc/widenav';
import i18next from "../../lang/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const SettingItem = ({ title, navigation, dest, additionalCSS, onPress }) => {
    return (
        <>
            <TouchableOpacity onPress={onPress == undefined ? typeof dest !== "string" ? dest : () => navigation.navigate(dest) : onPress}>
                <View style={styles.litem}>
                    <Text style={[styles.text, additionalCSS !== undefined || additionalCSS !== null ? additionalCSS : null]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}
const SettingList = ({ navigation }) => {
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
        <View>
            {/* <Pranah.pranahHead nav={navigation} /> */}
            <View
                style={{ width: "100%", height: "100%", flexDirection: "row" }}
            >
                <View
                    style={style.web}
                >
                    <ScrollView>
                        <Pranah.br height={20} />
                        <SettingItem title={t("editProfile")} navigation={navigation} dest="EditProfileSetting" />
                        <SettingItem title={t("privateAcc")} navigation={navigation} dest="EditPrivateAccount" />
                        <SettingItem title={t("lang")} navigation={navigation} dest="LanguageSelect" />
                        <SettingItem title={t("rBug")} onPress={() => Linking.openURL("https://forms.gle/PjYBA4LBa5RbyFYJ7")} navigation={navigation} dest="" />
                        <SettingItem title={t("pPolicy")} onPress={() => Linking.openURL("https://pranahofficial.gitbook.io/documentation/privacy-policy")} navigation={navigation} dest="" />
                        <SettingItem title={t("credit")} onPress={() => Linking.openURL("https://pranahofficial.gitbook.io/documentation/pranah-team")} navigation={navigation} dest="" />
                        <SettingItem title={t("sOut")} navigation={navigation} dest={() => { uni.signOut(navigation) }} additionalCSS={{ color: "red" }} />
                    </ScrollView>
                </View>
                <WebBasedNavigation navigation={navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    litem: {
        backgroundColor: "#fff",
        padding: 8,
        marginBottom: 5
    },
    text: {
        fontSize: 18,
        marginLeft: 15
    }
})

export default SettingList;
