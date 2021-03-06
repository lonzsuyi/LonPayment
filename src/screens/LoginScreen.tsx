import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { RootDrawerScreenProps } from '../types/rootTypes';
import { AuthState } from '../types/authTypes';
import Colors from '../constants/Colors';
import { Text, View, TextInput, Button } from '../components/Themed';


type LoginScreenProps = RootDrawerScreenProps<'Login'> & {
    onLogin: (email: string, password: string) => void;
    authState: AuthState;
}

export default function LoginScreen({ navigation, onLogin, authState }: LoginScreenProps) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = useCallback(() => {
        onLogin(email, password);
    }, [onLogin, email, password]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginTitle}>
                <Text style={styles.loginTitleTxt} fontType="comfortaaBold">Login Your Account</Text>
            </View>
            <View style={styles.inputPanel}>
                <TextInput
                    width={300}
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email"
                />
            </View>
            <View style={styles.inputPanel}>
                <TextInput
                    width={300}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoComplete="password"
                    textContentType="password"
                    placeholder="Password"
                />
            </View>
            <View>
                <Button style={styles.loginAndRegisterBtn} width={300} name="Login" type="bgYAndTxtB" shape="rectangle" onPress={handleLogin} />
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
    loginTitle: {
        marginBottom: 100,
        backgroundColor: Colors.common.tintGray
    },
    loginTitleTxt: {
        fontSize: 28,
    },
    inputPanel: {
        marginBottom: 15
    },
    loginAndRegisterBtn: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});