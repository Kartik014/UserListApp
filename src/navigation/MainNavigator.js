import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import signUp from '../screens/SignUp';
import logIn from '../screens/LogIn';
import UserList from '../screens/userList';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={logIn} />
        <Stack.Screen name="SignUp" component={signUp} />
        <Stack.Screen name="UserList" component={UserList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;