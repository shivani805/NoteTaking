import React, {useEffect} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNote from './src/pages/AddNote';
import NotesList from './src/pages/NotesList';
import NoteDetails from './src/pages/NoteDetails';
import messaging from '@react-native-firebase/messaging';
import {requestPermission} from './src/utils';
import PushNotification, {Importance} from 'react-native-push-notification';

function App() {
  const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
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
