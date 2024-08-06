/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store, {persistor} from './src/reducers/reduxStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const MainApp = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App {...props} />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
