import React, { Component, useLayoutEffect, useState, useEffect } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { StatusBar } from 'expo-status-bar'

const Home = ({ navigation }) => {

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chats',
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Profile')}>
            <Avatar 
              rounded
              source={{ uri: auth?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ 
            marginRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SearchUser")}>
            <SimpleLineIcons name='magnifier' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("CreateGroup")}>
            <SimpleLineIcons name='plus' size={24} color='black' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const openChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} openChat={openChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})
