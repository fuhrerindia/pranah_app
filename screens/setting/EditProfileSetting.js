import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ActivityIndicator, Image, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { uni } from '../../css/uni';
import { colors } from '../../pranah/colors';
import { Pranah } from '../../pranah/cust';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import * as ImagePicker from 'expo-image-picker';
import PranahUser from '../tminc/cred';

const EditProfileSetting = ({ navigation }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [userDp, setUserDp] = useState({});
    const [appData, setAppData] = useState(true);
    const [image, setImage] = useState(null);

    let tclr = bio.length == 200 ? "green" : bio.length > 200 ? "red" : colors.realBlack

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result);
            setUserDp({ uri: result.uri });
        }
    };

    function UploadImageWithText() {
        if (image == null) {
            navigation.goBack();
        } else {
            setAppData(true);
            PranahUser()
                .then((cred) => {
                    let localUri = image.uri;
                    let filename = localUri.split('/').pop();

                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;

                    let formData = new FormData();
                    formData.append('photo', { uri: localUri, name: filename, type });
                    formData.append('mail', base64.encode(cred.mail));
                    formData.append('pass', base64.encode(cred.pass));

                    axios({
                        method: 'post',
                        url: uni.bind('dpuploadviaurl'),
                        headers: { 'Content-Type': 'multipart/form-data' },
                        data: formData
                    })
                        .then((r) => {
                            // setIsUploading(false);
                            if (r.status == 200) {
                                let pge = r.data;
                                // alert(pge);
                                if (uni.logic(pge) === "error") {
                                    uni.Error();
                                    // alert(pge);
                                } else if (uni.logic(pge) === "invalid") {
                                    uni.signOut(navigation);
                                } else if (uni.logic(pge) === "true") {
                                    navigation.goBack();
                                    // alert(pge);
                                } else {
                                    navigation.goBack();
                                    // alert(pge);
                                }
                            } else {
                                uni.Error();
                                // alert(r.status)
                            }
                        })
                        .catch((e) => alert(e))
                })
                .catch((e) => {
                    uni.Error();
                    // alert(e)
                });
        }
    }


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(uni.lang('कृपया तस्वीर चुन ने की इजाजत दें।', 'Sorry, we need camera roll permissions to make this work!'));
                }
            }
        })();
        PranahUser()
            .then((cred) => {
                //CALL API
                axios({
                    method: 'post',
                    url: uni.bind('fetch_info'),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: uni.string({
                        mail: cred.mail,
                        pass: base64.encode(cred.pass)
                    })
                })
                    .then((resp) => {
                        if (resp.status == 200) {
                            let page = resp.data;
                            if (uni.logic(page) === "invalid") {
                                uni.signOut();
                            } else if (uni.logic(page) === "error") {
                                uni.Error()
                                // alert(page)
                            } else {
                                setName(page.name);
                                setUsername(page.username);
                                setBio(page.bio);
                                setAppData(false);
                                setUserDp({ uri: page.dp });
                            }
                        } else {
                            uni.Error();
                            // alert(JSON.stringify(resp));
                        }
                    })
                    .catch((e) => {
                        uni.Error();
                        // alert(e)
                    });
            })
            .catch((e) => {
                uni.Error()
                // alert(e)
            });
    }, []);

    function updateDatatoServer() {
        setIsLoading(true);
        PranahUser()
            .then((cred) => {
                axios({
                    method: 'post',
                    url: uni.bind('save_info'),
                    headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' },
                    data: uni.string({
                        mail: cred.mail,
                        pass: base64.encode(cred.pass),
                        name: name,
                        username: username,
                        bio: bio
                    })
                })
                    .then((resp) => {
                        if (resp.status == 200) {
                            if (uni.logic(resp.data) === "true") {
                                // navigation.goBack();
                                AsyncStorage.setItem("username", username);
                                UploadImageWithText();
                            } else if (uni.logic(resp.data) === "username_exists") {
                                if (Platform.OS === "web") {
                                    alert("Username Already Exists");
                                    setIsLoading(false);
                                } else {
                                    Alert.alert("Warning", "Username Already Exists.");
                                }
                            } else {
                                uni.Error();
                            }
                            // setIsLoading(false);
                        } else {
                            uni.Error();
                            // alert(resp.data)
                        }
                    })
                    .catch((e) => {
                        uni.Error();
                        // alert(e)
                    });

            })
            .catch((e) => {
                uni.Error()
                // alert(e)
            });
    }
    return appData == false ? (
        <KeyboardAvoidingView style={{ height: "100%", width: "100%" }}>
            <ScrollView style={{ height: "100%", width: "100%" }} contentContainerStyle={{ alignItems: "center" }} bounces={false}>
                <View style={styles.view}>
                    <Pranah.br height={50} />
                    <TouchableOpacity onPress={pickImage}><Image
                        style={{
                            height: 100,
                            width: 100,
                            backgroundColor: "#000",
                            borderRadius: 50
                        }}
                        source={userDp.uri === "" ? require('../../assets/user.png') : userDp}
                    />
                    </TouchableOpacity>
                    <Pranah.tb
                        hint={uni.lang("नाम*", "Name*")}
                        value={name}
                        onChangeText={(v) => setName(v)}
                    />
                    <Pranah.tb
                        hint={uni.lang("उपयोगकर्ता नाम*", "Username*")}
                        value={username}
                        onChangeText={(v) => setUsername(v)}
                    />
                    <Pranah.tb
                        hint={uni.lang("Bio", "जैव")}
                        value={bio}
                        onChangeText={(v) => setUsername(v)}
                        multiline={true}
                        onChangeText={(v) => setBio(v)}
                    />
                    <View style={{
                        width: 90 / 100 * uni.width,
                        alignItems: "flex-end",
                        alignContent: "flex-end",
                        paddingRight: 10 / 100 * uni.width,
                        marginTop: 10
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            color: tclr
                        }}>{bio.length}/200</Text>
                    </View>
                    <Pranah.br height={20} />
                    <View>
                        {isLoading == false ?
                            bio.length < 201 ? (
                                <Pranah.btn
                                    title={uni.lang(" हो गया", "Save")}
                                    width={150}
                                    onPress={updateDatatoServer}
                                />
                            ) : null : <ActivityIndicator color={colors.primary} size="large" />}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    ) : (<>
        <View style={{ width: "100%", height: "100%", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    </>);
}

const styles = StyleSheet.create({
    view: {
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
});

export { EditProfileSetting };
