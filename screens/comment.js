import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, TextInput, Alert } from 'react-native';
import { UserHead } from './tminc/userhead';
import { Pranah } from '../pranah/cust';
import {
    DataProvider,
    LayoutProvider,
    RecyclerListView,
} from 'recyclerlistview';
import { uni } from '../css/uni';
import axios from 'axios';
import { Ionicons, Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import { colors } from '../pranah/colors';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';


let layoutProvider = new LayoutProvider(
    index => {
        return index == 0 ? "HEAD" : "NORMAL";
    },
    (type, dim) => {
        switch (type) {
            case "NORMAL":
                dim.height = 60;
                dim.width = uni.width;
                break;
            case "HEAD":
                dim.height = 40;
                dim.width = 0;
                break;

        }
    }
);


const Comment = ({ navigation, route }) => {
    const [List, setList] = useState([]);
    const [start, setstart] = useState(0);
    const [end, setend] = useState(false);
    const [comment, setcomment] = useState("");
    const [userMailCurrent, setuserMailCurrent] = useState("");
    const [userPassCurrent, setuserPassCurrent] = useState("");

    let post = route.params.postId;

    function saveComment() {
        if (comment !== "") {
            AsyncStorage.getItem("mail")
                .then(
                    (val) => {
                        let email = val;
                        AsyncStorage.getItem("pass")
                            .then((v) => {
                                let passw = v;

                                axios({
                                    method: 'post',
                                    url: uni.bind('comment'),
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    data: uni.string({
                                        post: post,
                                        comment: base64.encode(comment),
                                        mail: email,
                                        pass: base64.encode(passw)
                                    })
                                })
                                    .then((resp) => {
                                        if (resp.status == 200) {
                                            if (uni.logic(resp.data) === "true") {
                                                navigation.goBack();
                                            } else if (uni.logic(resp.data) === "already") {
                                                uni.alert(uni.lang("रुकिए!", "Oops!"), uni.lang("आपने पहले ही इस जगह टिप्पणी कर दी है।", "You've already commented to this post."));
                                            } else {
                                                uni.Error("SERVER RETURNED UNKNOWN RESPONSE");
                                            }
                                        } else {
                                            uni.Error("SERVER DOWN");
                                        }
                                    })
                                    .catch((e) => {
                                        uni.Error(e);
                                        // alert(e);
                                    });
                            })
                            .catch((e) => {
                                uni.Error(e);
                                // alert(e);
                            });
                    }
                )
                .catch((e) => {
                    uni.Error(e);
                })
        }
    }


    function footerComp() {
        if (end == false) {
            return (
                <>
                    <Pranah.br height={25} />
                    <ActivityIndicator color="red" size="large" />
                </>
            );
        } else {
            if (List.length == 0) {
                return (
                    <>
                        <Text
                            style={{
                                textAlign: "center"
                            }}
                        >{uni.lang("दिखाने के लिए कोई टिप्पणी नहीं है। ", "No Comments to show.")}</Text>
                    </>
                );
            } else {
                return (<></>);
            }
        }
    }

    useEffect(() => {
        fetchMore();
    }, []);

    function callApi() {
        AsyncStorage.getItem("mail")
            .then(
                (val) => {
                    let email = val;
                    setuserMailCurrent(val);
                    AsyncStorage.getItem("pass")
                        .then((v) => {
                            let passw = v;
                            setuserPassCurrent(passw);
                            axios({
                                method: 'post',
                                url: uni.bind('fetch_comment'),
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                data: uni.string({
                                    post: post,
                                    start: start,
                                    mail: base64.encode(email),
                                    pass: base64.encode(passw)
                                })
                            })
                                .then((resp) => {
                                    if (resp.status == 200) {
                                        let page = resp.data;
                                        // alert(page);
                                        if (uni.logic(page) === "error" || uni.logic(page) === "invalid") {
                                            uni.Error("ERROR OR INVALID RETURNED");
                                            // alert(page);
                                        } else if (uni.logic(page) === "null") {
                                            //NO LIKES
                                            setend(true);
                                        } else {
                                            setstart(start + 20);
                                            setList([
                                                ...List,
                                                ...page
                                            ]);
                                        }
                                    } else {
                                        uni.Error("RESPONSE: 500");
                                        // alert('e');
                                    }
                                })
                                .catch((e) => {
                                    uni.Error(e);
                                    // alert(e);
                                });
                        })
                        .catch((e) => {
                            uni.Error(e);
                            // alert(e);
                        });
                }
            )
            .catch((e) => {
                uni.Error(e);
            })
    }

    function fetchMore() {
        callApi();
    }

    function deleteComment(post) {
        axios({
            method: 'post',
            url: uni.bind('delete_comment'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: uni.string({
                post: post,
                mail: userMailCurrent,
                pass: base64.encode(userPassCurrent)
            })
        })
            .then((r) => {
                if (r.status == 200) {
                    if (uni.logic(r.data) === "true") {
                        navigation.goBack();
                    } else {
                        uni.Error("OUT OF EXPECTED RESPONSE");
                        // alert(r.data);
                    }
                } else {
                    uni.Error("ERROR 5XX");
                }
            })
            .catch((e) => {
                uni.Error(e);
            });
    }
    function EachComment(index, item) {
        return (<>
            <View style={{
                backgroundColor: "#ffffff",
                width: 90 / 100 * uni.width,
                borderRadius: 10,
                padding: 10,
                marginLeft: 5 / 100 * uni.width,
                marginTop: 10
            }}>
                <TouchableOpacity onPress={()=>navigation.navigate("OtherProfile", {username: item.username})}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={{ uri: item.dp }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20
                            }}
                        />
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginTop: 7,
                            marginLeft: 5
                        }}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ margin: 8, marginBottom: 0 }}>{item.comment}</Text>
                <View style={{ flexDirection: "row", margin: 10 }}>
                    <TouchableOpacity><MaterialIcons name="report" size={18} color="black" style={{ marginRight: 20 }} /></TouchableOpacity>
                    {base64.decode(item.mail) === userMailCurrent.toLowerCase().replace(" ", "") ? (<TouchableOpacity onPress={() => {
                        deleteComment(item.id);
                    }}><MaterialIcons name="delete-outline" size={18} color="black" style={{ marginRight: 15 }} /></TouchableOpacity>) : null}
                </View>
            </View>
        </>);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                width: "100%",
                height: "100%"
            }}>
                <View
                    style={{
                        width: "100%",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <View
                        style={{
                            width: "90%",
                            padding: 10,
                            backgroundColor: "#ddd",
                            borderRadius: 20,
                            marginTop: 15,
                            marginBottom: 10,
                            flexDirection: "row"
                        }}
                    >
                        <TextInput
                            placeholder={uni.lang("यहाँ टिपण्णी करें", "Enter Comment here.")}
                            placeholderTextColor={colors.realBlack}
                            value={comment}
                            returnKeyType='send'
                            autoCorrect={false}
                            onSubmitEditing={() => { saveComment() }}
                            autoFocus={true}
                            onChangeText={(v) => { setcomment(v) }}
                            style={{
                                width: "90%"
                            }}
                        />
                        <TouchableOpacity onPress={() => { saveComment() }}><Ionicons name="send-outline" size={24} color="black" /></TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={List}
                    renderItem={({ index, item }) => (EachComment(index, item))}
                    onEndReached={fetchMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={footerComp}
                />
            </View>
        </SafeAreaView>
    );
}

export { Comment };
