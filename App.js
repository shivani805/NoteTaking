import React, {useEffect, useRef} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/Header';
import Home from './src/pages/Home';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNote from './src/pages/AddNote';
import NotesList from './src/pages/NotesList';
import NoteDetails from './src/pages/NoteDetails';
import messaging from '@react-native-firebase/messaging';
import {requestPermission} from './src/utils';
import PushNotification, {Importance} from 'react-native-push-notification';
import {useDispatch} from 'react-redux';
import {openAppFromNotification} from './src/reducers/reduxSlice';

function App() {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();

  const navigationRef = useRef();
  let linking = {
    prefixes: ['mynotetaking.com/app'],
    config: {
      screens: {
        NoteDetails: `NoteDetails/${832748392}`,
      },
    },
  };

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification, 'props');
        // dispatch(openAppFromNotification(notification?.id));
        navigationRef?.current.navigate('NoteDetails', {
          id: notification.data?.messageId,
        });

        notification.finish(PushNotification.FetchResult?.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  }, []);
  // const getDeviceToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log(token, 'tokeen');
  // };

  // useEffect(() => {
  //   requestPermission();
  //   getDeviceToken();
  // }, []);

  // foreground
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('j;nklhni;kl', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoteList"
          component={NotesList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoteDetails"
          component={NoteDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
