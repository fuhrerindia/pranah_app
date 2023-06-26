import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Pranah } from '../../pranah/cust';
import { design } from './design';

const UserHead = React.memo(
    function UserHead(params) {
        return (
            <>
                <TouchableOpacity onPress={() => { params.navigation.navigate("OtherProfile", { username: params.user }) }}
                >
                    <View style={design.headprnt}>
                        <Image
                            source={params.dp === "" ? require('../../assets/user.png') : { uri: params.dp }}
                            defaultSource={{ uri: params.dp }}
                            style={design.dp}
                        />
                        <View style={design.snapPrnt}>
                            <Pranah.br height={4} />
                            <Text style={design.name}>
                                {params.name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    });
export { UserHead };