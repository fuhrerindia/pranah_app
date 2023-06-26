import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TextInput, Platform } from 'react-native';
import { uni } from '../css/uni';
import { Pranah } from '../pranah/cust';
import { UserHead } from './tminc/userhead';
import { LoadingProg } from './postparts/mediacont';
import { style } from './postparts/somestyles';
import { WebBasedNavigation } from './tminc/widenav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { colors } from '../pranah/colors';
import AnimatedLottieView from 'lottie-react-native';

const SearchScreen = ({ navigation }) => {
    const [value, setvalue] = useState("");
    const [Listdata, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [prog, setProg] = useState(false);
    const [end, setEnd] = useState(true);
    const searchBox = useRef();
    const { t, i18n } = useTranslation();
    const UpdateLangugae = () => {
        AsyncStorage.getItem("lang")
            .then((l) => {
                i18n.changeLanguage(l)
            });
    }

    useEffect(() => {
        UpdateLangugae();
        searchBox.current.focus();
    }, []);

    function result({ item }) {
        let data = item;
        return item === "null" ? <><Text style={styles.centerText}>{t("nothing")}</Text></> : (
            <>
                <View style={styles.result} >
                    <UserHead dp={data.dp === "na" ? "t" : data.dp} name={data.name} user={data.user} navigation={navigation} />
                </View>
            </>
        );
    }


    function search() {
        if (value.replace(" ", "") !== "") {
            setData([]);
            setProg(true);
            setEnd(true);
            setStart(0);
            axios({
                method: 'post',
                url: uni.bind('search'),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: uni.string({
                    q: value,
                    start: 0
                })
            })
                .then(({ status, data }) => {
                    if (status == 200) {
                        setProg(false);
                        setEnd(false);
                        if (uni.logic(data) === "error") {
                            uni.Error("SERVER RESPONDED AN ERROR");
                        } else if (uni.logic(data) === "null") {
                            setData(["null"]);
                        } else {
                            setStart(start + 20);
                            setData(data);
                        }
                    } else {
                        uni.Error("SERVER DOWN");
                    }
                })
                .catch(e => uni.Error(e));
        }
    }


    function footer() {
        return end == false ? <><View style={styles.progressSome}><LoadingProg /></View><Pranah.br height={400} /></> : <Pranah.br height={400} />;
    }

    function fetchMore() {
        axios({
            method: 'post',
            url: uni.bind('search'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: uni.string({
                q: value,
                start: start
            })
        })
            .then(({ status, data }) => {
                if (status == 200) {
                    setProg(false);
                    setEnd(true);
                    if (uni.logic(data) === "error") {
                        uni.Error("SERVER RESPONDED AN ERROR");
                    } else if (uni.logic(data) === "null") {
                        setEnd(true);
                    } else {
                        setStart(start + 20);
                        setData([...Listdata, ...data]);
                    }
                } else {
                    uni.Error("SERVER DOWN");
                }
            })
            .catch(e => uni.Error(e));
    }

    return (
        <View>
            <View style={styles.plate}>
                <View style={[style.web, styles.fullWidth]}>
                    <View style={styles.centerWithFull}>
                        <View style={styles.fullCenter}>
                            <View style={styles.textBox}>
                                <TextInput placeholder={t("searchHint")}
                                    placeholderTextColor="#000000"
                                    onChangeText={(v) => setvalue(v)}
                                    returnKeyType={"search"}
                                    value={value}
                                    onSubmitEditing={() => search()}
                                    ref={searchBox}
                                />
                            </View>
                        </View>
                        {prog == true ? <LoadingProg /> : null}
                        <View style={styles.someNew}>
                            <Pranah.br height={10} />
                            {Listdata.length == 0 && prog == false ? (
                                <>
                                    <View style={styles.someShit}>{
                                        Platform.OS !== "web" ? (
                                            <>
                                                <AnimatedLottieView
                                                    source={require('../assets/searchanimation.json')}
                                                    autoPlay={true}
                                                    loop={true}
                                                    style={styles.buildIcon} />
                                            </>
                                        ) : (
                                            <Image source={require('../assets/build.png')} style={{
                                                height: 297 / 3,
                                                width: 401 / 3
                                            }} />
                                        )
                                    }
                                    </View>
                                </>
                            ) : (
                                <FlatList
                                    data={Listdata}
                                    renderItem={result}
                                    onEndReachedThreshold={0.3}
                                    onEndReached={fetchMore}
                                    style={styles.fullWidth}
                                    ListFooterComponent={footer}
                                />
                            )}
                        </View>
                    </View>
                </View>
                <WebBasedNavigation navigation={navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    result: {
        borderWidth: 1,
        borderColor: colors.silver,
        marginVertical: 10,
        padding: 5,
        borderRadius: 10,
        width: "88%",
        paddingTop: 10,
        backgroundColor: "#ffffff6b"
    },
    centerText: {
        textAlign: "center"
    },
    progressSome: {
        width: "100%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    plate: {
        width: "100%",
        height: "100%",
        flexDirection: "row"
    },
    fullWidth: {
        width: "100%"
    },
    centerWithFull: {
        width: "100%",
        alignContent: "center",
        alignItems: "center"
    },
    fullCenter: {
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    textBox: {
        backgroundColor: "#fff",
        width: "80%",
        marginTop: 20,
        paddingLeft: 20,
        borderRadius: 8,
        paddingVertical: 5
    },
    someNew: {
        width: "100%",
        alignItems: "flex-start",
        alignContent: "flex-start",
        paddingLeft: 10 / 100 * uni.width
    },
    someShit: {
        width: "100%",
        height: "80%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buildIcon: {
        height: uni.width - 200,
        width: uni.width - 200
    }
})

export { SearchScreen };
