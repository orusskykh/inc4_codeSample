import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home/Home';
import EditModal from '../screens/EditModal/EditModal';
import SplashScreen from '../screens/Splash/Splash';
import ScanModal from '../screens/ScanModal/ScanModal';
import { getTasks } from '../models/tasks/actions';

const Stack = createStackNavigator();

const mapStateToProps = ({ task }) => {
  const {
    isLoading,
  } = task;

  return { isLoading };
};

const mapDispatchToProps = (dispatch, props) => ({
  getTasks: () => getTasks(dispatch),
});

const mobileContainer = ({ isLoading, getTasks }) => {
  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) {
    return (
      <SplashScreen />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="EditModal"
            component={EditModal}
            options={{
              headerShown: false,
              cardStyle: {
                backgroundColor: 'transparent',
                opacity: 0.99,
              },
            }}
          />
          <Stack.Screen
            name="ScanModal"
            component={ScanModal}
            options={{
              headerShown: false,
              cardStyle: {
                backgroundColor: 'transparent',
                opacity: 0.99,
              },
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MobileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(mobileContainer);

export default MobileContainer;
