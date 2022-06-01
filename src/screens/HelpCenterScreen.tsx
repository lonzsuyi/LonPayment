import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

import { RootDrawerScreenProps } from '../types/rootTypes';

type HelpCenterScreenProps = RootDrawerScreenProps<'HelpCenter'> & {
    user: Realm.User | null
}

export default function HelpCenterScreen({ navigation, user }: HelpCenterScreenProps) {
    const url = `https://jvod.300hu.com/vod/product/c0069dcc-e894-40cd-98cb-206735bd08ae/7a03a038a1224939b740880d07028fd8.mp4?source=2&h265=h265/18799/5dcd73531929475ea949947b0e8e8df5.mp4`

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.helpTitle}>
                <Text style={styles.helpTitleTxt} fontType="comfortaaBold">Help Center</Text>
            </View>
            <View style={{ margin: 12, borderRadius: 5, height: 180 }}>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpTitle: {
        marginBottom: 100,
        backgroundColor: Colors.common.tintGray
    },
    helpTitleTxt: {
        fontSize: 28,
    },
})