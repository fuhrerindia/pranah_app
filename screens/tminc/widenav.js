import React from 'react';
import {uni} from '../../css/uni';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../pranah/colors';
import { Feather } from '@expo/vector-icons';

function WebBasedNavigation(obj){
    let navigation = obj.navigation;
        if (uni.isPC() == true){
            const iconSnapNew= {
                marginTop: 4,
                marginLeft: 5
            };
            const spanMar = {
                marginBottom: 7
            };
        return(<>
        <View style={{
            width: "40%",
            height: "70%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
        }}>
        <View
            style={{
                backgroundColor: colors.secondary,
                height: 205,
                borderRadius: 20,
                padding: 17,
                width: 250
            }}
        >
                <TouchableOpacity onPress={()=>{navigation.navigate("Main")}}>
                <View style={[{flexDirection:"row"}, spanMar]}>
                <Feather name="home" size={20} color={"#000"} />
                <Text style={iconSnapNew}>{uni.lang('नवीन', 'Feeds')}</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigation.navigate("Search")}}>
                <View style={[{flexDirection:"row"}, spanMar]}>
                <Feather name="search" size={20} color={"#000"} />
                <Text style={iconSnapNew}>{uni.lang('खोज', 'Discover')}</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{alert("वेब या आईओएस से पोस्ट अभी नहीं डाल सकते, ये जल्द उपलब्ध होगा। ")}}>
                <View style={[{flexDirection:"row"}, spanMar]}>
                <Feather name="upload" size={20} color={"#000"} />
                <Text style={iconSnapNew}>{uni.lang('डाले', 'New')}</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate("Activity")}>
                <View style={[{flexDirection:"row"}, spanMar]}>
                <Feather name="bell" size={20} color={"#000"} />
                <Text style={iconSnapNew}>{uni.lang('सुचना', 'Alerts')}</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}}>
                <View style={[{flexDirection:"row"}, spanMar]}>
                <Feather name="user" size={24} color={"#000"} />
                <Text style={iconSnapNew}>{uni.lang('मैं', 'Me')}</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigation.navigate("SettingItem")}}>
                <View style={[{flexDirection:"row"}, spanMar]}>
                <Feather name="settings" size={22} color={"#000"} />
                <Text style={iconSnapNew}>{uni.lang('समायोजन', 'Settings')}</Text>
                </View>
                </TouchableOpacity>

                </View>
                </View>
                </>
    );
        }else{
            return(<></>);
        }
}
export {WebBasedNavigation};