import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen, {HomeScreenParam} from './Home';
import ProfileScreen, {ProfileScreenParam} from './Profile';
import TodoDetail, {TodoDetailParam} from './TodoDetail';

const Stack = createNativeStackNavigator<
  HomeScreenParam & ProfileScreenParam & TodoDetailParam
>();

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen {...HomeScreen.screen} />
      <Stack.Screen {...ProfileScreen.screen} />
      <Stack.Screen {...TodoDetail.screen} />
    </Stack.Navigator>
  );
}

export default Main;
