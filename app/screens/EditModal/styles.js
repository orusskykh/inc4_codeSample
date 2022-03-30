import { StyleSheet } from 'react-native';
import Color from '../../theme/color';

export default StyleSheet.create({
  backButton: {
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
  saveButton: {
    marginTop: 10,
  },
  settingsContainerWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  settingsContainer: {
    height: '60%',
    width: '100%',
    backgroundColor: Color.whiteGrey,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    borderColor: Color.yellowMain,
    borderTopWidth: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInput: {
    borderColor: Color.yellowMain,
    borderWidth: 3,
    fontSize: 22,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: Color.white,
    shadowRadius: 5,
    shadowColor: Color.black,
    shadowOpacity: 0.1,
  },
});
