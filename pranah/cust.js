import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, Image, Platform, StyleSheet, ImageBackground } from 'react-native';
import { colors } from './colors.js';
import { uni } from '../css/uni.js';
import { signin } from '../css/signin.js';
import orangeyellow from '../assets/pranahhead.png';
import { Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const Pranah = {
  tb: (obj) => {
    return (
      <View style={{
        backgroundColor: "#ededed",
        width: "80%",
        marginTop: 20,
        padding: Platform.OS === "android" ? uni.dev(10, 10, 15) : Platform.OS === "ios" ? uni.dev(10, 10, 15) : uni.dev(15, 15, 15),
        paddingLeft: 20,
        borderRadius: 20
      }}>
        <TextInput placeholder={obj.hint}
          placeholderTextColor="#000000"
          style={{ padding: 0, lineHeight: obj.multiline == true ? 26 : undefined }}
          onChangeText={obj.onChangeText}
          value={obj.value == undefined ? "" : obj.value}
          secureTextEntry={obj.password == undefined ? false : obj.password}
          returnKeyType={obj.returnKeyType === "search" ? "search" : "default"}
          onSubmitEditing={obj.onKeyPress == undefined ? undefined : obj.onKeyPress}
          multiline={obj.multiline == true ? true : false}
        />
      </View>
    );
  },
  logo: () => {
    return (
      <Image source={require('../assets/logo.png')} style={signin.logo} />
    )
  },
  br: (obj) => {
    return (
      <View style={{ height: obj.height }}></View>
    );
  },
  txtBtn: (obj) => {
    return (
      <TouchableOpacity onPress={obj.onPress}>
        <Text style={{
          color: colors.primary,
          fontWeight: "bold",
          fontSize: uni.dev(15, 18, 18)
        }}
          onPress={obj.onPress}
        >
          {obj.title}
        </Text>
      </TouchableOpacity>
    );
  },
  stb: () => {
    return (
      <>
        <StatusBar translucent={false}
          backgroundColor={"#e35700"}
        />
      </>
    );
  },
  btn: (obj) => {
    return (
      <View style={{
        width: obj.width,
        alignSelf: "flex-end"
      }}>
        <TouchableOpacity style={{
          backgroundColor: colors.primary,
          width: 10,
          padding: 10,
          width: "auto",
          alignItems: "center",
          borderRadius: 20
        }}
          onPress={obj.onPress}
        >
          <Text style={{
            color: colors.white,
            fontSize: uni.dev(15, 18, 18)
          }}>
            {obj.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
  pranahHead: React.memo((obj) => {
    return (
      <LinearGradient
        style={[style.appheader, style.imageCurve]}
        colors={["#ffb700", "#ff8800", "#ff4400"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={() => { obj.onPress == undefined ? undefined : obj.onPress }}>
          <Image source={require('../assets/logo.png')}
            style={{
              width: 40,
              height: 40,
              marginVertical: 4,
              marginLeft: 40
            }}
          />
        </TouchableOpacity>
        <View style={{
          flexDirection: "row",
          marginTop: 13,
          marginRight: 30
        }}>
          <TouchableOpacity style={style.topicon} onPress={() => obj.nav.navigate("Products")}>
            <AntDesign name="shoppingcart" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={style.topicon} onPress={() => obj.nav.navigate("SettingItem")}>
            <Feather name="settings" size={24} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={style.topicon} onPress={() => obj.nav.navigate("Activity")}>
            <Feather name="bell" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }),
  profile: (obj) => {
    let containerWidth = (30 / 100) * uni.width;
    let wideCalculatedWidth = (containerWidth - 10) / 3;
    return (
      <TouchableOpacity
        onPress={
          () => { alert(obj.id) }
        }
      >
        <View>
          <Image
            source={obj.image}
            style={{
              width: uni.dev((uni.width - 10) / 3, (uni.width - 10) / 3, wideCalculatedWidth),
              height: uni.dev((uni.width - 10) / 3, (uni.width - 10) / 3, wideCalculatedWidth),
              borderRadius: 5,
              borderRadius: 3,
              margin: 1
            }}
          />
        </View>
      </TouchableOpacity>
    )
  },
  ErrorAlertHeading: uni.lang("महत्वपूर्ण", "Important")

};

export { Pranah };
const style = StyleSheet.create({
  topicon: {
    marginHorizontal: 10
  },
  appheader: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageCurve: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});