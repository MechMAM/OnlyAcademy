/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './src/App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/provider/AuthProvider';

export default function Main() {
  return (
    <PaperProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
