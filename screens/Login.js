import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => alert(error));
    }

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />
        <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
        <View style={styles.inputContainer}>
            <Input 
                placeholder="Email" 
                type="email" 
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input 
                placeholder="Password" 
                secureTextEntry 
                type="password" 
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
            />
        </View>

        <Button containerStyle={styles.button} onPress={signIn} title="Login" />
        <Button containerStyle={styles.button} onPress={() => navigation.navigate('SignUp')} type="outline" title="Sign Up" />
        <View style={{ height: 200 }} />

      </KeyboardAvoidingView>
    )
}


export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
