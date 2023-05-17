import React, { Component, useLayoutEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Chat = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
        headerLeft : () => (
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
                <AntDesign name='arrowleft' size={24} color='white' />
            </TouchableOpacity>
            ),
        headerRight : () => (
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }} 
            >
                <TouchableOpacity style={{ marginRight: 10 }}>
                    <FontAwesome name='video-camera' size={24} color='white' />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10 }}>
                    <Ionicons name='call' size={24} color='white' />
                </TouchableOpacity>
            </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();
        addDoc(collection(db, 'chats', route.params.id, 'messages'), {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInput('');
    };      
    
    useLayoutEffect(() => {
        const chatRef = collection(db, 'chats', route.params.id, 'messages');
        const messagesQuery = query(chatRef, orderBy('timestamp', 'asc'));
      
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      
        return () => unsubscribe(); // Unsubscribe the listener when component unmounts
    }, [route]);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar style='light' />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    {messages.map(({ id, data }) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Avatar 
                                    source={{ uri: data.photoURL }}
                                    rounded
                                    size={30}
                                    position='absolute'
                                    bottom={-15}
                                    right={-5}
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        right: -5,
                                    }}
                                />
                                <Text style={styles.receiverText}>{data.message}</Text>
                            </View>
                        ) : (
                            <View key={id} style={styles.sender}>
                                <Avatar 
                                    source={{ uri: data.photoURL }}
                                    rounded
                                    size={30}
                                    position='absolute'
                                    bottom={-15}
                                    left={-5}
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        right: -5,
                                    }}
                                />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                        value={input} 
                        onChangeText={text => setInput(text)} 
                        placeholder='Message...' 
                        style={styles.textInput}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} >
                        <Ionicons name='send' size={24} color='#2B68E6' />
                    </TouchableOpacity>
                </View>
            </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )

}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },
    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    receiverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10,
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative',
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white',
    }
})
