/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types/rootTypes';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          MyBill: {
            screens: {
              MyBillScreen: 'mybill',
            },
          },
          Login: {
            screens: {
              LoginScreen: 'login'
            }
          },
          Register: {
            screens: {
              RegisterScreen: 'register'
            }
          },
          HelpCenter: {
            screens: {
              HelpCenterScreen: 'helpcenter'
            }
          }
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
