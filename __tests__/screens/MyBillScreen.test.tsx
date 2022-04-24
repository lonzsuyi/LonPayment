import React from 'react';
import renderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { render, fireEvent } from '@testing-library/react-native';

import MyBillScreen, { BillItem } from '../../src/screens/MyBillScreen';
import { BillStatusEnum } from '../../src/types/billTypes';

describe('renders My Bill page component correctly', () => {

    it('renders component', () => {
        const navigation = { navigate: jest.fn() };
        const route = {};

        const component = (
            <SafeAreaProvider>
                <MyBillScreen navigation={navigation} route={route}></MyBillScreen>
            </SafeAreaProvider >
        );

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    });

    it('renders Bill Item component', async () => {
        const component = (<BillItem item={{
            id: 1,
            thumbnail: 'https://www.originenergy.com.au/wp-content/uploads/content_origin-how-to-read-bill_nsw-other_page-1_2020-06_02.png',
            image: 'https://www.originenergy.com.au/wp-content/uploads/content_origin-how-to-read-bill_nsw-other_page-1_2020-06_02.png',
            date: new Date(),
            amount: 55,
            status: BillStatusEnum.Paid
        }} width={10} height={10}></BillItem>);

        const { queryAllByTestId } = render(component);
        const openBtn = queryAllByTestId('OnpenImage');
        expect(openBtn).toBeTruthy();

        // Close image
        const closeBtn = queryAllByTestId('CloseImagee');
        expect(closeBtn).toBeTruthy();

        // Popover
        const popover = queryAllByTestId('Popover');
        expect(popover).toBeTruthy();

    });

})
