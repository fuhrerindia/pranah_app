import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ActivityIndicatorBase } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from './component/post';
import PranahUser from './tminc/cred';
import base64 from 'react-native-base64';
import { uni } from '../css/uni';
import axios from 'axios';

function callApi(mail, pass, setData, postId, setLoaded) {
    axios({
        method: 'post',
        url: uni.bind('mediapost'),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: uni.string({
            post: postId,
            mail: base64.encode(mail),
            pass: base64.encode(pass)
        })
    })
        .then((resp) => {
            setLoaded(true);
            if (resp.status == 200) {
                let page = resp.data;
                if (uni.logic(page) === "error" || uni.logic(page) === "null") {
                    uni.Error("EITHER ERROR OR NULL");
                } else if (uni.logic(page) === "invalid") {
                    uni.signOut(navigation);
                } else if (uni.logic(page) === "private") {
                    //SOME CODE FOR PRIVATE POST
                } else {
                    setData(page);
                    setLoaded(true);
                }
            } else {
                uni.Error("UNKNOWN ERR");
            }
        })
        .catch((e) => { uni.Error(e) })
}

function MpScreen({ navigation, route }) {
    const { postId, username } = route.params;
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        PranahUser()
            .then(({ mail, pass }) => {
                callApi(mail, pass, setData, postId, setLoaded);
            })
            .catch(e => uni.Error(e))
    }, []);
    function MainBody() {
        if (loaded) {
            return <ListItem item={data} navigation={navigation} OneData={data} setOneData={setData}/>
        } else {
            return (<>
                <View style={[style.center, style.screen]}>
                    <ActivityIndicator
                        size="large"
                        color={"red"}
                    />
                </View>
            </>);
        }
    }
    return (
        <View style={style.screen}>
            <View style={style.flex}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="black" style={style.backIcon} />
                </TouchableOpacity>
                <Text style={style.username}>{`@${username}`}</Text>
            </View>
            <MainBody />
        </View>
    )
}

// { item, index, navigation, list, setData }

export { MpScreen };
const style = StyleSheet.create({
    backIcon: {
        margin: 20
    },
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    },
    flex: {
        flexDirection: "row"
    },
    center: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    username: {
        marginTop: 17,
        fontSize: 20,
        marginLeft: -10
    }
});