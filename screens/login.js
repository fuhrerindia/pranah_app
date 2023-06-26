import React, { useState } from 'react';
import { Text, View, ActivityIndicator, KeyboardAvoidingView, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
// import { signin } from './css/signin.js';
import { uni } from '../css/uni.js';
import { Pranah } from '../pranah/cust.js';
import { colors } from '../pranah/colors.js';
import axios from 'axios';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signin } from '../css/signin.js';

function ValidateEmail(mail) {
  var re = /\S+@\S+\.\S+/;
  return re.test(mail);
}

function Login({ navigation }) {
  // STATE CONSTANTS
  const [UserMail, setUserMail] = useState("");
  const [UserPass, setUserPass] = useState("");
  const [showIndicator, setshowIndicator] = useState(false);

  //LOGIN WITH SERVER
  function signInWithServer(provmail, provpass) {
    axios({
      method: 'post',
      url: uni.bind('signin'),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: uni.string({
        mail: provmail,
        pass: base64.encode(provpass)
      })
    })
      .then(function (response) {
        setshowIndicator(false);
        if (response.status == 200) {
          let data = String(response.data);
          if (uni.logic(data) === "error") {

            uni.Error("RESP: ERROR");

          } else if (data === "false" || data === " false") {

            uni.alert(uni.lang("चेतावनी", "Warning"), uni.lang("गलत ईमेल या पासवर्ड", "Wrong E-Mail or Password"));
          } else {
            let mailToStore = UserMail.replace(" ", "");
            mailToStore.toLocaleLowerCase();
            AsyncStorage.setItem("mail", mailToStore);
            AsyncStorage.setItem("pass", UserPass);
            AsyncStorage.setItem("username", response.data.username);
            navigation.navigate("Main");
          }
        } else {
          uni.Error("RESP: !== 2XX");
        }
      })
      .catch((err) => {
        setshowIndicator(true);
        uni.Error(err);
      });
  }

  //CHECKING DATA
  function trySigningIn() {
    let ProvEmail = UserMail.replace(" ", "");
    ProvEmail = ProvEmail.toLowerCase();
    let ProvPass = UserPass;

    if (ValidateEmail(ProvEmail) && ProvPass.length > uni.passLength) {
      setshowIndicator(true);
      signInWithServer(ProvEmail, ProvPass);
    } else {
      uni.alert(uni.lang("अरे!", "Oops!"), uni.lang("कृपया वैध ईमेल और पासवर्ड दर्ज़ करें", "Please enter a valid E-Mail and Password"));
    }
  }


  //FUNCTION (FOR WORK) OF THE SCREEN
  //EMAIL FORMAT CHECK  
  function ValidateEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
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
                        <Pranah.br height={uni.dev(40, 60, 60)} />
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
                        }}>{uni.lang("अंदर जाये ||", "Sign In.")}</Text>
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
                        }}>{uni.lang("अंदर जाये", "Sign In")}</Text>
                        <Pranah.br height={20} />
                      </>
                    ) : (
                      <>
                        <Pranah.br height={40} />
                      </>
                    )

                  }

                  <Pranah.tb hint={uni.lang("इ-मेल", "E-Mail")} onChangeText={(text) => { setUserMail(text) }} value={UserMail} />
                  <Pranah.tb hint={uni.lang("पासवर्ड", "Password")} password={true} onChangeText={(text) => { setUserPass(text) }} value={UserPass} />
                  {showIndicator == true ? <><Pranah.br height={10} /><ActivityIndicator size="large" color="#fc3903" /></> : null}

                  <View style={{
                    width: "80%",
                    flexDirection: "row"
                  }}>
                    <View style={{
                      margin: 20,
                      width: "50%"
                    }}>
                      <Pranah.txtBtn title={uni.lang("पासवर्ड भूल गए?", "Forgot Password?")} onPress={() => {
                        navigation.navigate("OTP");
                      }} />
                    </View>
                    <View style={{
                      width: "35%",
                      marginTop: 15
                    }}>
                      <Pranah.btn width={110} onPress={() => { trySigningIn() }} title={uni.lang("अंदर जाये", "Sign In")} />
                    </View>
                  </View>
                  <View style={{
                    width: "80%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <View style={{
                      width: "40%",
                      height: 1,
                      backgroundColor: colors.grey
                    }}></View>

                    <Text style={{
                      margin: 20
                    }}>
                      {uni.lang("या", "OR")}
                    </Text>

                    <View style={{
                      width: "40%",
                      height: 1,
                      backgroundColor: colors.grey
                    }}></View>
                  </View>

                  <Pranah.txtBtn title={uni.lang("नया खाता बनाये", "Create New Account")} onPress={() => {
                    navigation.navigate("Sign Up")
                  }} />
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>

          </View>
        </View>
      </View>
    </SafeAreaView>

  );
}

export { Login };