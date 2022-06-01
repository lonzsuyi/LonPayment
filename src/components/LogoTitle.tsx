import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { Text, View, FontIcon } from './Themed';

interface LogoTileProps {
    iconSize: number,
    titleSize: number
}

export default function LogoTile(props: LogoTileProps) {
    return (
        <View style={styles.logoTile}>
            <View style={styles.logoPanel}>
                <FontIcon style={styles.moneyIcon} name="money" size={props.iconSize} />
                <FontIcon style={styles.handIcon} name="hand-lizard-o" size={props.iconSize} />
            </View>
            <Text style={styles.logoName} fontType="comfortaaBold">LonPay</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoTile: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.common.primaryYellow,
    },
    logoPanel: {
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: Colors.common.primaryYellow,

    },
    moneyIcon: {
        transform: [
            { rotate: '-20deg' }
        ],
    },
    handIcon: {
        position: 'absolute',
        top: -20,
        right: -22,
        transform: [
            { rotate: '-45deg' }
        ]
    },
    logoName: {
        marginLeft: 15,
        fontSize: 28,
        color: Colors.common.white
    }
})