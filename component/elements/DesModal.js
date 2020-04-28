import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Dimensions
} from "react-native";
import { WebView } from "react-native-webview";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DesModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  function closeModal() {
    props.closeModal();
  }
  const htmlData = `<html><head>
                    <title>Page Title</title>
                    <style>
                        body { font-size: 300%; word-wrap: break-word; overflow-wrap: break-word; }
                    </style>
                    </head><body>`
                    + props.description + 
                    `</body></html>`
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.open}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <WebView
                style={{ marginTop: 5 , width:screenWidth-10, height:screenHeight-180 }}
                source={{html: htmlData}}
              />
            </View>
          </View>
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              closeModal();
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 3,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#fc7703",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin:5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DesModal;
