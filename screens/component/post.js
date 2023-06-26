import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, ActivityIndicator, StyleSheet, Platform, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import heart from '../../assets/like.json';
import AnimatedLottieView from 'lottie-react-native';
import PranahUser from '../tminc/cred';
import tick from '../../assets/tick.json';
import { uni } from '../../css/uni';
import axios from 'axios';
import base64 from 'react-native-base64';
import { FontAwesome5, AntDesign, MaterialIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons';


function UserDetail({ navigation, username, dp, name }) {
    return (
        <>
            <Pressable onPress={() => navigation.navigate("OtherProfile", { username: username })}>
                <View style={css.userdetail}>
                    <Image
                        source={{ uri: dp }}
                        style={css.dp}
                    />
                    <Text style={css.userName}>{name}</Text>
                </View>
            </Pressable>
        </>
    );
}

function PostOptions({
    visible
}) {
    const [modal, setModal] = useState(true);
    const optionList = [
        {
            title: "Share",
            color: "#000",
            icon: <Entypo name="share" size={23} color="black" />,
            onPress: () => alert('HUHUHU')
        },
        {
            title: "Unfollow",
            color: "#000",
            icon: <SimpleLineIcons name="user-unfollow" size={21} color="black" />,
            onPress: () => alert('huehue')
        },
        {
            title: "Report",
            color: "black",
            icon: <MaterialIcons name="report" size={24} color="black" />,
            onPress: () => alert('J')
        },
        {
            title: "Delete Post",
            color: "red",
            icon: <MaterialIcons name="delete-outline" size={24} color="red" />,
            onPress: () => alert('Hi')
        }
    ];
    return (
            <Modal
                visible={modal}
                transparent={true}
                onRequestClose={()=>setModal(false)}
            >
                <View style={css.optionList}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            paddingVertical: 20,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            bottom: 0
                        }}>
                            <View
                                style={{
                                    width: "100%",
                                    alignContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <View
                                    style={{
                                        width: 100,
                                        height: 3,
                                        backgroundColor: "#969696",
                                        borderRadius: 10
                                    }}
                                ></View>
                            </View>
                            {
                                optionList.map((item) => {
                                    const { title, color, icon, onPress } = item;
                                    return (
                                        <>
                                            <View style={[css.flex, css.eachOption]}>
                                                {icon}
                                                <Text style={[css.optionTitle, { color: color}, color === "red" ? {fontWeight: "bold"} : null]}>{title}</Text>
                                            </View>
                                        </>
                                    );
                                })
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
    );
}
function Line() {
    return (
        <>
            <View style={[css.center, css.fullWidth]}>
                <View style={css.line}></View>
            </View>
        </>
    );
}
function PostActions({
    liked, id, fav, list, setData, index, navigation
}) {
    const likebtn = useRef(null);
    useEffect(() => {
        if (Platform.OS !== "web") {
            if (liked === "true") {
                likebtn.current.play(19, 19)
            } else {
                likebtn.current.play(0, 0)
            }
        }
    }, [list]);
    function updateintoState() {
        if (setData !== undefined) {
            let tempList = list;
            tempList[index].liked = liked === "true" ? "false" : "true";
            tempList[index].fav = liked === "true" ? String(parseInt(fav) - 1) : String(parseInt(fav) + 1);
            setData([
                ...tempList
            ]);
        }
        addRemoveLike(id);
    }
    function updateLike() {
        if (Platform.OS !== "web") {
            if (liked === "true") {
                likebtn.current.play(19, 0);
            } else {
                likebtn.current.play(0, 19);
            }
            setTimeout(() => {
                updateintoState();
            }, 800);
        } else {
            updateintoState();
        }
    }
    const likecount = parseInt(fav);
    let likesnap = "";
    if (likecount == 0) {
        likesnap = "Be first to like this";
    } else {
        if (liked === "true") {
            if (likecount == 1) {
                likesnap = "Liked by you";
            } else {
                likesnap = `Liked by you and ${String(likecount - 1)} other people`;
            }
        } else {
            if (likecount == 1) {
                likesnap = "Liked by one person"
            } else {
                likesnap = `Liked by ${String(likecount)} people`;
            }
        }
    }
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.push('LikeList', { postId: id })}
            ><Text style={css.likesnap}>{likesnap}</Text></TouchableOpacity>
            <View style={[css.flex, css.fullWidth]}>
                <TouchableOpacity onPress={updateLike}>
                    {
                        Platform.OS === "web" ? (
                            <AntDesign name={liked === "true" ? "heart" : "hearto"} size={25} color="black" style={[css.icons, css.hearWebIcon]} />
                        ) : (
                            <AnimatedLottieView
                                loop={false}
                                autoPlay={false}
                                source={heart}
                                style={css.heart}
                                ref={likebtn}
                            />
                        )
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Comment", { postId: id })}>
                    <FontAwesome5 name="comment" size={25} color="black" style={css.icons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => doRepost(id)}>
                    <AntDesign name="retweet" size={28} color="black" style={[css.icons, css.repost]} />
                </TouchableOpacity>
            </View>
        </>
    );
}

function TextPost({ navigation, item, index, list, setData }) {
    const { id, name, dp, username, url, fav, caption, type, liked } = item;
    return (
        <>
            <UserDetail navigation={navigation} dp={dp} username={username} name={name} />
            <View style={css.imageParent}>
                <View style={[css.textOutput, css.center]}>
                    <Text style={css.textPostMain}>{caption}</Text>
                </View>
            </View>
            <PostActions liked={liked} id={id} fav={fav} list={list} setData={setData} index={index} navigation={navigation} />
        </>
    );
}
function MediaPost({ navigation, item, index, list, setData }) {
    const { id, name, dp, username, url, fav, caption, type, liked } = item;
    // const [imageHeight, setImageHeight] = useState(uni.width - 5)
    // Image.getSize(url, ({width})=>{console.log()})
    return (
        <>
            <UserDetail navigation={navigation} username={username} dp={dp} name={name} />
            <View style={css.imageParent}>
                <Image
                    style={css.media}
                    source={{ uri: url }}
                />
            </View>
            <Text style={css.mediaCaption}>{caption}</Text>
            <PostActions liked={liked} id={id} fav={fav} list={list} setData={setData} index={index} navigation={navigation} />
        </>
    );
}
function ListFooterComp({ foot }) {
    if (foot == false) {
        return (
            <ActivityIndicator size="large" color="red" />
        );
    } else {
        if (Platform.OS !== "web") {
            return (
                <>
                    <AnimatedLottieView
                        source={tick}
                        autoPlay={true}
                        loop={true}
                        style={css.tickView}
                    />
                    <Text style={css.endsnap}>You've reached the end</Text>
                </>
            );
        } else {
            return null;
        }
    }
}
function ListItem({ item, index, navigation, list, setData }) {
    const { type } = item;
    if (type === "text") {
        return (<TextPost navigation={navigation} item={item} index={index} list={list} setData={setData} />);
    } else {
        return (<MediaPost navigation={navigation} item={item} index={index} list={list} setData={setData} />);
    }
}
function doRepost(postId) {
    if (Platform.OS === "web") {
        if (confirm("Do you want to repost this post?")) {
            surelyRepostIt(postId);
        }
    } else {
        Alert.alert(
            "Confirmation",
            "Are you sure to repost this post?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Repost",
                    onPress: () => surelyRepostIt(postId)
                }
            ],
            {
                cancelable: true,
            }
        );
    }
}

function surelyRepostIt(postiD) {
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


function addRemoveLike(id) {
    PranahUser()
        .then(({ mail, pass, username }) => {
            axios({
                method: 'post',
                url: uni.bind('like'),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: uni.string({
                    mail: mail,
                    pass: base64.encode(pass),
                    post: id
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
                .catch(e => uni.Error(e));
        })
        .catch(e => uni.Error(e));
}
export { UserDetail, Line, PostActions, TextPost, MediaPost, ListFooterComp, ListItem, doRepost, addRemoveLike, PostOptions };
const css = StyleSheet.create({
    line: {
        width: uni.width - 100,
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 20
    },
    userdetail: {
        width: "100%",
        flexDirection: "row",
        paddingBottom: 10
    },
    dp: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 10
    },
    userName: {
        marginTop: 22,
        marginLeft: 8
    },
    media: {
        width: uni.width - 5,
        height: uni.width - 5,
        borderRadius: 9,
        resizeMode: "cover"
    },
    imageParent: {
        width: uni.width,
        alignContent: "center",
        alignItems: "center"
    },
    mediaCaption: {
        marginHorizontal: 15,
        marginVertical: 5
    },
    textOutput: {
        width: uni.width - 5,
        height: uni.width - 5,
        borderRadius: 9,
        backgroundColor: "#ede"
    },
    center: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    flex: {
        flexDirection: "row"
    },
    fullWidth: {
        width: "100%"
    },
    heart: {
        width: 100,
        height: 100
    },
    icons: {
        marginTop: 40,
        marginLeft: 10
    },
    repost: {
        marginLeft: 40
    },
    likesnap: {
        marginHorizontal: 25,
        fontWeight: "bold",
        marginTop: 20,
        marginLeft: 30
    },
    tickView: {
        width: 250,
        height: 250
    },
    endsnap: {
        fontSize: 25
    },
    padding: {
        paddingBottom: 200,
        paddingTop: 50
    },
    hearWebIcon: {
        marginHorizontal: 30,
        marginLeft: 50
    },
    optionList: {
        width: "100%",
        height: "100%",
        backgroundColor: "#00000050",
        justifyContent: "flex-end",
    },
    optionTitle: {
        marginTop: 3,
        marginLeft: 10
    },
    eachOption: {
        marginVertical: 8,
        marginHorizontal: 12
    },
    textPostMain: {
        // textAlign: "center",
        marginVertical: 20,
        marginHorizontal: 20,
        lineHeight: 25
    }
});