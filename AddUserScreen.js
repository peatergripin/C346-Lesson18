import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function AddUserScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    if (!fullName || !email || !phoneNumber) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    let user = { fullName, email, phoneNumber };

    fetch("https://onlineuserappwebservice.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => navigation.navigate("Home"));
  };

  return (
    <View style={Styles.container}>
      <StatusBar />

      {/* Header */}
      <View style={Styles.headerContainer}>
        <Text style={Styles.title}>Add User</Text>
        <Text style={Styles.subtitle}>Fill in the details below</Text>
      </View>

      {/* Form Card */}
      <View style={Styles.formCard}>
        <Text style={Styles.label}>Full Name</Text>
        <TextInput
          style={Styles.input}
          placeholder="Enter full name"
          placeholderTextColor="#888"
          onChangeText={setFullName}
          value={fullName}
        />

        <Text style={Styles.label}>Email</Text>
        <TextInput
          style={Styles.input}
          placeholder="Enter email"
          placeholderTextColor="#888"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <Text style={Styles.label}>Phone Number</Text>
        <TextInput
          style={Styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#888"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={Styles.primaryButton} onPress={handleSubmit}>
          <Text style={Styles.primaryButtonText}>✅ Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.secondaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={Styles.secondaryButtonText}>⬅ Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    marginBottom: 5,
  },

  subtitle: {
    color: "white",
    textAlign: "center",
    opacity: 0.9,
    fontSize: 14,
  },

  formCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    color: "#222",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  primaryButton: {
    backgroundColor: "#090088",
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  secondaryButtonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
});
