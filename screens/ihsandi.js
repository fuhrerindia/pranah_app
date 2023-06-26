import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import sample from '../assets/doge/similing.png';
import { colors } from '../pranah/colors';
import axios from 'axios';
import base64 from 'react-native-base64';
import PranahUser from './tminc/cred';
import { uni } from '../css/uni';

function MapScreen({ navigation }) {
    const [state, setState] = useState(
        [
            {
              dp: "https://i.pinimg.com/originals/b5/0a/ef/b50aef7a9723c9195ace500b587152f2.jpg",
              lat: 27.5065503,
              lng: 77.6667111,
              mail: "paurush.sinha.d@gmail.com",
              name: "Chor",
            },
          ]
          
    );
    useEffect(()=>{
        PranahUser()
        .then(({mail, pass, username})=>{
            axios({
                method: 'post',
                url: uni.bind('location'),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: uni.string({
                  mail: base64.encode(mail),
                  pass: base64.encode(pass)
                })
              })
              .then((resp)=>{
                  let status = resp.status;
                  let data = resp.data;
                  if (status == 200){
                        if (data.status === "success"){
                            setState(data.data);
                            console.log(state);
                        }else{
                            uni.Error();
                        }
                  }else{
                      uni.Error("4XX/3XX/5XX ERROR");
                  }
              })
              .catch((e)=>uni.Error(e));
        })
        .catch((r)=>{
            uni.Error(r);
        });
    }, []);
    return (
        <>
        <Text>{JSON.stringify(state)}</Text>
        {
            state.map((i)=>{
                <Text>{i}</Text>
            })
        }
            <MapView
                initialRegion={{
                    latitude: parseInt(state[0].lat),
                    longitude: parseInt(state[0].lng),
                    latitudeDelta: 0.010,
                    longitudeDelta: 0.010
                }}
                style={{ flex: 1 }}
            >{
            }
            <PranahMarker 
                    image={sample}
                    title={"HUE"}
                    description={"Huehuheuhe"}
                    coordinate={{
                        lat: 0,
                        long: 0
                    }}
                />
            </MapView>
            {/* <Text></Text> */}
        </>
    );
}
const PranahMarker = ({
    image,
    title,
    description,
    coordinate
}) => {
    return (
        <>
            <Marker
                coordinate={{
                    latitude: parseInt(coordinate.lat),
                    longitude: parseInt(coordinate.long)
                }}
                title={title}
                description={description}
            >
                <>
                    <View style={{
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        paddingBottom: 10,
                        height: 70
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            backgroundColor: colors.primary,
                            borderRadius: 25,
                            marginBottom: 1,
                            borderWidth: 1,
                            borderColor: "#000"
                        }}>
                            <Image source={image}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 20
                                }}
                            />
                        </View>
                        <View style={{
                            width: 5,
                            height: 5,
                            borderRadius: 3,
                            marginTop: 2,
                            backgroundColor: colors.primary
                        }}></View>
                        <View style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            marginTop: 5,
                            backgroundColor: colors.primary
                        }}></View>
                    </View>
                </>
            </Marker>
        </>
    );
}
export default MapScreen;