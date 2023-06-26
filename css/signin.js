import {uni} from '../css/uni.js';
const signin = {
    logo: {
        width: 150,
        height: 150,
    },
    parent: {
        alignItems: "center",
        flexDirection: uni.isPC() == true ? "row" : "column",
        backroundColor: "#ededed",
        flex: 1
    },
    leftLay: {
        width: "40%"
    }
};
export {signin};