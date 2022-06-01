import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import { View, Text, Button } from '../components/Themed';
import { RootDrawerScreenProps } from '../types/rootTypes';
import LogoTile from '../components/LogoTitle';


import Header from '../components/Header';

type HomeScreenProps = RootDrawerScreenProps<'Home'> & {
    user: Realm.User | null
}

export default function HomeScreen({ navigation, user }: HomeScreenProps) {

    /**
     * Init screen
     */
    // Set header 
    useEffect(() => {
        navigation.setOptions({
            header: (props: NativeStackHeaderProps) => {
                return <Header
                    type="onlyDrawerMenu"
                    {...props}
                    {...navigation}
                    myHeaderStyle={styles.header}
                    myHeaderLeftStyle={styles.headerLeft}
                    myHeaderTitleStyle={styles.headerTitle}
                    myHeaderRightStyle={styles.headerRight} />
            }
        })
    }, [])

    // To login
    const toLogin = () => {
        navigation.navigate('Login');
    }

    // To register
    const toRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <SafeAreaView style={styles.container}>
            <LogoTile iconSize={30} titleSize={28} />
            <View style={styles.welcome}>
                <Text style={styles.welcomeTxt} fontType="comfortaa">Hi Guys! Welcome.</Text>
            </View>
            {
                !user ? [
                    <View key={0} style={styles.loginAndRegisterPanel}>
                        <Button style={styles.loginAndRegisterBtn} width={300} name="Login" type="bgYAndTxtW" shape="rectangle" onPress={toLogin} />
                    </View>,
                    <View key={1} style={styles.loginAndRegisterPanel}>
                        <Button width={300} name="Register" type="bgWAndTxtB" shape="rectangle" onPress={toRegister} />
                    </View>
                ] : null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.common.primaryYellow,
    },
    headerLeft: {
        backgroundColor: Colors.common.primaryYellow,
    },
    headerTitle: {
        backgroundColor: Colors.common.primaryYellow,
    },
    headerRight: {
        backgroundColor: Colors.common.primaryYellow,
    },
    container: {
        height: '100%',
        backgroundColor: Colors.common.primaryYellow,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        marginTop: 10,
        backgroundColor: Colors.common.primaryYellow,
    },
    welcomeTxt: {
        fontSize: 22
    },
    loginAndRegisterPanel: {
        marginTop: 20,
        backgroundColor: Colors.common.primaryYellow,
    },
    loginAndRegisterBtn: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})