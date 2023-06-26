import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Modal } from 'react-native';
import { Pranah } from '../pranah/cust';
import axios from 'axios';
import { uni } from '../css/uni';
import PranahUser from './tminc/cred';
import { useScrollToTop } from '@react-navigation/native';
import base64 from 'react-native-base64';
import {Line, ListFooterComp, ListItem, PostOptions} from './component/post';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
function Feed({ navigation }) {
    const [list, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [foot, setFoot] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const postlist = useRef(null);

    const onRefresh = React.useCallback(() => {
        setData([]);
        setStart(0);
        setFoot(false);
        fetchMore();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useScrollToTop(postlist);
    // FETCH DATA FROM SERVER
    function fetchMore() {
        PranahUser()
            .then(({ mail, pass, username }) => {
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
                    .then(({ status, data }) => {
                        if (status == 200) {
                            let logic = uni.logic(data);
                            if (logic === "error") {
                                uni.Error("SERVER ERROR");
                            } else if (logic === "followernull" || logic === "nomore") {
                                setFoot(true);
                            } else if (logic === "invalid") {
                                uni.signOut(navigation);
                            } else {
                                setStart(start + 20);
                                setData(
                                    [
                                        ...list,
                                        ...data
                                    ]
                                );
                            }
                        } else {
                            uni.Error("SERVER NOT FOUND");
                        }
                    })
                    .catch(e => uni.Error(e))
            })
            .catch(e => uni.Error(e));
    }
    useEffect(() => {
        fetchMore();
    }, []);

    return (
        <>
            <Pranah.stb />
            <View style={css.screen}>
                <Pranah.pranahHead
                    nav={navigation}
                />
                {/* <PostOptions /> */}
                <FlatList
                    data={list}
                    ItemSeparatorComponent={() => <Line />}
                    ref={postlist}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#c21d00", "#8c1a00", "#ff7700"]}
                        />
                    }
                    ListFooterComponent={() => (<ListFooterComp foot={foot} />)}
                    onEndReached={fetchMore}
                    ListFooterComponentStyle={[css.padding, css.center]}
                    renderItem={({ item, index }) => <ListItem item={item} index={index} navigation={navigation} list={list} setData={setData} />}
                />
            </View>
        </>
    )
}
export { Feed };

const css = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    },
    padding: {
        paddingBottom: 200,
        paddingTop: 50
    },
    center: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    }
});