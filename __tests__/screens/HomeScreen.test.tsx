import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
    NavigationContainer
} from '@react-navigation/native';

import {
    DrawerNavigator
} from '../../src/navigation/index';
import HomeScreen from '../../src/screens/HomeScreen';

describe('renders My Bill page component correctly', () => {

    test('renders Home page component', () => {
        const navigation = { navigate: jest.fn() };
        const route = {};

        const component = (
            <SafeAreaProvider>
                <HomeScreen navigation={navigation} route={route}></HomeScreen>
            </SafeAreaProvider>
        );

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })
})
