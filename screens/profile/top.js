import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { styles } from './design';
import { Pranah } from '../../pranah/cust';
import { uni } from '../../css/uni';
import axios from 'axios';
import PranahUser from '../tminc/cred';
import natureBg from '../../assets/visuals/nature.jpg';
import { style } from '../postparts/somestyles';
import base64 from 'react-native-base64';


function ProfileTop({ name, username, dp, bio, navigation, post, follower, following, isFoll, srcUnme, lang }) {
  const [buttonSnap, setButtonSnap] = useState(isFoll === "true" ? 1 : isFoll === "false" ? 2 : 3);
  let buttonLay = buttonSnap == 2 ? styles.fillInside : styles.fillBorder;
  function doFollowNow() {
    PranahUser()
      .then(({ mail, pass }) => {
        axios({
          method: 'post',
          url: uni.bind('follow'),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: uni.string({
            mail: mail,
            pass: base64.encode(pass),
            username: username
          })
        })
          .then(({ status, data }) => {
            if (status == 200) {
              if (uni.logic(data) === "error" || uni.logic(data) === "unexisted") {
                uni.Error();
              } else if (uni.logic(data) === "invalid") {
                uni.signOut(navigation);
              } else {
                if (uni.logic(data) === "true") {
                  setButtonSnap(1);
                } else if (uni.logic(data) === "unfollowed") {
                  setButtonSnap(2);
                } else if (uni.logic(data) === "requested") {
                  setButtonSnap(3);
                }
              }
            } else {
              uni.Error("SERVER CRASHED");
            }
          })
          .catch((e) => {
            uni.Error(e);
          })
      })
      .catch((e) => {
        uni.Error(e);
      });
  }

  return (
    <>
      <View style={styles.parent}>
        <Pranah.br height={20} />
        <View style={styles.center}>
          <ImageBackground style={[{
            width: "90%",
          }, styles.center]}
            blurRadius={10}
            imageStyle={{
              borderRadius: 20,
              backgroundColor: "#ededed"
            }}
            source={natureBg}
          >
            <View style={{
              width: "100%",
              borderRadius: 20,
              backgroundColor: "#ffffff94",
              paddingVertical: 20
            }}>
              <View style={newCss.nParent}>
                <Image style={styles.dp} source={dp === "" ? require('../../assets/lord_vishnu.jpg') : { uri: dp }} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.username}>@{username}</Text>
                <Text style={styles.bio}>
                  {bio}
                </Text>
                {srcUnme !== username ? (<View><TouchableOpacity onPress={doFollowNow} style={[styles.follBox, buttonLay]}><Text style={buttonSnap == 2 ? styles.white : styles.textRed}>
                  {buttonSnap == 1 ? lang.following : buttonSnap == 2 ? lang.follow : lang.requested}
                </Text></TouchableOpacity></View>) : null}
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.fullWide, styles.center, styles.detCount]}>
          <TouchableOpacity onPress={() => { navigation.navigate("FollList", { username: username, fol: true }) }}>
            <View style={[styles.center, styles.numCountKid]}>
              <Text style={styles.numCount}>{follower == null || follower == undefined || follower === "" ? "0" : follower}</Text>
              <Text>{lang.follower}</Text>
            </View>
          </TouchableOpacity>
          <View style={{
            height: "50%",
            width: 1,
            backgroundColor: "#ededed"
          }}></View>
          <TouchableOpacity onPress={() => { navigation.navigate("FollList", { username: username, fol: false }) }}>
            <View style={[styles.center, styles.numCountKid]}>
              <Text style={styles.numCount}>{following == null || following == undefined || following === "" ? "0" : following}</Text>
              <Text>{lang.following}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default ProfileTop;

const newCss = StyleSheet.create({
  nParent: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});