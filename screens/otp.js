import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Image, TextInput, Platform, TouchableOpacity, Alert, KeyboardAvoidingView, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
// import { signin } from './css/signin.js';
import { uni } from '../css/uni.js';
import { Pranah } from '../pranah/cust.js';
import { colors } from '../pranah/colors.js';
import axios from 'axios';
import base64 from 'react-native-base64';
import md5 from 'md5';

function ValidateEmail(mail) {
  var re = /\S+@\S+\.\S+/;
  return re.test(mail);
}

function Otp({ navigation }) {
  // STATES
  const [TargetMail, setTargetMail] = useState("");
  const [prog, setProg] = useState(false);

  let otptoken = md5(Math.floor(Math.random() * 10000));
  //SEND MAIL
  function sendResetMail() {
    if (ValidateEmail(TargetMail)) {
      setProg(true);
      //SEND MAIL

      axios(
        {
          method: 'post',
          url: uni.bind('reset_req'),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: uni.string({
              dest: base64.encode(TargetMail),
              auth: otptoken
          })
      }
      )
      .then(({data, status})=>{
        if (uni.logic(data) === "true"){
        // emailjs.send(
          //   "service_38e1rzl",
          //   "template_ee2wncq",
          //   {
          //     url: `https://pranah.000webhostapp.com/forget?auth=${otptoken}&account=${base64.encode(TargetMail)}`,
          //     email: TargetMail
          //   },
          //   "user_TKle7O8rRcIzJSOGC7o4j"
          // ).then(() => {
          //   uni.alert(uni.lang("ठीक है!", "Alright!"), uni.lang("सत्यापन मेल आपके खाते में भेज दिया गया है, कृपया इसे जांचें।", "Verification Mail is sent to your account, please check that."));
          //   navigation.goBack();
          // })
          //   .catch((e) => {
          //     uni.Error(e);
          //   });

            uni.alert(uni.lang("ठीक है!", "Alright!"), uni.lang("सत्यापन मेल आपके खाते में भेज दिया गया है, कृपया इसे जांचें।", "Verification Mail is sent to your account, please check that."));
          navigation.goBack();
        }else{
          uni.Error("BACKEND SIDE ERROR");
        }
      })
      .catch(e=>uni.Error(e));
      //SENT MAIL NOW ALERT
    } else {
      uni.alert(uni.lang("महत्वपूर्ण", "Important"), uni.lang("कृपया सही मेल डाले", "Please enter correct E-Mail"));
    }
  }
  return (
    <SafeAreaView style={{
      width: "100%",
      height: "100%"
    }}>
      <View style={{
        backgroundColor: uni.isPC() == true ? colors.silver : colors.white,
        flex: 1
      }}>
        <Pranah.stb />
        <View style={{
          flexDirection: uni.dev("column", "column", "row"),
          height: "100%",
          width: "100%"
        }}>
          {
            uni.isPC() ? (
              <View style={{
                width: "35%",
                backgroundColor: "#FFFFFF",
                height: "85%",
                borderRadius: 30,
                marginTop: "3%",
                marginLeft: "3%",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Pranah.logo />
              </View>
            ) : null
          }
          <View style={{
            width: uni.dev("100%", "100%", "58%"),
            backgroundColor: "#000",
            height: 100,
            // marginTop: uni.stb,
            backgroundColor: colors.white,
            marginTop: uni.dev(0, 0, "3%"),
            marginLeft: uni.dev(0, 0, "2%"),
            borderRadius: 28,
            height: uni.dev("100%", "100%", "85%"),
            alignContent: "center"
          }}>

            <ImageBackground source={uni.isPC() == true ? require('../assets/background_wide.png') : require('../assets/background_mobile.png')}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center"
              }}
              imageStyle={{
                borderRadius: 28
              }}
            >
              <KeyboardAvoidingView style={{ height: "100%", width: "100%" }}>
                <ScrollView style={{ height: "100%", width: "100%" }} contentContainerStyle={{ alignItems: "center" }} bounces={false}>
                  {
                    uni.isPC() == false ? (
                      <View>
                        <Pranah.br height={60} />
                        <Pranah.logo />
                      </View>
                    ) : (
                      <View style={{
                        width: "80%",
                        alignItems: "flex-start",
                        paddingTop: 60
                      }}>
                        <Text style={{
                          fontSize: 50,
                          fontWeight: "bold"
                        }}>{uni.lang("अकॉउंट सत्यापन ||", "Account Verification.")}</Text>
                      </View>
                    )

                  }

                  {
                    uni.isPC() == false ? (
                      <>
                        <Pranah.br height={20} />
                        <Text style={{
                          fontSize: 30,
                          fontWeight: "bold"
                        }}>{uni.lang("अकॉउंट सत्यापन", "Account Verification")}</Text>
                        <Pranah.br height={20} />
                      </>
                    ) : (
                      <>
                        <Pranah.br height={40} />
                      </>
                    )

                  }
                  {/* <Pranah.br height={20}/> */}
                  <Text style={{
                    width: "80%",
                    alignContent: "center"
                    // lineHeight: 25
                  }}>{uni.lang("आपको मेल पर लिंक भेजा जायेगा", "Password Reset Link will be sent to you via E-Mail")}</Text>
                  {/* <Pranah.br height={20}/> */}
                  <Pranah.tb hint={uni.lang("पंजीकृत इ-मेल", "Registered E-Mail")} value={TargetMail} onChangeText={(text) => { setTargetMail(text) }} />
                  {prog == true ? (<><Pranah.br height={20} />
                    <ActivityIndicator color={colors.primary} size="large" /></>) : null}
                  <View style={{
                    width: "80%",
                    flexDirection: "row"
                  }}>
                    <View style={{
                      margin: 20,
                      width: "50%"
                    }}>
                      <Pranah.txtBtn title={uni.lang("< वापस जाये", "< Back")} onPress={() => {
                        navigation.goBack(null);
                      }} />
                    </View>
                    <View style={{
                      width: "35%",
                      marginTop: 15
                    }}>
                      {
                        prog == false ? (
                          <Pranah.btn width={uni.lang(uni.dev(110, 110, 120), uni.dev(140, 140, 160))} onPress={() => {
                            sendResetMail()
                          }} title={uni.lang("मेल भेजे", "Send Mail")} />
                        ) : null}
                    </View>
                  </View>

                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>

          </View>
        </View>

      </View>
    </SafeAreaView>

  );
}

export { Otp };