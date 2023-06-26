import React, { useEffect, useState } from 'react';
import { SafeAreaView, RefreshControl, Pressable, View, TouchableOpacity, ImageBackground, StyleSheet, FlatList, Text } from 'react-native';
import { Pranah } from '../pranah/cust';
import { uni } from '../css/uni';
import axios from 'axios';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataProvider, RecyclerListView } from 'recyclerlistview';
import { UserHead } from './tminc/userhead';
import { AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import { design } from './tminc/design';
import PranahUser from './tminc/cred';
import { WebBasedNavigation } from './tminc/widenav';
import { MediaCont, TextCont, PostLikes, layoutProvider, ListFooter, LoadingProg } from './postparts/mediacont';
import { style, iconDesign, iconDynamicSizing } from './postparts/somestyles';


export function Feed({ navigation }) {
    const [List, setData] = useState([]);
    const [FooterConst, setFoot] = useState(true);
    const [start, setStart] = useState(0);
    const [usersLanguage, setUsersLanguage] = useState("hi");
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setFoot(true);
        setStart(0);
        setRefreshing(true);
        setData([]);
        fetchMore();
        wait(700).then(() => setRefreshing(false));
    }, []);


    let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    }).cloneWithRows(List);


    function fetchMore() {
        AsyncStorage.getItem("mail")
            .then((val) => {
                let mail = val;
                AsyncStorage.getItem("pass")
                    .then((value) => {
                        let pass = value;
                        //   CONNECTING TO SERVER
                        axios({
                            method: 'post',
                            url: uni.bind('feed'),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            data: uni.string({
                                mail: mail,
                                pass: base64.encode(pass),
                                start: start
                            })
                        })
                            .then((resp) => {
                                if (resp.status == 200) {
                                    let page = resp.data;
                                    /*
                                        SERVER RETURNS
                                        nomore | followernull | error | invalid | {json data}
                                    */
                                   console.log(resp.data);
                                    if (uni.logic(page) === "error") {
                                        uni.Error("RESPONSE: ERROR");
                                    } else if (uni.logic(page) === "followernull" || uni.logic(page) === "nomore") {
                                        //SET FOOTER
                                        setFoot(false);
                                    } else if (uni.logic(page) === "invalid") {
                                        //SIGNOUT
                                        uni.signOut(navigation);
                                    } else {
                                        setStart(start + 20);
                                        setData(
                                            [
                                                ...List,
                                                ...page
                                            ]
                                        );
                                    }
                                } else {
                                    uni.Error("RESPONSE: 500");
                                }
                            })
                            .catch((e) => {
                                uni.Error(e);
                            });

                    })
                    .catch((e) => { uni.signOut(navigation) })
            })
            .catch(() => { uni.signOut(navigation) })
    }


    function PostAction(obj) {
        // console.warn("BREAK");
        let index = obj.in;
        function addRemoveLike() {
            let temp = List;
            temp[index].liked = temp[index].liked === "true" ? "false" : "true";
            // console.warn(temp[index]);
            setData([...temp]);

            //SAVING LIKE ON SERVER
            AsyncStorage.getItem("mail")
                .then((val) => {
                    let mail = val;
                    AsyncStorage.getItem("pass")
                        .then((value) => {
                            let pass = value;
                            //   CONNECTING TO SERVER
                            axios({
                                method: 'post',
                                url: uni.bind('like'),
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                data: uni.string({
                                    mail: mail,
                                    pass: base64.encode(pass),
                                    post: String(obj.id)
                                })
                            })
                                .then((resp) => {
                                    if (resp.status == 200) {
                                        let page = resp.data;
                                        /*
                                            SERVER RETURNS
                                            true | error | invalid
                                        */
                                        if (uni.logic(page) === "error") {
                                            uni.Error("SERVER RESP: ERROR");
                                        } else if (uni.logic(page) === "invalid") {
                                            uni.signOut(navigation);
                                        }
                                    } else {
                                        uni.Error("STATUS: !== 200");
                                        // alert('SERVER')
                                    }
                                })
                                .catch((e) => { uni.Error(e) });
                        })
                        .catch((e) => { uni.signOut(navigation) })
                })
                .catch(() => { uni.signOut(navigation) })
        }

        function doRepost(postiD) {
            PranahUser()
                .then(({ mail, pass }) => {
                    axios({
                        method: 'post',
                        url: uni.bind('repost'),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: uni.string({
                            mail: mail,
                            pass: base64.encode(pass),
                            post: postiD
                        })
                    })
                        .then(({ status, data }) => {
                            console.warn(data);
                            if (status == 200) {
                                if (uni.logic(data) === "true") {
                                    uni.alert(uni.lang("जानकारी", "Info."), uni.lang("पोस्ट रिपोस्ट कर दी गई", "Post reposted."));
                                }
                            } else {
                                uni.Error("STATUS !== 200");
                            }
                        })
                        .catch(e => uni.Error(e))
                })
                .catch(e => uni.Error(e))
        }

        return (
            <>
                <View
                    style={design.postActionParent}
                >
                    <TouchableOpacity
                        onPress={() => {
                            addRemoveLike();
                        }}
                    ><AntDesign name={obj.liked === "true" ? "heart" : "hearto"} size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.push('Comment', { postId: obj.id });
                    }}><FontAwesome5 name="comment" size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
                    {1 == 2 ? <TouchableOpacity><Feather name="send" size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity> : null}
                    <TouchableOpacity onPress={() => doRepost(obj.id)}><AntDesign name="retweet" size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
                </View>
                <View
                    style={design.underLinePrnt}
                >
                    <View style={design.underline}></View>
                </View>
            </>
        );
    }

    const TextPost = React.memo(
        function TextPost(params) {
            let item = params.data;
            let index = params.in;
            return (
                <>
                    <UserHead dp={item.dp} name={item.name} user={item.username} navigation={navigation} />
                    <Pressable><TextCont caption={item.caption} /></Pressable>
                    <PostLikes like={item.fav} postId={item.id} screenNav={navigation} />
                    <PostAction liked={item.liked} in={index} id={item.id} />
                </>
            );
        });

    const MediaPost = React.memo(
        function MediaPost(params) {
            let item = params.data;
            let index = params.in;
            return (
                <>
                    <UserHead dp={item.dp} name={item.name} user={item.username} navigation={navigation} />
                    <MediaCont url={item.url} caption={item.caption} />
                    <PostLikes like={item.fav} postId={item.id} screenNav={navigation} />
                    <PostAction liked={item.liked} in={index} id={item.id} />
                </>
            );
        })

    function Item() {
        console.log(item);
        return <TextPost data={"sdf"} in={1} />
        // return index == 0 ? <Pranah.br height={10} /> : item.type === "text" ? <TextPost data={item} in={index} /> : <MediaPost data={item} in={index} />;
    }
    const ListItem = () => React.memo(Item);

    useEffect(function () {
        PranahUser()
            .then(({ lang }) => {
                setUsersLanguage(lang);
            })
            .catch(e => uni.Error(e));

        navigation.setOptions({ tabBarVisible: uni.isPC() == true ? false : true })
        fetchMore();
    }, []);

    function footerComp() {
        return FooterConst == true ? (
            <>
                <LoadingProg />
            </>) : (
            <>
                <ListFooter />
            </>
        );
    }

    return (
        <SafeAreaView style={styles.sav}>
            <ImageBackground
                style={styles.bg}
                source={uni.dev(require('../assets/background_mobile.png'), require('../assets/background_mobile.png'), require('../assets/background_wide.png'))}
            >
                <Pranah.stb />
                <Pranah.pranahHead nav={navigation} />
                <View
                    style={{ width: "100%", height: "100%", flexDirection: "row" }}
                >
                    <View
                        style={style.web}
                    >
                        <FlatList 
                            data={List}
                            renderItem={({index, item})=>MemoizedLogout}
                            // keyExtractor={item=>item.id}
                        />
                    </View>
                    <WebBasedNavigation navigation={navigation} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: "100%"
    },
    sav: { flex: 1, backgroundColor: "#FFFFFF" }
});


/* <RecyclerListView
                            dataProvider={dataProvider}
                            rowRenderer={ListItem}
                            layoutProvider={layoutProvider}
                            extendedState={{ List }}
                            renderFooter={footerComp}
                            onEndReached={fetchMore}
                            scrollViewProps={{
                                refreshControl: (
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={["red"]}
                                    />
                                )
                            }}
                        /> */