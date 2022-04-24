import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import { View, Text } from '../components/Themed';
import { RootDrawerScreenProps } from '../types/rootTypes';
import LogoTile from '../components/LogoTitle';


import Header from '../components/Header';


export default function HomeScreen({ navigation }: RootDrawerScreenProps<'Home'>) {

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

    return (
        <SafeAreaView style={styles.container}>
            <LogoTile iconSize={30} titleSize={28} />
            <View style={styles.welcome}>
                <Text style={styles.welcomeTxt} fontType="comfortaa">Hi Guys! Welcome.</Text>
            </View>
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
    }
})