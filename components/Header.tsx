import { StyleSheet, TouchableOpacity } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { DrawerHeaderProps, DrawerNavigationOptions } from '@react-navigation/drawer';
import { HeaderBackButton, getHeaderTitle } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';

import { Text, View, FontIcon } from './Themed';

export default function Header(props: DrawerHeaderProps) {
    return (
        <View style={styles.header}>
            <HeaderLeft />
            <Title {...props} />
            <HeaderRight />
        </View>
    )
}

function HeaderLeft() {
    return (
        <View style={styles.headerLeftContainer}>
            <HeaderBackButton />
        </View>
    )
}

function Title({ options, route }: { options: DrawerNavigationOptions, route: RouteProp<ParamListBase, string> }) {
    const title = getHeaderTitle(options, route.name);
    return (
        <View style={styles.titleContainer}>
            <Text fontType="comfortaa" style={styles.titleTxt}>{title}</Text>
        </View>
    )
}

function HeaderRight() {
    return (
        <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={() => {
            }}>

                <FontIcon name="bars" size={20} style={styles.headerRight} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
    },
    headerLeftContainer: {

    },
    titleContainer: {

    },
    titleTxt: {
        fontSize: 16
    },
    headerRightContainer: {

    },
    headerRight: {
        marginRight: 20
    }
})