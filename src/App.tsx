import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Main from './views/Main';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Main />
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
