import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { Pranah } from '../pranah/cust';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SearchScreen } from './search';

const Weather = {
    apiUrl: (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39c99d0e864c23190b6d862f16ff0a68&units=metric`
};
const openOpenWeather = () => {
    Linking.openURL("https://openweathermap.org");
}

function Center({ child }) {
    return (
        <View style={disc.center}>
            {child}
        </View>
    );
}

function WeatherIcon({ weather }) {
    return (
        <>
            <Image
                source={require('../assets/logo.png')}
                style={disc.weatherIcon}
            />
        </>
    );
}
function Row({ child }) {
    return (
        <View style={disc.row}>
            {child}
        </View>
    );
}
function OptionButton({ title, right, color, icon, onPress }) {
    const rgt = right == true ? disc.left : undefined;
    return (
        <TouchableOpacity style={[disc.optbutton, rgt, {backgroundColor: color}]} onPress={onPress}>
            <View style={disc.icon}>{icon}</View>
            <Text style={disc.white}>{title}</Text>
        </TouchableOpacity>
    );
}
function AllOptions({nav}) {
    return (
        <>
            <Center
                child={
                    <View style={disc.optParent}>
                        <Row
                            child={
                                <>
                                    <OptionButton title="Memes" color="#d30c0c" 
                                        icon={
                                            <FontAwesome5 name="laugh-squint" size={24} color={"#fff"} />
                                        }
                                        onPress={()=>alert('Feature Under Development')}

                                    />
                                    <OptionButton title="News" right={true} color={"#0e82ba"}
                                        icon={
                                            <FontAwesome name="newspaper-o" size={22} color={"#fff"} />
                                        }
                                        // onPress={()=>nav.push("NewsList", {})}
                                        onPress={()=>alert('Feature Under Development')}
                                        
                                    />
                                </>
                            }
                        />
                        <Row
                            child={
                                <>
                                    <OptionButton title="Web" color="#025611" 
                                        icon={
                                            <MaterialCommunityIcons name="search-web" size={24} color={"#fff"} />
                                        }
                                        onPress={()=>nav.push("Duck", {})}
                                    />
                                    <OptionButton title="Games" right={true} color="#a47200"
                                        icon={
                                            <MaterialIcons name="games" size={24} color={"#fff"} />
                                        }
                                        onPress={()=>alert('Feature Under Development')}
                                    />
                                </>
                            }
                        />
                    </View>
                } />
        </>
    );
}
function WeatherWidget({ data }) {
    return (
        <>
            {data == null ? null : (<Pranah.br height={10} />)}
            <Center
                child={
                    data == null ? (<></>) : (
                        <View style={disc.weather}>
                            <View style={disc.weatherBox}>
                                <WeatherIcon />
                                <View>
                                    <Text style={{
                                        fontSize: 35
                                    }}>
                                        {Math.round(data.main.temp)}°C
                                    </Text>
                                    <Text style={[disc.cityName, {
                                        marginTop: -5
                                    }]}>
                                        {data.name} &bull; {data.weather[0].main}
                                    </Text>
                                </View>
                            </View>
                            <View style={disc.line}></View>
                            <TouchableOpacity
                                onPress={openOpenWeather}
                            >
                                <Center child={
                                    <Text style={{
                                        color: "#404040",
                                        fontSize: 13,
                                        marginTop: 12
                                    }}>
                                        Data by OpenWeatherMap.org
                                    </Text>
                                } />
                            </TouchableOpacity>
                        </View>
                    )
                }
            />
        </>
    );
}

function SearchBox({ nav }) {
    return (
        <>
            <Pranah.br height={20} />
            <Center
                child={
                    <TouchableOpacity style={disc.search}
                        onPress={() => nav.push("Search", {})}
                    >
                        <Text>Search for Friend</Text>
                    </TouchableOpacity>
                }
            />
        </>
    );
}

function DiscoverScreen({ navigation }) {
    const [weatherData, setWeatherData] = useState(null);
    async function fetchWeather() {
        axios({
            url: Weather.apiUrl("Delhi"),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(({ status, data }) => {
                if (status == 200) {
                    setWeatherData(data);
                }
            })
            .catch(e => console.error(e));
    }
    useEffect(() => {
        fetchWeather();
    }, []);
    return (
        <View>
            <SearchBox nav={navigation} />
            <AllOptions nav={navigation} />
            <WeatherWidget data={weatherData} />
        </View>
    );
}
export default DiscoverScreen;

const disc = StyleSheet.create({
    search: {
        width: "80%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    center: {
        width: "100%",
        alignContent: "center",
        alignItems: "center"
    },
    weather: {
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10
    },
    weatherBox: {
        flexDirection: "row"
    },
    cityName: {

    },
    weatherIcon: {
        height: 50,
        width: 50,
        margin: 5,
        marginRight: 10
    },
    line: {
        width: "100%",
        backgroundColor: "#DDDDDD",
        height: 1,
        marginTop: 10
    },
    optParent: {
        width: "80%",
        justifyContent: "space-evenly"
    },
    row: {
        flexDirection: "row",
        width: "100%"
    },
    optbutton: {
        padding: 2,
        borderRadius: 10,
        width: "45%",
        marginTop: 10,
        marginLeft: "3%",
        flexDirection: "row"
    },
    left: {
        marginLeft: "4%"
    },
    white: {
        color: "#FFFFFF",
        marginTop: 7,
        marginLeft: 3
    },
    icon: {
        margin: 5
    }
});