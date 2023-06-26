import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, Dimensions, View } from "react-native";
export default function DuckDuckGo() {
    const [visible, setVisible] = useState(false);
    const height = Dimensions.get("screen").height;
    const width = Dimensions.get("screen").width;
    return (
        <>
            <WebView
                source={{ uri: "https://duckduckgo.com/" }}
                onLoadStart={() => setVisible(true)}
                onLoadEnd={() => setVisible(false)}
            />
            {visible ? (
                <View
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ActivityIndicator
                        color={"red"}
                        size={"large"}
                    />
                </View>
            ) : null}
        </>
    );
}