import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



export default {
  window: {
    width,
    height,
    headerHieght: 50,
    iosHeightOffest: Platform.OS === 'ios' ? -10 : 0
  },
  isSmallDevice: width < 375,
};
