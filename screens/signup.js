import React, { useState } from 'react';
import { ActivityIndicator, Text, View, Alert, KeyboardAvoidingView, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
// import { signin } from './css/signin.js';
import { uni } from '../css/uni.js';
import { Pranah } from '../pranah/cust.js';
import { colors } from '../pranah/colors.js';
import axios from 'axios';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';


function SignUp({ navigation }) {
  // STATES 
  const [UserMail, setUserMail] = useState("");
  const [UserPass, setUserPass] = useState("");
  const [UserName, setUserName] = useState("");
  const [PranahUserName, setPranahUserName] = useState("");
  const [CPass, setCPass] = useState("");
  const [showIndicator, setshowIndicator] = useState(false)

  function updateUsernameState(text){
    setPranahUserName(text.toLowerCase());
  }
  //BRAIN OF THE SCREEN
  function ValidateEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
  }
  const ErrorAlertHeading = uni.lang("महत्वपूर्ण", "Important");

  function serverSignUp(newMail) {
    let otptoken = md5(Math.floor(Math.random() * 10000));

    createAccount_pr();



    function createAccount_pr() {
      axios({
        method: 'post',
        url: uni.bind('register'),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: uni.string({
          mail: newMail,
          pass: base64.encode(UserPass),
          name: UserName,
          username: PranahUserName,
          token: otptoken
        })
      })
        .then((response) => {
          if (response.status == 200) {
            let data = String(response.data);
            if (data === "true" || data === " true") {
              // emailjs.send(
              //   "service_38e1rzl",
              //   "template_3dyx3jr",
              //   {
              //     name: UserName,
              //     url: `http://pranah.ml/cdn/verify?auth=${otptoken}&account=${base64.encode(UserMail)}`,
              //     email: UserMail
              //   },
              //   "user_TKle7O8rRcIzJSOGC7o4j"
              // ).then(() => {
              //   AsyncStorage.setItem("mail", UserMail);
              //   AsyncStorage.setItem("pass", UserPass);
              //   AsyncStorage.setItem("username", PranahUserName);
              //   navigation.navigate("Main");
              // })
              //   .catch((e) => {
              //     AsyncStorage.setItem("mail", UserMail);
              //     AsyncStorage.setItem("pass", UserPass);
              //     AsyncStorage.setItem("username", PranahUserName);
              //     navigation.navigate("Main");
              //   });
              AsyncStorage.setItem("mail", UserMail);
              AsyncStorage.setItem("pass", UserPass);
              AsyncStorage.setItem("username", PranahUserName);
              navigation.navigate("Main");

            } else if (data === "taken" || data === " taken") {
              setshowIndicator(false);
              uni.alert(ErrorAlertHeading, uni.lang("दर्ज उपयोगकर्तानाम पहले से मौजूद है।", "Entered Username already Exists."));
            } else if (data === " mailtaken" || data === "mailtaken") {
              setshowIndicator(false);

              uni.alert(ErrorAlertHeading, uni.lang("दर्ज किया गया मेल पहले से किसी अन्य अकाउंट के उपयोग में है। ", ""));
            }
          } else {
            setshowIndicator(false);

            uni.Error("300");
          }
        })
        .catch((e) => {
          setshowIndicator(false);
          uni.Error(e);
        })
    }
  }


  function SignUpUser() {
    if (UserName.length > 3 && UserPass.length > uni.passLength && UserPass === CPass) {
      if (ValidateEmail(UserMail)) {
        let proMail = UserMail.replace(" ", "");
        proMail = proMail.toLocaleLowerCase();
        setshowIndicator(true);
        serverSignUp(proMail);
      } else {
        uni.alert(ErrorAlertHeading, uni.lang("कृपया वैध ईमेल दर्ज़ करें", "Please enter valid E-Mail Address."));
      }
    } else if (CPass !== UserPass) {
      uni.alert(ErrorAlertHeading, uni.lang("कृपया दोनों जगह एक पासवर्ड ही डाले। ", "Please enter only one password in both the places."));
    } else {

      uni.alert(ErrorAlertHeading, uni.lang("सही या पूरा नाम डाले और कृपया पासवर्ड लम्बा बनाये। ", "Enter correct or full name and please make the password longer."));
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
                        <Pranah.br height={uni.dev(25, 60, 60)} />
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
                        }}>{uni.lang("अकाउंट बनाये ||", "Create Account.")}</Text>
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
                        }}>{uni.lang("अकाउंट बनाये", "Create Account")}</Text>
                        <Pranah.br height={20} />
                      </>
                    ) : (
                      <>
                        <Pranah.br height={40} />
                      </>
                    )

                  }
                  <Pranah.tb hint={uni.lang("नाम", "Name")} onChangeText={(text) => setUserName(text)} value={UserName} />
                  <Pranah.tb hint={uni.lang("उपयोगकर्तानाम", "Username")} onChangeText={(text) => updateUsernameState(text)} value={PranahUserName} />
                  <Pranah.tb hint={uni.lang("इ-मेल", "E-Mail")} onChangeText={(text) => setUserMail(text)} value={UserMail} />
                  <Pranah.tb hint={uni.lang("पासवर्ड", "Password")} password={true} onChangeText={(text) => setUserPass(text)} value={UserPass} />
                  <Pranah.tb hint={uni.lang("पासवर्ड की पुष्टि करे", "Confirm Password")} password={true} onChangeText={(text) => { setCPass(text) }} value={CPass} />
                  {showIndicator == true ? <><Pranah.br height={10} /><ActivityIndicator size="large" color="#fc3903" /></> : null}

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
                      <Pranah.btn width={uni.dev(130, 135, 120)} onPress={() => { SignUpUser() }} title={uni.lang("अकाउंट बनाये", "Create Account")} />
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

export { SignUp };