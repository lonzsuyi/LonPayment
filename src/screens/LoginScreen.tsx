import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TextInput } from 'react-native';

import { RootDrawerScreenProps } from '../types/rootTypes';
import { Text, View, Button, FontIcon } from '../components/Themed';

export default function LoginScreen({ navigation }: RootDrawerScreenProps<'Login'>) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = useCallback((email: string, password: string) => { }, [email, password])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email"
                />
            </View>
            <View>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoComplete="password"
                    textContentType="password"
                    placeholder="Password"
                />
            </View>
            <View>

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
});