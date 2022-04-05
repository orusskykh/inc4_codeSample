import { StyleSheet } from 'react-native';
import Color from '../../theme/color';

export default StyleSheet.create({
  mainScreenContainer: {
    flex: 1,
    backgroundColor: Color.whiteGrey,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: Color.yellowMain,
    padding: 10,
    borderRadius: 50,
  },
  plaidButton: {
    backgroundColor: Color.yellowMain,
    padding: 10,
    borderRadius: 50,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
