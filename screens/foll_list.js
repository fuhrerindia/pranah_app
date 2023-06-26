import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { uni } from '../css/uni';
import { Pranah } from '../pranah/cust';
import { colors } from '../pranah/colors';
import axios from 'axios';
import base64 from 'react-native-base64';
import { UserHead } from './tminc/userhead';
const Tab = createMaterialTopTabNavigator();


function ListItemtoShow({ item, index, navigation }) {
    return (
        <>
            <UserHead dp={item.dp} name={item.name} user={item.username} navigation={navigation}/>
        </>
    );
}
function progressComp(end) {
    return end == false ? <ActivityIndicator size={"large"} color={colors.primary} /> : null;
}
function FollowerS({ unme, navigation }) {
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(false);

    function callApi(url, username, start) {
        axios(
            {
                method: 'post',
                url: uni.bind(url),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: uni.string({
                    username: base64.encode(username),
                    start: start
                })
            }
        )
            .then((resp) => {
                if (resp.status == 200) {
                    let page = resp.data;
                    if (uni.logic(page) === "error") {
                        uni.Error("SERVER: ERROR");
                    } else if (uni.logic(page) === "invalid") {
                        uni.signOut(navigation);
                    } else if (uni.logic(page) === "null") {
                        setEnd(true);
                    } else {
                        setStart(start + 20);
                        setData([...resp.data]);
                    }
                    // alert(page);
                } else {
                    uni.Error("RESP: !== 200");
                }
            })
            .catch((e) => { alert(e) });
    }


    useEffect(() => {
        callApi("foll", unme, start);
    }, []);
    return (
        <View>
            <Pranah.br height={10} />
            <FlatList
                data={data}
                renderItem={({item, index})=><ListItemtoShow navigation={navigation} index={index} item={item} />}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => progressComp(end)}
                extraData={end}
                onEndReached={() => callApi("foll", unme, start)}
            />
        </View>
    );
}



function FollowingS({ unme, navigation }) {
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(false);

    function callApi(url, username, start) {
        axios(
            {
                method: 'post',
                url: uni.bind(url),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: uni.string({
                    username: base64.encode(username),
                    start: start
                })
            }
        )
            .then((resp) => {
                if (resp.status == 200) {
                    let page = resp.data;
                    if (uni.logic(page) === "error") {
                        uni.Error("error");
                    } else if (uni.logic(page) === "invalid") {
                        uni.signOut(navigation);
                    } else if (uni.logic(page) === "null") {
                        setEnd(true);
                    } else {
                        setStart(start + 20);
                        setData([...resp.data]);
                    }

                    // alert(`DATA: ${resp.data}`)
                } else {
                    uni.Error("UNKOWN ERR");
                    // alert(resp.data);
                }
            })
            .catch((e) => { alert(e) });
    }
    useEffect(() => {
        callApi("folli", unme, start);
    }, []);

    return (
        <View>
            <Pranah.br height={10} />
            <FlatList
                data={data}
                renderItem={({item, index})=><ListItemtoShow navigation={navigation} index={index} item={item} />}
                onEndReachedThreshold={0.2}
                ListFooterComponent={() => progressComp(end)}
                extraData={end}
                onEndReached={() => callApi("folli", unme, start)}
            />
        </View>
    );
}






const FollList = ({ navigation, route }) => {
    let fol = route.params.fol;
    let unme = route.params.username;

    function followerScreen() {
        return <FollowerS unme={unme} navigation={navigation} />
    }
    function followingScreen() {
        return <FollowingS unme={unme} navigation={navigation} />
    }
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#000',
                inactiveTintColor: '#000',
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#000',
                labelStyle: { fontSize: 14 },
                showIcon: true,
                indicatorStyle: { backgroundColor: colors.primary }
            }}
            activeColor={colors.realBlack}
            inactiveColor={colors.realBlack}
            initialRouteName={fol == false ? "Following" : "Follower"}
        >
            <Tab.Screen
                name={"Follower"}
                component={followerScreen}
                options={{ title: uni.lang("फोल्लोवेर", "Follower") }}
            />
            <Tab.Screen
                name={"Following"}
                component={followingScreen}
                options={{ title: uni.lang("फोल्लोविंग", "Following") }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export { FollList };
