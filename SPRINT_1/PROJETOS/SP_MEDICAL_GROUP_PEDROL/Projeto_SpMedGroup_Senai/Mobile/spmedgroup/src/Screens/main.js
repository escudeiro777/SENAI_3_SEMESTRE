import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import Home from './home';
import Consultas from './consultas';
import Perfil from './perfil';

const DrawerNavigator = createDrawerNavigator();

function CustomDrawerContent(props) {
  const Navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" labelStyle={{
        fontSize: 24,
        fontFamily: 'Questrial-Regular',
        color: '#FF0000'
      }} onPress={async () => {
        await AsyncStorage.removeItem('usuario-login');
        Navigation.navigate('Login');
      }} />
    </DrawerContentScrollView>
  );
}

export default Main = () => {
  return (
    <DrawerNavigator.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        drawerActiveTintColor: "#2E9984",
        drawerLabelStyle: {
          fontSize: 24,
          fontFamily: 'Questrial-Regular'
        },
        drawerStyle: {
          borderLeftWidth: 5,
          borderColor: '#2E9984'
        },
        headerStyle: {
          backgroundColor: "#FFF",
          paddingHorizontal: 30,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        header: ({navigation, route, options}) => {
          return <View style = {options.headerStyle}>
            <Image source={require('../../assets/logoSpMed.png')}></Image>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('../../assets/Menu.png')}></Image>
            </TouchableOpacity>
          </View>
        }
      }}>
      <DrawerNavigator.Screen name="Home" component={Home}></DrawerNavigator.Screen>
      <DrawerNavigator.Screen name="Consultas" component={Consultas}></DrawerNavigator.Screen>
      <DrawerNavigator.Screen name="Perfil" component={Perfil}></DrawerNavigator.Screen>
    </DrawerNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  Logout: {
    color: '#FF0000',
    fontSize: 24,
    fontFamily: 'Questrial-Regular'
  }
})