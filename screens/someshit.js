import React, {memo} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
const Item = ({ item, onPress, backgroundColor, textColor }) => {
    console.log("HIHN");
    return (
    <>        
    {/* <Text style={[styles.title, textColor]}>{item.title}</Text> */}
        <Text style={
            item.a == true ? { backgroundColor: "red" } : { backgroundColor: "black" }
        }>LIKED?</Text>
        <Image
            source={require('../assets/doge/similing.png')}
            style={{ width: 50, height: 50 }}
        />
        <Image
            source={require('../assets/doge/similing.png')}
            style={{ width: 50, height: 50 }}

        />
        <Image
            source={require('../assets/doge/similing.png')}
            style={{ width: 50, height: 50 }}

        />
        <Image
            source={require('../assets/doge/similing.png')}
            style={{ width: 50, height: 50 }}

        />
        <TouchableOpacity onPress={onPress}>
        {item.a === true ? <AntDesign name="stepbackward" size={24} color="black" /> : <AntDesign name="stepforward" size={24} color="black" />}
        {item.a === true ? <Text>LIKED</Text> : <Text>Not Liked</Text>}

        </TouchableOpacity>

    </>);
}
    export default Item;