import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useCallback } from 'react';

import { AuthState } from '../types/authTypes';

import Colors from '../constants/Colors';
import { Text } from './Themed';

type CustomDrawerContentProps = DrawerContentComponentProps & {
    onLogout: () => void;
    authState: AuthState;
    user: Realm.User | null
}

export default function CustomDrawerContent(props: CustomDrawerContentProps) {

    const { user, onLogout } = props;

    const handleLoginOut = useCallback(() => {
        onLogout();
    }, [user, onLogout]);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {
                props.user ? <DrawerItem
                    label={() => {
                        return <Text style={{ color: Colors.common.primaryYellow }}>LoginOut</Text>
                    }}
                    onPress={handleLoginOut}
                /> : null
            }
        </DrawerContentScrollView>
    )
}