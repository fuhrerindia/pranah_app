import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Activity } from './activity';
import { Feed } from './feed.js';
import { Profile } from './profile.js';
import { NewPost } from './new_post.js';
import SettingItem from './setting/list';
import { Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import DiscoverScreen from './discover.js';
import { colors } from '../pranah/colors';
import MapScreen from './map';
import bgimage from '../assets/pranahhead.png';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

function Main() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                inactiveTintColor: "#666",
                activeTintColor: colors.primary,
                style: bottomTab.design,
            }}
        >
            <Tab.Screen name="Feeds" component={Feed} options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="home" size={24} color={color} />
                ),
            }}
            />
            <Tab.Screen name="Search" component={DiscoverScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="wpexplorer" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="New" component={NewPost}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="upload" size={24} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen name="Notices" component={Activity}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bell" size={24} color={color} />
          ),
        }}
      /> */}
            {/* <Tab.Screen name="Map" component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="map" size={22} color={color} />
          ),
        }}
      /> */}
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen name="Settings" component={SettingItem}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      /> */}
        </Tab.Navigator>
    );
}
export { Main };
const bottomTab = StyleSheet.create({
    design: {
        position: "absolute",
        elevation: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 58,
        backgroundColor: "#fff"
    }
});