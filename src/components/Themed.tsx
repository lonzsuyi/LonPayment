import React from 'react';
import { Text as DefaultText, View as DefaultView, TouchableOpacity } from 'react-native';
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

export type ViewProps = ThemeProps & DefaultView['props'];
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type FontIconProps = ThemeProps & React.ComponentProps<typeof DefaultFontIcon>
export function FontIcon(props: FontIconProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <DefaultFontIcon color={color} {...otherProps} />
}

export type Button = ThemeProps & TouchableOpacity['props'] & {
  name?: string,
  type?: 'primary' | 'normal'
}
export function Button(props: Button) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const baseStyle = {
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
  const stylesObj = {
    primary: {
      ...baseStyle,
      backgroundColor: Colors.common.primaryYellow,
      color: Colors.common.primaryBlack
    },
    normal: {
      ...baseStyle,
      borderWidth: 1,
      borderColor: color,
      color: color,
      backgroundColor
    }
  };
  const customStyles = props.type ? stylesObj[props.type] : stylesObj['normal'];
  
  return (
    <TouchableOpacity {...props}>
      <DefaultView style={[customStyles, style]} {...otherProps}>
        <DefaultText type="comfortaaBold" style={[customStyles, { borderWidth: 0, textAlign: 'center' }, style]} {...otherProps}>{props.name}</DefaultText>
      </DefaultView>
    </TouchableOpacity>
  )
}
