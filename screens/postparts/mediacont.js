import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { design } from '../tminc/design';
import { postDesign } from './somestyles';
import { uni } from '../../css/uni';
import { LayoutProvider } from 'recyclerlistview';
import { colors } from '../../pranah/colors';
import { Pranah } from '../../pranah/cust';

const MediaCont = React.memo(
    function MediaCont(obj) {
        return (
            <View
                style={design.media}
            >
                <Image
                    source={{ uri: obj.url }}
                    defaultSource={Platform.OS === "web" ?  { uri: obj.url } : null}
                    style={postDesign}
                />
                <View
                    style={design.mediaSnap}
                >
                    <Text style={design.mediaCap}>{obj.caption.length > 20 ? `${obj.caption.substring(0, 20)}...` : obj.caption}</Text>
                </View>
            </View>
        );
    }
);

const TextCont = React.memo(
    function TextCont(obj) {
        return (
            <View
                style={design.textContParent}
            >
                <View
                    style={[postDesign, design.center]}
                >
                    <Text
                        style={design.textMain}
                    >{obj.caption}</Text>
                </View>
                <View
                    style={design.mediaSnap}
                >
                    <Text style={design.mediaCap}></Text>
                </View>
            </View>
        );
    }
);

const PostLikes = React.memo(
    function PostLikes(obj) {
        let post = obj.postId;
        let like = parseInt(obj.like);
        let navigation = obj.screenNav;
        let toprint;
        if (like == 0) {
            toprint = uni.lang("इसे पसंद करने वाले पहले व्यक्ति बनें", "Be first to like this.");
        } else if (like == 1) {
            toprint = uni.lang("एक व्यक्ति द्वारा पसंद किया गया", "Liked by one person");
        } else {
            like = String(like);
            toprint = uni.lang(`${like} लोगो ने पसंद किया`, `${like} likes`);
        }
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('LikeList', { postId: post });
                    }}
                >
                    <Text
                        style={{
                            marginLeft: uni.dev(5 / 100 * uni.width, 5 / 100 * uni.width, 4 / 100 * uni.width),
                            fontWeight: "bold",
                            marginTop: 5
                        }}
                    >{toprint}</Text>
                </TouchableOpacity>
            </>
        );
    }
);

let layoutProvider = new LayoutProvider(
    index => {
        return index == 0 ? "HEAD" : "NORMAL";
    },
    (type, dim) => {
        switch (type) {
            case "NORMAL":
                dim.height = uni.dev(uni.width + 170, uni.width + 170, 40 / 100 * uni.width + 170);
                dim.width = uni.dev(uni.width, uni.width, 40 / 100 * uni.width);
                break;
            case "HEAD":
                dim.height = 10;
                dim.width = uni.dev(uni.width, uni.width, 40 / 100 * uni.width);
                break;

        }
    }
);

const ListFooter = React.memo(
    function ListFooter() {
        return (
            <>
                <Image
                    style={{
                        width: uni.dev(uni.width, uni.width, 40/100*uni.width),
                        height: uni.dev(uni.width, uni.width, 40/100*uni.width)
                    }}
                    source={require('../../assets/ended.png')}
                />
            </>);
    });

const LoadingProg = React.memo(
    function LoadingProg() {
        return (<>
            <Pranah.br height={60} />
            <ActivityIndicator size={"large"} color={colors.primary} />
            <Pranah.br height={100} />
        </>);
    }
);

export { MediaCont, TextCont, PostLikes, layoutProvider, ListFooter, LoadingProg };