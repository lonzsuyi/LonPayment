import React from 'react';
import {
    NavigationContainer
} from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';

import {
    DrawerNavigator
} from '../../src/navigation/index'

describe('Testing react navigation', () => {

    it('screen contains a title to the home page', async () => {
        const component = (<NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>);
        const { findByText } = render(component);
        const title = await findByText('Hi Guys! Welcome.');

        expect(title).toBeTruthy();
    })

    it('Click drawer menu to my my bills and any handle and back to home', async () => {
        const component = (<NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>);

        const { queryAllByTestId, findByTestId, findByText } = render(component);

        // On Drawer menu
        const menuBtn = await findByTestId('HeaderMenu');
        expect(menuBtn).toBeTruthy();
        fireEvent.press(menuBtn);

        // Press to myBill
        const mybillMenu = await findByText('MyBill');
        expect(mybillMenu).toBeTruthy();
        fireEvent.press(mybillMenu);

        // Check Bill list
        const BillListView = await findByTestId('BillList');
        expect(BillListView).toBeTruthy();

        // Open image
        const openBtn = queryAllByTestId('OnpenImage');
        expect(openBtn).toBeTruthy();

        // Close image
        const closeBtn = queryAllByTestId('CloseImagee');
        expect(closeBtn).toBeTruthy();

        // Popover
        const popover = queryAllByTestId('Popover');
        expect(popover).toBeTruthy();

        // On scroll
        const scroll = await findByTestId('Scroll');
        expect(scroll).toBeTruthy();

        // Back to home
        const backBtn = await findByTestId('HeaderBack');
        expect(backBtn).toBeTruthy();
        fireEvent.press(backBtn);

    });
});