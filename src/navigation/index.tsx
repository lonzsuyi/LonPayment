import 'react-native-gesture-handler';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { createDrawerNavigator, DrawerHeaderProps } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

import Header from '../components/Header';
import CustomDrawerContent from '../components/CustomDrawerContent';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import MyBillScreen from '../screens/MyBillScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';

import { RootStackParamList, RootDrawerParamList } from '../types/rootTypes';
import { AuthState } from '../types/authTypes';
import LinkingConfiguration from './LinkingConfiguration';

// Realm 
import { LonPaymentRealmContext } from '../models';
import { SYNC_CONFIG } from '../../sync.config';

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
  const [authState, setAuthState] = useState(AuthState.None);
  const [authVisible, setAuthVisible] = useState(false);

  // auth method
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setAuthState(AuthState.Loading);
      const credentials = Realm.Credentials.emailPassword(email, password);

      try {
        setUser(await app.logIn(credentials));
        setAuthVisible(false);
        setAuthState(AuthState.None);
      } catch (e) {
        console.log('Error logging in', e);
        setAuthState(AuthState.LoginError);
      }
    },
    [setAuthState, setUser, setAuthVisible, app],
  );
  const handleRegister = useCallback(
    async (email: string, password: string) => {
      setAuthState(AuthState.Loading);

      try {
        // Register the user...
        await app.emailPasswordAuth.registerUser({ email, password });
        // ...then login with the newly created user
        const credentials = Realm.Credentials.emailPassword(email, password);

        setUser(await app.logIn(credentials));
        setAuthVisible(false);
        setAuthState(AuthState.None);
      } catch (e) {
        console.log('Error registering', e);
        setAuthState(AuthState.RegisterError);
      }
    },
    [setAuthState, app],
  );
  const handleLogout = useCallback(() => {
    setUser(null);
    app.currentUser?.logOut();
  }, [setUser, app]);

  const baseScreen = [
    <Drawer.Screen key={0} name="Home" >
      {
        (props) => <HomeScreen {...props} user={user} />
      }
    </Drawer.Screen>,
  ];
  const noAuthScreen = [
    ...baseScreen,
    <Drawer.Screen key={101} name="Login">
      {
        (props) => <LoginScreen {...props} onLogin={handleLogin} authState={authState} />
      }
    </Drawer.Screen>,
    <Drawer.Screen key={102} name="Register">
      {
        (props) => <RegisterScreen {...props} onRegister={handleRegister} authState={authState} />
      }
    </Drawer.Screen>
  ];
  const authScreen = [
    ...baseScreen,
    <Drawer.Screen key={201} name="MyBill" component={MyBillScreen} />,
    <Drawer.Screen key={202} name="HelpCenter">
      {
        (props) => <HelpCenterScreen {...props} user={user} />
      }
    </Drawer.Screen>
  ];

  // Judge login some menu 
  return !user || !app.currentUser || !SYNC_CONFIG.enabled ? (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props: DrawerHeaderProps) => {
          return <Header type="default" {...props} />
        },
        drawerPosition: 'right'
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} onLogout={handleLogout} user={user} authState={authState} />}
    >
      {noAuthScreen}
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
        drawerContent={(props) => <CustomDrawerContent {...props} onLogout={handleLogout} user={user} authState={authState} />}
      >
        {authScreen}
      </Drawer.Navigator>
    </RealmProvider>
  )
}
