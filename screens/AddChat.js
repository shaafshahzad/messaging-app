import React, { useLayoutEffect, useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        chatName: input,
      });
      navigation.goBack();
    } catch (error) {
            alert(error);
        }
    };

    return (
      <View style={styles.container}>
        <Input 
            placeholder="Enter a chat name" 
            value={input} 
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
        />
        <Button onPress={createChat} title="Create new Chat" />
      </View>
    )

}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    }
})
