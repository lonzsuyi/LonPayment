import React, { useState, useCallback } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { RootDrawerScreenProps } from '../types/rootTypes';
import { Button, Text, TextInput, View } from '../components/Themed';

import { AuthState } from '../types/authTypes';
import Colors from '../constants/Colors';

type RegisterScreenProps = RootDrawerScreenProps<'Register'> & {
    onRegister: (email: string, password: string) => void;
    authState: AuthState;
}

export default function RegisterScreen({ navigation, onRegister, authState }: RegisterScreenProps) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleRegister = useCallback(() => {
        onRegister(email, password);
    }, [onRegister, email, password]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.registerTitle}>
                <Text style={styles.registerTitleTxt} fontType="comfortaaBold">Create an account</Text>
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
                <Button style={styles.loginAndRegisterBtn} width={300} name="Register" type="bgYAndTxtB" shape="rectangle" onPress={handleRegister} />
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
    registerTitle: {
        marginBottom: 50,
        backgroundColor: Colors.common.tintGray
    },
    registerTitleTxt: {
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