import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import CreateGroup from './screens/CreateGroup';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import SearchUser from './screens/SearchUser';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#5F7ADB' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CreateGroup' component={CreateGroup} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='SearchUser' component={SearchUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
