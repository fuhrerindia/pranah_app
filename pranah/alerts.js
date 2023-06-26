import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
const Alerts = {
  single: (obj) => {
    let defaultAlertData = {
      visible: obj.visible,
      title: obj.title,
      message: obj.message,
      button: obj.button,
      clicked: obj.clicked
    }
    return (
      <Modal style={{
        flex: 1,
        backgroundColor: "#000000aa"
      }}
        visible={obj.visible}
        transparent={true}
      >
        <View style={{
          backgroundColor: "#000000aa",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}

        >
          <View style={{
            backgroundColor: "#FFF",
            padding: 20,
            width: "85%",
            borderRadius: 10
          }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 10
              }}
            >{defaultAlertData.title}</Text>
            <Text style={{
              fontSize: 15
            }}>{defaultAlertData.message}</Text>
            <TouchableOpacity style={{
              marginTop: 20,
              alignItems: "center",
              borderTopColor: "#000",
              borderTopWidth: 1,
              paddingTop: 10
            }}
              onPress={defaultAlertData.clicked}
            >
              <Text style={{
                color: "#058896",
                fontWeight: "bold"
              }}>{defaultAlertData.button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  },
  multi: (obj) => {
    let defaultAlertData = {
      visible: obj.visible,
      title: obj.title,
      message: obj.message,
      button: obj.button,
      clicked: obj.clicked,
      secclicked: obj.secclicked,
      secbutton: obj.secbutton
    }
    return (
      <Modal style={{
        flex: 1,
        backgroundColor: "#000000aa"
      }}
        visible={obj.visible}
        transparent={true}
      >
        <View style={{
          backgroundColor: "#000000aa",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}

        >
          <View style={{
            backgroundColor: "#FFF",
            padding: 20,
            width: "85%",
            borderRadius: 10
          }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 10
              }}
            >{defaultAlertData.title}</Text>
            <Text style={{
              fontSize: 15
            }}>{defaultAlertData.message}</Text>
            <View style={{
              marginTop: 20,
              alignItems: "center",
              borderTopColor: "#000",
              borderTopWidth: 1,
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            >
              <TouchableOpacity onPress={defaultAlertData.clicked}>
                <Text style={{
                  color: "#058896",
                  fontWeight: "bold"
                }}>{defaultAlertData.button}</Text>
              </TouchableOpacity>
              <View style={{
                width: "10%"
              }}></View>
              <TouchableOpacity onPress={defaultAlertData.secclicked}>
                <Text style={{
                  color: "#058896",
                  fontWeight: "bold"
                }}>{defaultAlertData.secbutton}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export { Alerts };