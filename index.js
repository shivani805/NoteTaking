import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store, {persistor} from './src/reducers/reduxStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {useEffect} from 'react';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

// messaging().getInitialNotification(async remoteMessage => {
//   console.log('Message handled in the kill state!', remoteMessage);
// });

const MainApp = props => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id-note', // (required)
        channelName: 'NoteTaking', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App {...props} />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
