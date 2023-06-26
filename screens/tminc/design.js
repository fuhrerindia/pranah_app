import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../pranah/colors';
import { uni } from '../../css/uni';


const design = StyleSheet.create({
    headprnt: {
        flexDirection: "row",
        marginLeft: uni.dev(8, 8, 35),
        marginBottom: 5
    },
    dp: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    snapPrnt: {
        flexDirection: "column",
        margin: 10
    },
    name: {
        fontWeight: "bold",
        fontSize: 15,
        color: colors.realBlack
    },
    username: {
        marginTop: -5,
        color: colors.lightBlack
    },
    media: { width: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" },
    mediaSnap: {
        width: "100%",
        alignItems: "flex-start",
        marginLeft: uni.dev(10 / 100 * uni.width, 10 / 100 * uni.width, 8 / 100 * uni.width),
        marginTop: 10
    },
    mediaCap: { margin: 20, marginLeft: 0, textAlign: "justify", marginVertical: 0, fontSize: 15 },
    postActionParent: {
        width: "100%",
        alignContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 3 / 100 * uni.width
    },
    underLinePrnt: {
        width: "100%",
        alignItems: "center",
        alignContent: "center",
        margin: 10,
        marginBottom: 20
    },
    underline: {
        width: "90%",
        backgroundColor: colors.grey,
        height: 1
    },
    textContParent: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    center: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    textMain: {
        margin: 10 / 100 * uni.width
    }

});
export {design};