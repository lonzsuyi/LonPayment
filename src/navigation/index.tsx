import 'react-native-gesture-handler';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { createDrawerNavigator, DrawerHeaderProps, } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

import Header from '../components/Header';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import MyBillScreen from '../screens/MyBillScreen';
import LoginScreen from '../screens/LoginScreen';

import { RootStackParamList, RootDrawerParamList } from '../types/rootTypes';
import LinkingConfiguration from './LinkingConfiguration';

import { LonPaymentRealmContext } from '../models';
import { SYNC_CONFIG } from '../../sync.config';
import { Bill } from '../models/Bill';
const { useQuery, useRealm } = LonPaymentRealmContext;

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function DrawerNavigator() {

  // Auth handle
  const { RealmProvider } = LonPaymentRealmContext;
  const app = useRef(new Realm.App({ id: SYNC_CONFIG.appId })).current;
  const [user, setUser] = useState<Realm.User | null>(app.currentUser);

  // Mock login
  useEffect(() => {
    const login = async () => {
      const credentials = Realm.Credentials.anonymous();
      const loginResult = await app.logIn(credentials);
      setUser(loginResult);
    }
    login();
  }, []);

  const baseScreen = [
    <Drawer.Screen key={0} name="Home" component={HomeScreen} />,
    <Drawer.Screen key={1} name="Login" component={LoginScreen} />
  ];
  const authScreen = [
    ...baseScreen,
    <Drawer.Screen key={101} name="MyBill" component={MyBillScreen} />
  ];

  // Judge login some menu 
  return !user || !app.currentUser ? (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props: DrawerHeaderProps) => {
          return <Header type="default" {...props} />
        },
        drawerPosition: 'right'
      }}
    >
      {baseScreen}
    </Drawer.Navigator>
  ) : (
    <RealmProvider sync={{ user, flexible: true }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props: DrawerHeaderProps) => {
            return <Header type="default" {...props} />
          },
          drawerPosition: 'right'
        }}
      >
        {authScreen}
      </Drawer.Navigator>
    </RealmProvider>
  )
}
