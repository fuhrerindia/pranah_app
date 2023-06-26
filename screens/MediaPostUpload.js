import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { uni } from '../css/uni';
import { colors } from '../pranah/colors';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pranah } from '../pranah/cust';
import axios from 'axios';
import PranahUser from './tminc/cred';
import base64 from 'react-native-base64';
import i18next from "../lang/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


const MediaPostUpload = ({navigation}) => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { t, i18n } = useTranslation();
    const UpdateLangugae = () => {
        AsyncStorage.getItem("lang")
            .then((l) => {
                i18n.changeLanguage(l)
            });
    }

    useEffect(() => {
        UpdateLangugae();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(uni.lang('कृपया तस्वीर चुन ने की इजाजत दें।', 'Sorry, we need camera roll permissions to make this work!'));
                }
            }
        })();
    }, []);

    function UploadImageWithText() {
        setIsUploading(true);
        PranahUser()
            .then((cred) => {
                let localUri = image.uri;
                let filename = localUri.split('/').pop();

                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;

                let formData = new FormData();
                formData.append('photo', { uri: localUri, name: filename, type });
                formData.append('mail', cred.mail);
                formData.append('pass', base64.encode(cred.pass));
                formData.append('postCaption', base64.encode(caption))

                axios({
                    method: 'post',
                    url: uni.bind('imagepostupload'),
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((r) => {
                        // setIsUploading(false);
                        if (r.status == 200){
                            let pge = r.data;
                            // console.log(pge);
                            if (uni.logic(pge) === "error"){
                                uni.Error("RESP: ERROR");
                            }else if(uni.logic(pge) === "invalid"){
                                uni.signOut(navigation);
                            }else if (uni.logic(pge) === "true"){
                                navigation.goBack();
                            }else{
                                // navigation.goBack();
                                alert("ERR");
                                // console.log(pge)
                            }
                        }else{
                            uni.Error("RESP !== 200");
                        }
                    })
                    .catch((e) => uni.Error(e))
            })
            .catch((e) => {
                uni.Error(e);
            });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <KeyboardAvoidingView style={{ height: "100%", width: "100%" }}>
        <ScrollView style={{ height: "100%", width: "100%" }} contentContainerStyle={{ alignItems: "center" }} bounces={false}>
        <View style={{ alignContent: "center", alignItems: "center", width:"100%" }}>
            <Pranah.br height={20} />
            <TextInput
                value={caption}
                onChangeText={(v) => setCaption(v)}
                style={{
                    width: "80%",
                    backgroundColor: "#FFF",
                    borderRadius: 20,
                    padding: 10,
                    color: caption.length == 200 ? "green" : caption.length > 200 ? "red" : colors.realBlack
                }}
                placeholder={t("mediaHint")}
                multiline={true}
                placeholderTextColor={colors.realBlack}
            />
            <View style={{ width: "80%", alignContent: "flex-end", alignItems: "flex-end" }}>
                <Text style={{
                    marginRight: 20,
                    marginTop: 10,
                    color: caption.length == 200 ? "green" : caption.length > 200 ? "red" : colors.realBlack,
                    fontWeight: caption.length > 200 ? "bold" : undefined
                }}>{caption.length}/200</Text>
            </View><Pranah.br height={15} />
            <View style={{ flexDirection: "row" }}>
                <Image
                    source={image == null ? require('../assets/def_temp.png') : { uri: image.uri }}
                    style={{
                        width: 80, height: 80,
                        borderRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0
                    }}
                />
                <TouchableOpacity style={{
                    height: 80,
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    width: (uni.width * 80 / 100) - 80,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    backgroundColor: "#fff"
                }}
                    onPress={() => {
                        pickImage();
                    }}
                >
                    <MaterialCommunityIcons name="image-size-select-actual" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Pranah.br height={30} />
            <View>
                {image !== null && caption.length < 201 ? isUploading == false ? <Pranah.btn title={t("post")} width={150} onPress={UploadImageWithText} /> : <ActivityIndicator color={colors.primary} size="large" /> : null}
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default MediaPostUpload;
