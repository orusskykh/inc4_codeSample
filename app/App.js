/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import store from './models/store';

import { Provider } from 'react-redux';
import MobileContainer from './containers/mobileContainer';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
          <MobileContainer/>
      </Provider>
    </View>
  );
};

export default App;
