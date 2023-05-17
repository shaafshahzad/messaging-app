import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, openChat }) => {
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
                This is where the recent message goes
            </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
