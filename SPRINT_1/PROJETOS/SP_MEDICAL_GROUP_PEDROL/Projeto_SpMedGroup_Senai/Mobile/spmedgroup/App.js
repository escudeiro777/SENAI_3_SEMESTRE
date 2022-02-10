/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './src/Screens/Login';
import Main from './src/Screens/main';
import PerfilCamera from './src/Screens/camera';

const StackNavigator = createStackNavigator();

export default function Stack() {
  return (
      <NavigationContainer>
        <StatusBar 
          hidden= {false}
          backgroundColor = '#7BE0CB'
        />
        <StackNavigator.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
          <StackNavigator.Screen name = "Login" component={Login} />
          <StackNavigator.Screen name = "Main" component={Main} />
          <StackNavigator.Screen name = "PerfilCamera" component={PerfilCamera} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    )
}