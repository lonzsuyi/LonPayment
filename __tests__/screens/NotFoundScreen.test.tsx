import React from 'react';
import renderer from 'react-test-renderer';

import NotFoundScreen from '../../src/screens/NotFoundScreen';

test('renders Not Found page component', () => {
    const navigation = { navigate: jest.fn() };
    const route = {};

    const component = (< NotFoundScreen navigation={navigation} route={route}></ NotFoundScreen>)

    const dom = renderer.create(component).toJSON();
    expect(dom).toMatchSnapshot();
})

