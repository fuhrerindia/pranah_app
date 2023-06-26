import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, ImageBackground, Image, Text, FlatList, Pressable, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { uni } from '../css/uni';
import { ListFooter, LoadingProg } from './postparts/mediacont';
import PranahUser from './tminc/cred';
import ProgressScreenAnime from './postparts/loadingScreen';
import axios from 'axios';
import base64 from 'react-native-base64';
import ProfileTop from './profile/top';
import { Pranah } from '../pranah/cust';
import { styles } from './profile/design';
import { style } from './postparts/somestyles';
import { WebBasedNavigation } from './tminc/widenav';
import i18next from "../lang/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

function TextBasedPost({ text, navigation, id, username }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MediaPostS", { postId: id, username: username })} style={styles.eachCol}>
      <View style={[styles.center, styles.colkid]}>
        <Text>{text.substring(0, 8)}...</Text>
      </View>
    </TouchableOpacity>
  );
}

function MediaBasedPost({ url, navigation, id, username }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MediaPostS", { postId: id, username: username })} style={styles.eachCol}>
      <Image
        source={{ uri: url }}
        style={styles.colkid}
      />
    </TouchableOpacity>
  );
}
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Profile = ({ navigation }) => {
  const [screenLoaded, setScreenLoaded] = useState(false);
  const [List, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [profile, setProfile] = useState({});
  const [end, setEnd] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { t, i18n } = useTranslation();
  const UpdateLangugae = () => {
      AsyncStorage.getItem("lang")
          .then((l) => {
              i18n.changeLanguage(l)
          });
  }

  const doRefresh = React.useCallback(() => {
    setScreenLoaded(false);
    setData([]);
    setStart(0);
    setEnd(false);
    setProfile({});
    setCurrentUsername("");
    fetchMore();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  function fetchMore() {
    PranahUser()
      .then(({ mail, pass, username }) => {
        setCurrentUsername(username);
        axios({
          method: 'post',
          url: uni.bind('profile'),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: uni.string({
            mail: mail,
            pass: base64.encode(pass),
            start: start,
            username: base64.encode(username)
          })
        })
          .then(({ status, data }) => {
            if (status == 200) {
              if (uni.logic(data) === "error") {
                uni.Error("RESP: ERROR");
              } else if (uni.logic(data) === "invalid") {
                uni.signOut(navigation);
              } else {
                if (screenLoaded == false) {
                  setScreenLoaded(true);
                }
                setStart(start + 20);

                if (data.posts === "null") {
                  setEnd(true);
                } else if (data.posts === "private" || data.posts === "requested") {
                  setData(data.posts);
                  
                } else {
                  setData([
                    ...List,
                    ...data.posts
                  ]);
                }
                setProfile(data);
              }
            } else {
              uni.Error("Server Broke Down.");
            }
          })
          .catch(e => uni.Error(e))
      })
      .catch(e => uni.Error(e))
  }

  useEffect(() => {
    UpdateLangugae();
    navigation.setOptions({ tabBarVisible: uni.isPC() == true ? false : true })
    fetchMore();
  }, []);

  function ListItem({ item, index }) {
    return item.type === "text" ? (
      <TextBasedPost text={item.caption} navigation={navigation} id={item.id} username={profile.username} />)
      : item.url.split(".")[1] === "mp4" ? (<Thumbnail url={item.url} />) : (<MediaBasedPost url={item.url} navigation={navigation} id={item.id} username={profile.username} />);
  }

  function footerComp() {
    return end == false ? <LoadingProg /> : (<><Pranah.br height={100} /></>);
  }

  function PpTop() {
    return (
      <>
        <ProfileTop name={profile.name} username={profile.username} bio={profile.bio} dp={profile.dp} post={profile.postCount} follower={profile.follower} following={profile.following} navigation={navigation} isFoll={profile.isFollowing} srcUnme={currentUsername}
          lang={{
            follower: t("follower"),
            following: t("following"),
            requested: t("requested"),
            follow: t("follow")
          }}
        />
      </>
    );
  }

  return screenLoaded == true ? (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        source={uni.dev(require('../assets/background_mobile.png'), require('../assets/background_mobile.png'), require('../assets/background_wide.png'))}
      >
        <View
          style={{ width: "100%", height: "100%", flexDirection: "row" }}
        >
          <View
            style={style.web}
          >
            {List === "requested" ? (<><ScrollView><PpTop /><View><Image
              source={require('../assets/request.png')}
              style={{
                width: uni.dev(uni.width, uni.width, 40 / 100 * uni.width),
                height: uni.dev(uni.width, uni.width, 40 / 100 * uni.width)
              }}
            />
            </View></ScrollView></>) : List === "private" ? (<><ScrollView><PpTop /><View><Image
              source={require('../assets/private.png')}
              style={{
                width: uni.dev(uni.width, uni.width, 40 / 100 * uni.width),
                height: uni.dev(uni.width, uni.width, 40 / 100 * uni.width)
              }}
            />
            </View></ScrollView></>) : (
              <FlatList
                ListHeaderComponent={() => <PpTop />}
                data={List}
                renderItem={ListItem}
                numColumns={2}
                ListFooterComponent={footerComp}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.3}
                refreshControl={(
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={doRefresh}
                    colors={["red"]}
                  />
                )}
              />
            )}
          </View>
          <WebBasedNavigation navigation={navigation} />
        </View>
      </ImageBackground>
    </>
  ) : (
    <ProgressScreenAnime />
  );
}





export { Profile };
