import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../pranah/colors';

const styles = StyleSheet.create({
  parent: {
    // backgroundColor: "#fff",
  },
  setting: {
    margin: 40
  },
  detParent: {
    flexDirection: "row"
  },
  follBox: {
    width: 150,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff94"
  },
  fillInside: {
    backgroundColor: colors.primary
  },
  fillBorder: {
    borderWidth: 1,
    borderColor: colors.primary
  },
  textRed: {
    color: colors.primary,
    textAlign: "center"
  },
  white: {
    textAlign: "center",
    color: "#fff"
  },
  dp: {
    width: 100,
    height: 100,
    backgroundColor: "#000",
    borderRadius: 50
  },
  center: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  fullWide: {
    width: "100%"
  },
  mediaPostDes: {
    backgroundColor: "#000",
    height: 100,
    width: 100
  },
  detKid: {
    marginTop: 24,
    marginLeft: 10
  },
  name: {
    fontSize: 25,
    fontWeight: "bold"
  },
  username: {
    marginTop: -5,
    fontSize: 11
  },
  eachCol: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  colkid: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ededed"
  },
  settingMargin: {
    marginLeft: 40
  },
  bio: {
    marginTop: 10,
    marginLeft: 10
  },
  detCount: {
    paddingBottom: 15,
    marginTop: 20,
    flexDirection: "row"
  },
  numCount: {
    fontSize: 30
  },
  numCountKid: {
    marginHorizontal: 20
  }
});

export { styles };