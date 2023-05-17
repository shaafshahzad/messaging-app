import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, openChat }) => {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'desc')),
            (snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    });

    return (
      <ListItem onPress={() => openChat(id, chatName)} key={id} bottomDivider>
        <Avatar
            rounded
            source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '800' }}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
