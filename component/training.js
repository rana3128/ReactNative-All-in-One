import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import TrainingCard from "./elements/TrainingCard";
import { downloadImages } from "../utils/InitAppCheck";
import { getDB } from "../utils/DBHandler";

export default class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: [],
    };
  }

  componentDidMount() {
    getDB().then((db) => {
      this.setState({ db });
    });
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Text>This is Training page</Text>
        <FlatList
          data={this.state.db}
          renderItem={({ item }) => <TrainingCard rowData={item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
