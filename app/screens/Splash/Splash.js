import React from 'react';
import { View } from 'react-native';
import Chel from '../../assets/images/chel.svg'
import s from './styles';

const SettingsPage = () => {
  return (
    <View style={s.settingsContainer}>
      <Chel width={200}/>
    </View>
  );
};

export default SettingsPage;