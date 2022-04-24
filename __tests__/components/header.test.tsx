import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

import Header from '../../src/components/Header';

describe('renders Header component correctly', () => {

    const headerType = ['headerHidden', 'onlyBackButton', 'BackButtonAndTitle', 'TitleAndDrawerMenu', 'onlyDrawerMenu', 'default'];

    it(`renders Header component type = "headerHidden"  correctly`, () => {
        const component = (<SafeAreaProvider>
            <Header type="headerHidden" />
        </SafeAreaProvider>);

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })

    it(`renders Header component type = "onlyBackButton"  correctly`, () => {
        const component = (<SafeAreaProvider>
            <Header type="onlyBackButton" />
        </SafeAreaProvider>)

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })

    it(`renders Header component type = "BackButtonAndTitle"  correctly`, () => {
        const component = (<SafeAreaProvider>
            <Header type="BackButtonAndTitle" />
        </SafeAreaProvider>)

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })

    it(`renders Header component type = "TitleAndDrawerMenu"  correctly`, () => {
        const component = (<SafeAreaProvider>
            <Header type="TitleAndDrawerMenu" />
        </SafeAreaProvider>)

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })

    it(`renders Header component type = "onlyDrawerMenu"  correctly`, () => {
        const component = (<SafeAreaProvider>
            <Header type="onlyDrawerMenu" />
        </SafeAreaProvider>)

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })

    it(`renders Header component type = "default"  correctly`, () => {
        const component = (<SafeAreaProvider>
            <Header type="default" />
        </SafeAreaProvider>)

        const dom = renderer.create(component).toJSON();
        expect(dom).toMatchSnapshot();
    })
});