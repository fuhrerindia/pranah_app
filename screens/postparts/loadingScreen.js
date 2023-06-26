import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../pranah/colors';

function ProgressScreenAnime(){
    return(
        <>
            <View style={prog.screen}>
                <ActivityIndicator color={colors.primary} size={"large"}/>
            </View>
        </>
    );
}
export default ProgressScreenAnime;

const prog = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    }
});