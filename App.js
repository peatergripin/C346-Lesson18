import React, { useState, useEffect } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from "react-native";
import data from "./data";

let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    // Add fetch () - Exercise 1A
    const myurl = "https://onlineuserappwebservice.onrender.com/users";
    fetch(myurl)
      .then((response) => {
        // Throw error if cannot get data, go to nearst catch and use backup data.
        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }
        return response.json();
      })
      .then((myJson) => {
        setMyData(myJson);
        originalData = myJson;
      })
      .catch((error) => {
        console.log(error);
        setMyData(data);
        originalData = data;
      });
  }, []);

  const FilterData = (text) => {
    if (text != "") {
      let myFilteredData = originalData.filter(
        (item) =>
          item.fullName.toLowerCase().includes(text) ||
          item.email.toLowerCase().includes(text) ||
          item.phoneNumber.trim().includes(text)
      );
      setMyData(myFilteredData);
    } else {
      setMyData(originalData);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={Styles.cardContainer}>
        <Text style={Styles.fullName}>😃 {item.fullName}</Text>
        <View style={Styles.cardTextArea}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Email:</Text> {item.email}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Contact Number:</Text>{" "}
            {item.phoneNumber}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <StatusBar />
      <View style={Styles.headerContainer}>
        <Text style={Styles.title}>User Management</Text>

        <Text style={Styles.searchLabel}>Search user</Text>

        <TextInput
          style={Styles.searchBar}
          placeholder="Search Details"
          placeholderTextColor="#888"
          onChangeText={(text) => {
            FilterData(text);
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={mydata}
          renderItem={renderItem}
          style={Styles.listContainer}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "stretch",
            padding: 20,
            gap: 10,
          }}
        />
      </View>
    </View>
  );
};

export default App;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  headerContainer: {
    backgroundColor: "#090088",
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },

  searchLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.9,
  },

  searchBar: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  listContainer: {
    flexGrow: 1,
    paddingTop: 12,
  },

  cardContainer: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  cardImageSize: {
    height: 180,
    width: 180,
    marginRight: 12,
  },

  cardTextArea: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },

  fullName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    paddingVertical: 8,
  },
});
