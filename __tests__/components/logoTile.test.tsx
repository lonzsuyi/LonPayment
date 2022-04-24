import React from 'react';
import renderer from 'react-test-renderer';

import LogoTtitle from '../../src/components/LogoTitle';

test('renders LogoTitle component correctly', () => {
    const logoTtitle = renderer.create(<LogoTtitle iconSize={10} titleSize={10} />).toJSON();
    expect(logoTtitle).toMatchSnapshot();
});