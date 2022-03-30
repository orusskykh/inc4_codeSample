import {StyleSheet} from 'react-native';
import Color from '../../theme/color';
export default StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    with: '100%',
    borderRadius: 6,
    backgroundColor: Color.white,
    marginBottom: 10,
    shadowRadius: 10,
    shadowColor: Color.black,
    shadowOpacity: 0.2,
    padding: 20,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  rightWrapper: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    fontSize: 22,
  },

});