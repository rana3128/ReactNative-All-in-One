import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { connect } from "react-redux";
import { addUser } from "../actions";
import * as FileSystem from "expo-file-system";
import { getfiles, downloadDB } from "../utils/InitAppCheck";
import { WebView } from "react-native-webview";

class Deit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageRaw: "",
      processName: "Steady",
    };
  }

  addData = (inputData) => {
    let data = { ...this.props.users, addr: "dibiyapur", pincode: 206244 };

    this.props.adduserR(data);
  };

  downloadImg = () => {
    this.setState({ processName: "downliading Images from server" });
    getfiles()
      .then((res) => {
        if (res) {
          this.setState({ processName: "Images Downloaded" });
        } else {
          this.setState({ processName: "downliading Images Failed" });
        }
      })
      .catch((err) => {
        this.setState({
          processName:
            "downliading Images Failed error : " + JSON.stringify(err),
        });
      });
  };

  downloadDatabase = () => {
    this.setState({ processName: "downliading DataBase from server" });
    downloadDB()
      .then((res) => {
        if (res) {
          this.setState({ processName: "DataBase Downloaded" });
        } else {
          this.setState({ processName: "downliading DataBase Failed" });
        }
      })
      .catch((err) => {
        this.setState({
          processName:
            "downliading DataBase Failed error : " + JSON.stringify(err),
        });
      });
  };

  getImg = () => {
    FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "images/trx-reg-suspended-push-up-1.jpg",
      { encoding: FileSystem.EncodingType.Base64 }
    ).then((rawFile) => {
      console.log(rawFile);
      this.setState({ processName : `file exists : ${rawFile.exists}` });
    });
    // FileSystem.getContentUriAsync(FileSystem.documentDirectory+'tmp.jpg').
  };

  loadErr = (err) => {
    console.log(err);
  };

  render() {
    let imgPath =
      FileSystem.documentDirectory + "images/trx-reg-suspended-push-up-0.jpg";
    // imgPath = imgPath.replace("file://", "");
    console.log(imgPath);
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          margin: 10,
          padding: 5,
        }}
      >
        <Text>Deit plans : {JSON.stringify(this.props.users)}</Text>
        <View style={style.dietButton}>
          <Button
            style={{ flex: 1, width: 200 }}
            title="add info"
            onPress={this.addData}
          />
        </View>
        <View style={style.dietButton}>
          <Button title="Download Image" onPress={this.downloadImg} />
        </View>
        <View style={style.dietButton}>
          <Button title="Download DataBase" onPress={this.downloadDatabase} />
        </View>
        <View style={style.dietButton}>
          <Button title="Get Image" onPress={this.getImg} />
        </View>
        <View style={style.dietButton}>
          <Text>{this.state.processName}</Text>
        </View>
        <View style={style.dietButton}>
          <Image style={style.image} source={{ uri: imgPath }} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  dietButton: {
    marginVertical: 5,
    padding: 5,
    width: 200,
  },
  image: {
    width: 280,
    height: 290,
    borderRadius: 4,
  },
});
const mapStateToProps = (state) => ({
  users: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  adduserR: (data) => dispatch(addUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deit);
