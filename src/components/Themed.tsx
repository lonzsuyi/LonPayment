import React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import DefaultFontIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'] & {
  fontType?: 'comfortaa' | 'comfortaaBold' | 'roboto' | 'default'
};
export type ViewProps = ThemeProps & DefaultView['props'];
export type FontIconProps = ThemeProps & React.ComponentProps<typeof DefaultFontIcon>

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, fontType, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const fontFamilies = {
    comfortaaBold: "Comfortaa-Bold",
    comfortaa: "Comfortaa-Regular",
    roboto: "Roboto-Regular",
    default: "SpaceMono-Regular",
  };

  return <DefaultText style={[{ color }, { fontFamily: fontType ? fontFamilies[fontType] : fontFamilies['default'] }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function FontIcon(props: FontIconProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <DefaultFontIcon color={color} {...otherProps} />
}
