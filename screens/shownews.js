import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Pranah } from '../pranah/cust';


function ShowNewsScreen({ navigation, route }) {
    const cont = route.params.data;
    return (
        <>
            <ScrollView style={style.bg}>
                <Pranah.br height={20} />
                <Center>
                    <Image
                        source={{ uri: cont.image }}
                        style={style.image}
                    />
                    <Text style={style.title}>{cont.title}</Text>
                    <Pranah.br height={15} />
                    <Text style={style.news}>
                        {cont.news}
                    </Text>
                </Center>
                <Pranah.br height={40} />
            </ScrollView>
        </>
    );
}
export default ShowNewsScreen;
const Center = ({ children }) => {
    return (
        <>
            <View style={style.center}>
                {children}
            </View>
        </>
    );
}
const style = StyleSheet.create({
    image: {
        width: "90%",
        height: 200,
        borderRadius: 20
    },
    center: {
        width: "100%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "left",
        width: "70%"
    },
    news: {
        width: "70%",
        lineHeight: 25,
        textAlign: "justify"
    },
    bg: {
        backgroundColor: "#fff"
    }
});