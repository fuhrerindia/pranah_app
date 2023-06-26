import React, { useState, useEffect } from 'react';
import { Login } from './screens/login.js';
import { SignUp } from './screens/signup.js';
import { Otp } from './screens/otp.js';
import { Profile } from './screens/profile.js';
import { Feed } from './screens/feed.js';
import { Main } from './screens/main.js';
import Products from './screens/store/products.js';
import { Comment } from './screens/comment';
import Details from './screens/store/detail.js';
import NewsPage from './screens/news';
import { Activity } from './screens/activity';
import { Test } from './screens/test.js';
import { LikeList } from './screens/like';
import DuckDuckGo from './screens/duckduckgo.js';
import { NewPost } from './screens/new_post';
import { LanguageSelect } from './screens/setting/Language';
import MapScreen from './screens/map.js';
import playbadge from './assets/playbadge.png';
import { MpScreen } from './screens/mediaPost.js';
import { EditProfileSetting } from './screens/setting/EditProfileSetting';
import { OtherProfile } from './screens/other_prof';
import { SearchScreen } from './screens/search.js';
import Requests from './screens/Requests';
import { FollList } from './screens/foll_list'
import Constants from 'expo-constants'; 
import ShowNewsScreen from './screens/shownews';
import NewBlog from './screens/newBlog';
import SettingItem from './screens/setting/list';
import WebSearch from './screens/websearch';
import { EditPrivateAccount } from './screens/setting/EditPrivateAccount';
import { Mail } from './screens/tminc/mail';
import MediaPostUpload from './screens/MediaPostUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry, Text, View, Platform, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Touchable, Linking } from 'react-native';
import { TextPost } from './screens/TextPost';
import DiscoverScreen from './screens/discover.js';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
// NAVIGATION
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './pranah/colors.js';
import { uni } from './css/uni.js';
const Stack = createStackNavigator();

function App() {
  const [loaded, setLoaded] = useState(false);
  const [dest, setDest] = useState("Login");

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      alert(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MIN,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => console.log(token)).catch(e => console.log(e));
    AsyncStorage.getItem("mail")
      .then((r) => {
        if (r == null || r == undefined) {
          setDest("Login");
        } else {
          setDest("Main");
        }
        setLoaded(true);
      })
      .catch((r) => {
        setDest("Login");
        setLoaded(true);
      });
  }, []);
  return (
    <>
      {loaded == true ?
        uni.width > 650 ? (<>
          <View style={errorcss.view}>
            <Image source={require('./assets/logo.png')} style={errorcss.image} />
            <Text style={errorcss.text}>Pranah is not optimised for wide screens.</Text>
            <Text style={errorcss.snap}>However, Pranah is functional under development state in Android Apps, also you can use Pranah Web from mobile browsers. Sorry for inconvinience, wide screen support will be available soon. Until then you can use the button below to install Pranah in your Android devices, or open web.pranahapp.in in your mobile.</Text>
            <TouchableOpacity onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.info_themorningindia.pranah")}>
              <Image source={playbadge} style={errorcss.badge} />
            </TouchableOpacity>
          </View>
        </>) : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={dest}>
              {/*dest*/}
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: Platform.OS === "web" ? true : false }} />
              <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
              <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="Duck" component={DuckDuckGo} options={{ headerShown: false }} />
              <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
              <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
              <Stack.Screen name="FollList" component={FollList} options={{
                headerShown: true, title: uni.lang("मित्र मंडली", "Follow Circle")
              }}
              />
              < Stack.Screen name="Comment" component={Comment} options={{
                headerShown: true, title: uni.lang("टिप्पणियाँ", "Comments"), transitionSpec: {
                  open: config,
                  close: config,
                }
              }} />
              <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
              <Stack.Screen name="NewBlog" component={NewBlog} options={{ headerShown: true }} />
              <Stack.Screen name="NewsList" component={NewsPage} options={{ headerShown: false }} />
              <Stack.Screen name="Disc" component={DiscoverScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ShowNews" component={ShowNewsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Activity" component={Activity} options={{ headerShown: true }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="NewPost" component={NewPost} options={{ headerShown: false }} />
              <Stack.Screen name="OtherProfile" component={OtherProfile} options={{ headerShown: false }} />
              <Stack.Screen name="WebSearch" component={WebSearch} options={{ headerShown: false }} />
              <Stack.Screen name="OTP" component={Otp} options={{ headerShown: false }} />
              <Stack.Screen name="MediaPostS" component={MpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
              <Stack.Screen name="EditProfileSetting" component={EditProfileSetting} options={{ headerShown: true, title: uni.lang("प्रोफ़ाइल संपादित करें", "Edit Profile") }} />
              <Stack.Screen name="LanguageSelect" component={LanguageSelect} options={{ headerShown: true, title: uni.lang("भाषा चुने", "Choose Language") }} />
              <Stack.Screen name="EditPrivateAccount" component={EditPrivateAccount} options={{ headerShown: true, title: uni.lang("खाते की निजता", "Account Privacy") }} />
              <Stack.Screen name="Requests" component={Requests} options={{ headerShown: true, title: uni.lang("फॉलो के अनुरोध", "Follow Requests") }} />
              <Stack.Screen name="Mail" component={Mail} options={{ headerShown: false }} />
              <Stack.Screen name="SettingItem" component={SettingItem} options={{ headerShown: true, title: uni.lang("समायोजन", "Settings") }} />
              <Stack.Screen name="LikeList" component={LikeList} options={{ headerShown: true, title: uni.lang("किनको यह पसंद आया?", "Likes") }} />
              <Stack.Screen name="TextPost" component={TextPost} options={{ headerShown: true, title: uni.lang("नई पोस्ट", "New Post") }} />
              <Stack.Screen name="MediaPostUpload" component={MediaPostUpload} options={{ headerShown: true, title: uni.lang("नई पोस्ट", "New Post") }} />
              <Stack.Screen name="MediaPost" component={LikeList} options={{ headerShown: true, title: uni.lang("नई पोस्ट", "New Post") }} />
            </Stack.Navigator>
          </NavigationContainer >
        )
        :
        <View
          style={
            {
              width: "100%",
              height: "100%",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center"
            }
          }
        >
          <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
      }
    </>
  );
}
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
export default App;
AppRegistry.registerComponent('pranah', () => App);
const errorcss = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#ffc7c7",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  text: {
    fontSize: 50,
    fontWeight: "bold"
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  badge: {
    width: 150,
    height: 50,
    marginTop: 10
  },
  snap: {
    marginHorizontal: 150,
    textAlign: "center"
  }
});