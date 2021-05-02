import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Trending} from '../views/Trending';
import {DrawerCustomize} from '../views/layouts/DrawerCustomize';
import {DetailGifsAndStickers} from '../views/layouts/DetailGifsAndStickers';
import {keywordSearch} from '../views/keywordSearch';
import { Categorys } from '../views/Categorys';
import { Stickers } from '../views/Stickers';

export const Navigator = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCustomize {...props} />}
      initialRouteName="Home">
      <Drawer.Screen
        options={{
          gestureEnabled: true,
          headerStyle: {backgroundColor: '#D9672E'},
          headerShown: true,
          headerTitleStyle: {color: 'white'},
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          title: 'Trending',
        }}
        name="Home"
        component={Trending}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          headerStyle: {backgroundColor: '#D9672E'},
          headerShown: true,
          headerTitleStyle: {color: 'white'},
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          title: 'Detalles',
        }}
        name="Detail"
        component={DetailGifsAndStickers}
      />

      <Stack.Screen
        options={{
          gestureEnabled: true,
          headerStyle: {backgroundColor: '#D9672E'},
          headerShown: true,
          headerTitleStyle: {color: 'white'},
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          title: 'Busqueda',
        }}
        name="keyword"
        component={keywordSearch}
      />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          headerStyle: {backgroundColor: '#D9672E'},
          headerShown: true,
          headerTitleStyle: {color: 'white'},
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          title: 'Categorias',
        }}
        name="category"
        component={Categorys}
      />

      <Stack.Screen
        options={{
          gestureEnabled: true,
          headerStyle: {backgroundColor: '#D9672E'},
          headerShown: true,
          headerTitleStyle: {color: 'white'},
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          title: 'Stickers Trending',
        }}
        name="stickers"
        component={Stickers}
      />
    </Drawer.Navigator>
  );
};
