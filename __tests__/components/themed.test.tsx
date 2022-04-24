import React from 'react';
import renderer from 'react-test-renderer';

import { View, Text, FontIcon, Button } from '../../src/components/Themed';



describe('Renders UI compoents', () => {
    it('renders View component correctly', () => {
        const dom = renderer.create(<View></View>).toJSON();
        expect(dom).toMatchSnapshot();
    });

    it('renders Text component correctly', () => {
        const dom = renderer.create(<Text></Text>).toJSON();
        expect(dom).toMatchSnapshot();
    });

    it('renders FontIcon component correctly', () => {
        const dom = renderer.create(<FontIcon name="money" size={10} />).toJSON();
        expect(dom).toMatchSnapshot();
    });

    it('renders Button component correctly', () => {
        const dom = renderer.create(<Button />).toJSON();
        expect(dom).toMatchSnapshot();
    });

})