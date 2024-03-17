import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, SafeAreaView} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableBatchedStateUpdates} from './utils/BatchedSetState';
import Main from './views/Main';

if (!__DEV__) {
  enableBatchedStateUpdates();
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <Main />
          </SafeAreaView>
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
