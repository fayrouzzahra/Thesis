import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";

function ProfileScreen() {
 
  const navigation = useNavigation();
  const [item, setItem] = useState([]);
  const [email, setEmail] = useState(SessionStorage.getItem("emailOwner"));
  const [token, setToken] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const getEmail = async () => {
    try {
      const emailOwner = SessionStorage.getItem("emailOwner");
      if (emailOwner) {
        const res = await axios.get(`${APP_API_URL}/owner/${emailOwner}`);
       SessionStorage.getItem('emailOwner')
       setItem(res.data);
      } else {
        console.log("no email provided");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled((previousState) => !previousState);
  };
  
  const logout = () => {
    SessionStorage.clear('emailOwner');
    navigation.navigate("Role");
  };

  const styles = createStyles(isDarkTheme);
  useEffect(() => {
    getEmail();
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileHeader}>
         
        <Image  source={{ uri: item?item.image :"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" }} style={styles.avatar} />
        <Text style={styles.name}>{item?item.FirstName :"first Name" } </Text>
        <Text style={styles.lastname}>{item?item.LastName :"Last Name" }</Text>
        <Text style={styles.email}>{item?item.email:'email'}</Text>
          
       
        </View>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("EditProfilee", { item: item })}
        >
          <Text style={styles.optionText}>Edit Profile information</Text>
        </TouchableOpacity>
        <View style={styles.option}>
          <Text style={styles.optionText}>Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={toggleTheme}>
          <Text style={styles.optionText}>Theme</Text>
          <Text style={styles.optionText}>
            {isDarkTheme ? "Dark mode" : "Light mode"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Contact us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={logout}>
          <Feather name="log-out" size={24} color="black" />
          <Text style={styles.optionText}>LogOut</Text>

        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const createStyles = (isDarkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkTheme ? "#333" : "#f5f5f5",
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkTheme ? "#fff" : "#000",
    },
    email: {
      fontSize: 16,
      color: isDarkTheme ? "lightgray" : "gray",
    },
    phone: {
      fontSize: 16,
      color: isDarkTheme ? "lightgray" : "gray",
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#555" : "#ccc",
      width: '100%',
      textAlign: 'center',
      padding: 5,
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#555" : "#ccc",
    },
    optionText: {
      fontSize: 18,
      color: isDarkTheme ? "#fff" : "#000",
    },
  });

export default ProfileScreen;
