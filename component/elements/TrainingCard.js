import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import * as FileSystem from "expo-file-system";
import DesModal from "./DesModal";

export default class TrainingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArr: [],
      imgcount: 0,
      imgmax: 0,
      decModalOpen: false,
      description: "empty description",
    };
  }

  componentDidMount = () => {
    this.setState({ description: this.props.rowData.description });
    this.handleImaged(this.props.rowData.imagesName);
  };

  openDetails = () => {
    console.log("open modal");
    this.setState({ decModalOpen: true });
  };

  closeDetails = () => {
    console.log("close modal");
    this.setState({ decModalOpen: false });
  };

  handleImaged = (imgArr) => {
    let excerciseImg = [];
    imgArr.map((imgname) => {
      excerciseImg.push(FileSystem.documentDirectory + "images/" + imgname);
    });
    this.setState({
      imageArr: excerciseImg,
      imgmax: imgArr.length,
    });
    this.animate(imgArr.length);
  };

  animate = (max) => {
    setInterval(() => {
      this.setState((currState) => {
        return {
          imgcount: currState.imgcount + 1 < max ? currState.imgcount + 1 : 0,
        };
      });
    }, 800);
  };

  render() {
    const { _id, exerciseName, imagesName } = this.props.rowData;
    const { imgcount, imageArr } = this.state;
    // console.log(imageArr[imgcount]);
    return (
      <View>
        <DesModal
          open={this.state.decModalOpen}
          description={this.state.description}
          closeModal={this.closeDetails}
        />
        <View style={style.mainView}>
          <View style={style.cardHeader}>
            <View style={{ flex: 2, flexWrap: "wrap" }}>
              <Text style={style.moreDetailsText}>{exerciseName}</Text>
            </View>
            <View style={style.moreDetails}>
              <TouchableOpacity onPress={() => this.openDetails(_id)}>
                <Text style={{ ...style.moreDetailsText, color: "#fcc76a" }}>
                  More Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 10, flexWrap: "wrap", width: "100%" }}>
            <Image style={style.image} source={{ uri: imageArr[imgcount] }} />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  mainView: {
    marginVertical: 3,
    height: 310,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#b7c1c7",
    borderRadius: 5,
    shadowColor: "#b7c1c7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    backgroundColor: "#2866c9",
  },
  cardHeader: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  moreDetails: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: "flex-end",
  },
  moreDetailsText: {
    color: "#fcfcfc",
    fontSize: 16,
  },
  image: {
    width: screenWidth - 2,
    height: 290,
    borderRadius: 4,
  },
});
