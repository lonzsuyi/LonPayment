import React from 'react';
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
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

export type Button = ThemeProps & (TouchableOpacity['props'] | DefaultView['props'] | DefaultText['props']) & {
  width?: number,
  name?: string,
  shape?: 'circle' | 'rectangle'
  type?: 'primary' | 'normal' | 'bgYAndTxtW' | 'bgWAndTxtB' | 'bgYAndTxtB'
}
export function Button(props: Button) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const baseStyle = {
    borderRadius: props.shape && props.shape === 'rectangle' ? 5 : 50,
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
    },
    bgYAndTxtW: {
      ...baseStyle,
      borderWidth: 1,
      borderColor: Colors.common.white,
      color: Colors.common.white,
      backgroundColor: Colors.common.primaryYellow
    },
    bgWAndTxtB: {
      ...baseStyle,
      borderWidth: 1,
      borderColor: Colors.common.white,
      color: Colors.common.primaryBlack,
      backgroundColor: Colors.common.white,
    },
    bgYAndTxtB: {
      ...baseStyle,
      borderWidth: 1,
      borderColor: Colors.common.primaryYellow,
      color: Colors.common.primaryBlack,
      backgroundColor: Colors.common.primaryYellow,
    }
  };
  const customStyles = props.type ? stylesObj[props.type] : stylesObj['normal'];

  return (
    <TouchableOpacity {...props}>
      <DefaultView style={[customStyles, { width: props.width }, style]} {...otherProps}>
        <Text fontType='comfortaaBold' style={[customStyles, { borderWidth: 0, textAlign: 'center' }, style]} {...otherProps}>{props.name}</Text>
      </DefaultView>
    </TouchableOpacity>
  )
}

export type TextInput = ThemeProps & DefaultTextInput['props'] & {
  width?: number,
}
export function TextInput(props: TextInput) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultTextInput style={[{
    width: props.width,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.common.primaryYellow,
    color: Colors.common.primaryBlack,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa-Bold',
    paddingHorizontal: 10,
    paddingVertical: 15
  }, style]} {...otherProps} />
}
