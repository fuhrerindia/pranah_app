import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Linking, Alert, TextInput } from 'react-native';
import { colors } from '../pranah/colors';
import { LoadingProg } from './postparts/mediacont';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { uni } from '../css/uni';
import { NavigationRouteContext } from '@react-navigation/native';
import { Pranah } from '../pranah/cust';


function NewsPage({ navigation }) {
    const [newsData, setNewsData] = useState([]);
    const [newsStart, setStart] = useState(0);
    const [searchVal, setSearchVal] = useState(null);

    function HeaderforScreen({ navigation }) {
        const goBack = () => navigation.goBack();
        return (
            <>
    <Pranah.pranahHead />
                <View style={style.header}>
                    <Center>
                    <TextInput 
                        placeholder="Try Searching Something..."
                        placeholderTextColor="#000"
                        style={style.tb}
                        value={searchVal}
                        onChangeText={(v)=>setSearchVal(v)}
                    />
                    </Center>
                </View>
            </>
        );
    }
    function loadNews() {
        axios({
            method: 'get',
            url: uni.bind('news'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: uni.string({
                start: newsStart
            })
        }).then(({ data, status }) => {
            if (data.status === "success"){
                setNewsData([
                    ...newsData,
                    ...data.data
                ]);
                setStart(0+10);
            }else{
                console.log("ERROR");
            }
        })
            .catch(e => console.log(e))
    }
    useEffect(loadNews, []);
    return (
        <>
            <View style={style.flex}>
                <FlatList
                    data={newsData}
                    renderItem={(item)=>NewsCard(item, navigation)}
                    ListEmptyComponent={<LoadingProg />}
                    ListHeaderComponent={<HeaderforScreen navigation={navigation} />}
                />
            </View>
        </>
    );
}
export default NewsPage;
const Line = () => {
    return (
        <Center child={<View style={style.line}></View>} />
    );
}
function NewsCard(data, navigation) {
    let item = data.item;
    return (
        <>
        <Center>
            <TouchableOpacity
                onPress={()=>navigation.push('ShowNews', {data: item})}
            >
                <View style={style.ncard}>
                    <Image
                        source={{ uri: item.image }}
                        style={style.nIcon}
                    />
                    <View>
                        <Text numberOfLines={2} style={style.nText}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </Center>
        </>
    );
} function Center({ child, children }) {
    let kid = child !== undefined ? child : children;
    return (
        <View style={style.center}>
            {kid}
        </View>
    );
}

const style = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        width: "100%",
        paddingVertical: 10,
        flexDirection: "row"
    },
    heading: {
        fontSize: 20
    },
    iconBack: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 1
    },
    line: {
        width: "80%",
        height: 1,
        backgroundColor: colors.grey
    },
    center: {
        width: "100%",
        alignContent: "center",
        alignItems: "center"
    },
    ncard: {
        width: "90%",
        padding: 15,
        flexDirection: "row",
        backgroundColor: "#ededed",
        marginVertical: 10,
        borderRadius: 20
    },
    nIcon: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
    nText: {
        paddingHorizontal: 10,
        width: uni.width - 15 - 100 - 20,
        fontWeight: "bold",
        marginTop: 20
    },
    author: {
        margin: 10,
        color: colors.lightBlack
    },
    tb: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: "#ededed",
        width: "90%",
        marginTop: 10,
        borderRadius: 20
    }
});