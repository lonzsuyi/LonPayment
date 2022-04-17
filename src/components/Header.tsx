import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';

import { Text, View, FontIcon } from './Themed';


type HeaderProps = {
    type: 'headerHidden' | 'onlyBackButton' | 'BackButtonAndTitle' | 'TitleAndDrawerMenu' | 'onlyDrawerMenu' | 'default',
    openDrawer?: Function,
    navigation?: {
        goBack?: Function
    },
    options?: Object,
    route?: {
        name?: string
    },
    myHeaderStyle?: Object,
    myHeaderLeftStyle?: Object,
    myHeaderLeftTxtStyle?: Object,
    myHeaderTitleStyle?: Object,
    myHeaderTitleTxtStyle?: Object,
    myHeaderRightStyle?: Object,
    myHeaderRightTxtStyle?: Object,
}

export default function Header(props: HeaderProps) {

    const headerShow = props.type === 'headerHidden' ? false : true;
    const headerLeftShow = props.type === 'default' || props.type === 'onlyBackButton' || props.type === 'BackButtonAndTitle' ? true : false;
    const headerTitleShow = props.type === 'default' || props.type === 'BackButtonAndTitle' || props.type === 'TitleAndDrawerMenu' ? true : false;
    const headerRight = props.type === 'default' || props.type === 'TitleAndDrawerMenu' || props.type === 'onlyDrawerMenu' ? true : false;

    return (
        <View>
            {
                headerShow ? <View style={{ ...styles.header, ...props.myHeaderStyle }}>
                    {headerLeftShow ? <HeaderLeft {...props} /> : null}
                    {headerTitleShow ? <Title {...props} /> : null}
                    {headerRight ? <HeaderRight {...props} /> : null}
                </View> : null
            }
        </View>
    )
}

function HeaderLeft(props: HeaderProps) {
    return (
        <View style={{ ...styles.headerLeftContainer, ...props.myHeaderLeftStyle }}>
            <TouchableOpacity onPress={() => {
                props.navigation && props.navigation.goBack && props.navigation.goBack();
            }}>
                <FontIcon name="chevron-left" size={20} style={{ ...styles.headerLeft, ...props.myHeaderLeftTxtStyle }} />
            </TouchableOpacity>
        </View>
    )
}

function Title(props: HeaderProps) {
    let title: string = ''
    if (props.options && props.route && props.route.name) {
        title = getHeaderTitle(props.options, props.route.name);
    }

    return (
        <View style={{ ...styles.titleContainer, ...props.myHeaderTitleStyle }}>
            <Text fontType="comfortaa" style={{ ...styles.titleTxt, ...props.myHeaderTitleTxtStyle }}>{title}</Text>
        </View>
    )
}

function HeaderRight(props: HeaderProps) {
    return (
        <View style={{ ...styles.headerRightContainer, ...props.myHeaderRightStyle }}>
            <TouchableOpacity onPress={() => {
                props.openDrawer && props.openDrawer();
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
        position: 'absolute',
        left: 20
    },
    headerLeft: {
        fontSize: 24,
    },
    titleContainer: {
        marginHorizontal: 3
    },
    titleTxt: {
        fontSize: 18,
    },
    headerRightContainer: {
        position: 'absolute',
        right: 20
    },
    headerRight: {
        fontSize: 24,
    }
})