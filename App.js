import React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/routers/Navigator';
import { Root } from 'native-base';

// dwQacYa21OI16ljYleVkrKyTQ43HIhiY

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </Root>
    </>
  );
};

export default App;
