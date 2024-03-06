import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './Home';

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default Main;
