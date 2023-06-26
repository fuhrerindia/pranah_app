import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { UserHead } from './tminc/userhead';
import { Pranah } from '../pranah/cust';
import {
    DataProvider,
    LayoutProvider,
    RecyclerListView,
} from 'recyclerlistview';
import { uni } from '../css/uni';
import axios from 'axios';
import { colors } from '../pranah/colors';


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


const headComp = (
    <></>
);
const LikeList = ({ navigation, route }) => {
    const [List, setList] = useState([{ title: headComp }]);
    const [start, setstart] = useState(0);
    const [end, setend] = useState(false);
    function footerComp() {
        return end == false ? <ActivityIndicator color={colors.primary} size="large" /> : List.length == 1 ? (
            <Text style={{textAlign:"center"}}>
                {uni.lang("अब तक किसी ने इसे पसंद नहीं किया", "No Like till now.")}
            </Text>
        ) : null;
    }

    let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    }).cloneWithRows(List);

    let post = route.params.postId;

    useEffect(() => {
        fetchMore();
    }, []);

    function callApi(){
        axios({
            method: 'post',
            url: uni.bind('likelist'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: uni.string({
                post: post,
                start: start
            })
        })
            .then((resp) => {
                if (resp.status == 200) {
                    let page = resp.data;
                    if (uni.logic(page) === "error") {
                        uni.Error("RESP: ERROR");
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
                    uni.Error("RESP: !== 2XX");
                    // alert('e');
                }
            })
            .catch((e) => {
                uni.Error(e);
                // alert(e);
            });
    }
    function fetchMore() {
        // if (renderring == false){
        //     setRenderring(true);
        //     callApi();
        // }
        callApi();
        
    }

    function ListItem(type, data, index) {
        return index == 0 ? data.title : (<><Pranah.br height={10}/><UserHead dp={data.dp} name={data.name} user={data.username} navigation={navigation} /></>);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                width: "100%",
                height: "100%"
            }}>
                <RecyclerListView
                    dataProvider={dataProvider}
                    rowRenderer={ListItem}
                    layoutProvider={layoutProvider}
                    extendedState={{ List }}
                    renderFooter={footerComp}
                    onEndReached={fetchMore}
                    // onEndReachedThreshold={0.1}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({})

export { LikeList };
