// import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import axios from 'axios';
import { uni } from '../css/uni.js';

function likeOrDislike(postId, navigation) {
    AsyncStorage.getItem("mail")
        .then((email) => {
            if (email == null) {
                navigation.replace("Login");
            } else {
                AsyncStorage.getItem("pass")
                    .then((passw) => {
                        if (passw == null) {
                            navigation.replace("Login");
                        } else {
                            axios({
                                method: 'post',
                                url: uni.bind('like'),
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                data: uni.string({
                                    mail: email,
                                    pass: base64.encode(passw),
                                    post: postId
                                })
                            })
                                .then(
                                    (response) => {
                                        if (response.status == 200) {
                                            let resp = response.data;
                                            if (uni.logic(resp) === "true") {
                                                let someVariable = "";
                                            } else if (uni.logic(resp) === "error") {
                                                //temp-err uni.Error();
                                                // alert(resp);
                                            } else if (uni.logic(resp) === "invalid") {
                                                navigation.replace("Login");
                                            } else {
                                                // //temp-err uni.Error();  
                                                alert(resp);
                                            }
                                        } else {
                                            //temp-err uni.Error();
                                        }
                                    }
                                )
                                .catch((e) => {
                                    //temp-err uni.Error();
                                    // alert(e);
                                });
                        }
                    })
                    .catch(() => {
                        //temp-err uni.Error();
                    });
            }
        })
        .catch(() => uni.Error());
}
export { likeOrDislike };