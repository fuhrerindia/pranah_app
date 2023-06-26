import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { uni } from '../css/uni';
import { UserHead } from './tminc/userhead';
import { Pranah } from '../pranah/cust';
import PranahUser from './tminc/cred';
import axios from 'axios';
import base64 from 'react-native-base64';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { colors } from '../pranah/colors';
import { style } from './postparts/somestyles';
import { WebBasedNavigation } from './tminc/widenav';

const HeaderComp = ({ navigation }) => {
    return (
        <>
            <View style={{
                width: "100%",
                alignItems: "center"
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Requests");
                }}
                    style={{
                        width: "90%",
                        marginTop: 20,
                        paddingVertical: 20,
                        paddingLeft: 25,
                        flexDirection: "row",
                        backgroundColor: colors.silver,
                        borderRadius: 20

                    }}
                >
                    <SimpleLineIcons name="user-follow" size={24} color="black" />
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 10
                    }}>{uni.lang("फॉलो के अनुरोध", "Follow Requests")}</Text>
                    <FontAwesome name="caret-right" size={24} color="black"
                        style={{
                            alignSelf: "flex-end",
                            marginLeft: "auto",
                            marginRight: 30

                        }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: 30,
                fontWeight: "bold",
                margin: 20,
                marginLeft: 50,
                color: colors.lightBlack
            }}>{uni.lang("गतिविधि", "Activity")}</Text>
        </>
    );
}
function activityAction(onpress, navigation, username) {
    let onpressAction = onpress.split(", ");
    if (onpressAction[0] === "post") {
        navigation.navigate("MediaPostS", { postId: onpressAction[1], username: username })
    }else if(onpressAction[0] === "comm"){
        navigation.navigate("Comment", { postId: onpressAction[1] })
    }else if(onpressAction[0] === "user"){
        navigation.navigate("OtherProfile", { username: onpressAction[1] });
    }
}
function ListItems({ nitem, index, navigation }) {
    let item = nitem.item;
    return (
        <>
            <TouchableOpacity onPress={() => activityAction(item.onpress, navigation, item.username)}><Text>CHECK</Text></TouchableOpacity>
            <View style={{
                width: "88%",
                marginHorizontal: 20,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: colors.silver,
                padding: 10,
                borderRadius: 20
            }}>
                <UserHead dp={item.dp} name={item.name} user={item.username} navigation={navigation} />
                <Text style={{
                    marginLeft: 20,
                    marginTop: 8
                }}>{uni.lang(item.snap)}</Text>
            </View>
        {/*</TouchableOpacity>*/}
    </>
    );
}
const Activity = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        navigation.setOptions({ tabBarVisible: uni.isPC() == true ? false : true })
        PranahUser()
            .then(({ mail, pass, username }) => {
                axios({
                    method: 'post',
                    url: uni.bind('activity'),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: uni.string({
                        mail: mail,
                        pass: base64.encode(pass)
                    })
                })
                    .then(({ status, data }) => {
                        if (status == 200) {
                            if (data === "error") {
                                uni.Error("SERVER RESPONDED ERROR");
                            } else if (data === "invalid") {
                                uni.signOut(navigation);
                            } else {
                                setLoaded(true);
                                setData(data);
                            }
                        } else {
                            uni.Error("SERVER CRASHED");
                        }
                    })
                    .catch(e => uni.Error(e))
            })
            .catch((e) => {
                uni.Error(e);
            })
    }, [])

    return loaded == true ? (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../assets/background_mobile.png')}
            blurRadius={2}
        >
            <View>
                {/* <Pranah.pranahHead /> */}
                <View
                    style={{ width: "100%", height: "100%", flexDirection: "row" }}
                >
                    <View
                        style={style.web}
                    >
                        <FlatList
                            data={data}
                            renderItem={(item, index) => <ListItems nitem={item} index={index} navigation={navigation} />}
                            ListHeaderComponent={() => <HeaderComp navigation={navigation} />}
                            ListFooterComponent={() => <Pranah.br height={200} />}
                            ListEmptyComponent={() => (<><Text style={{ textAlign: "center" }}>{uni.lang("दिखाने के लिए कुछ नहीं", "Nothing to show.")}</Text></>)}
                        />
                    </View>
                    <WebBasedNavigation navigation={navigation} />
                </View>
            </View>
        </ImageBackground>

    ) : (
        <>
            <View style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%"
            }}>
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({})

export { Activity };
