import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { uni } from '../css/uni';
import PranahUser from './tminc/cred';
import base64 from 'react-native-base64';
import { design } from './tminc/design';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../pranah/colors';
import {Pranah} from '../pranah/cust';

function line() {
    return (
        <View style={styles.line}></View>
    );
}
function emptyNotice(){
    return(<>
        <View style={{
            alignContent: "center",
            alignItems: "center",
            margin: 20
        }}>
            <Text style={{
                fontSize: 18
            }}>{uni.lang("कोई अनुरोध नहीं।", "Nothing to show you.")}</Text>
        </View>
    </>);
}
function headerView(){
    return(<>
        <Pranah.br height={20} />
    </>);
}

const Requests = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [start, setStart] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [ended, setEnded] = useState(false);

    function footerAnimation(){
        return list.length == 0 || ended == true ?  null : (<>
            <ActivityIndicator 
                size="large"
                color={colors.primary}
            />
        </>);
    }

    function listItem({ item, index }) {
        let params = item;
        return (
            <>
                <Pressable
                    onPress={() => { navigation.navigate("OtherProfile", { username: params.user }) }}
                // onPress={()=>alert(params.user)}
                >
                    <View style={design.headprnt}>
                        <Image
                            source={{ uri: params.dp }}
                            defaultSource={{ uri: params.dp }}
                            style={design.dp}
                        />
                        {/* SEPARATER */}
                        <View
                            style={design.snapPrnt}
                        >
                            <Text
                                style={design.name}
                            >
                                {params.name}
                            </Text>
                            <Text
                                style={design.username}
                            >
                                {params.username}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginLeft: 65
                    }}>
                        <TouchableOpacity onPress={()=>{
                            acceptReq(item.id, 'approve');
                        }}><MaterialIcons name="done" size={28} color="green" style={{ marginRight: 15 }} /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            acceptReq(item.id, 'disapprove');
                        }}><MaterialIcons name="clear" size={28} color="red" style={{ marginRight: 15 }} /></TouchableOpacity>
                    </View>
                </Pressable>
            </>
        );
    }

    useEffect(() => {
        //some code... 
        fetchMore();
    }, []);

    function acceptReq(folId, tpe) {
        PranahUser()
            .then(({ mail, pass }) => {
                axios({
                    method: 'post',
                    url: uni.bind(tpe),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: uni.string({
                        mail: mail,
                        pass: base64.encode(pass),
                        follId: folId
                    })
                })
                    .then(({ data, status }) => {
                        if (status == 200) {
                           if (uni.logic(data) === "true"){
                            let temp_arr = list;
                            // temp_arr.splice(index);
                            const filteredData = list.filter(item => item.id !== folId);
                            setList([...filteredData]);
                            console.log(data)
                           }else{
                               uni.Error(data);
                               console.log(data);
                           }
                        } else {
                            uni.Error("SERVER DOWN");
                        }
                    })
                    .catch(e => uni.Error(e));
            })
            .catch(e => uni.Error(e));
    }

    function fetchMore() {
        PranahUser()
            .then(({ mail, pass }) => {
                axios({
                    method: 'post',
                    url: uni.bind('requests'),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: uni.string({
                        mail: mail,
                        pass: base64.encode(pass),
                        start: start
                    })
                })
                    .then(({ data, status }) => {
                        if (status == 200) {
                            if (uni.logic(data) === "error") {
                                uni.Error("API ERROR");
                            } else {
                                setStart(start + 20);
                                setList([
                                    ...list,
                                    ...data
                                ]);
                                if (loaded == false){
                                    setLoaded(true);
                                }
                                if (data.length == 0){
                                    setEnded(true);
                                }
                            }
                        } else {
                            uni.Error("SERVER DOWN");
                        }
                    })
                    .catch(e => uni.Error(e));
            })
            .catch(e => uni.Error(e));
    }
    return loaded == false ? (
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
    ) : (
        <View>
            <FlatList
                data={list}
                renderItem={listItem}
                ItemSeparatorComponent={line}
                ListEmptyComponent={emptyNotice}
                ListHeaderComponent={headerView}
                ListFooterComponent={footerAnimation}
                onEndReached={fetchMore}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        width: "100%",
        height: 1,
        backgroundColor: colors.silver,
        marginVertical: 20
    }
})

export default Requests;
