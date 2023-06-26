import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { uni } from '../css/uni.js';
import { AntDesign, FontAwesome5, Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import { likeOrDislike } from '../pranah/likeordislike.js';


function BottomPost(obj) {
    const iconDesign = StyleSheet.create({
        icon: {
            margin: 10
        }
    });
    const iconDynamicSizing = 25;
    return (
        <>
            <View style={{
                flexDirection: "row",
                paddingLeft: 10,
                marginTop: 15
            }}>
                <TouchableOpacity onPress={() => { obj.update.like(); likeOrDislike(obj.Post, obj.nav) }}><AntDesign name={obj.liked === true ? "heart" : "hearto"} size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
                <TouchableOpacity><FontAwesome5 name="comment" size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
                <TouchableOpacity><Feather name="send" size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
                <TouchableOpacity><AntDesign name="retweet" size={iconDynamicSizing} color="black" style={iconDesign.icon} /></TouchableOpacity>
            </View>
            <Text style={{ marginLeft: 20 }}>{obj.fav} Likes</Text>

        </>
    );
}
export { BottomPost };