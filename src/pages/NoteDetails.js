import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header';
import CustomButton from '../components/CustomButtom';
import {useDispatch, useSelector} from 'react-redux';
import deleteImg from '../images/trash-can-bin.png';
import {addNotes, deleteNote} from '../reducers/reduxSlice';

const NoteDetails = props => {
  const {notes} = useSelector(state => state.persistReducer.reduxSlice);
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const item = notes.find(item => item.id === props.route.params.id);
  console.log(props.route.params.id, notes);

  const onDelete = () => {
    dispatch(
      deleteNote(notes.filter(item => item.id !== props.route.params.id)),
    );
    return props.navigation.push('NoteList');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Header title={'Notes'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          ...styles.backgroundStyle,
          backgroundColor: backgroundColor,
        }}
        contentContainerStyle={{flex: 1}}>
        <Pressable onPress={onDelete}>
          <Image source={deleteImg} style={styles.deleteLogo} />
        </Pressable>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.desc}>{item?.description}</Text>
        <Text style={styles.date}>
          Reminder : {new Date(item?.reminder).toLocaleTimeString()}
        </Text>
        <Text style={styles.date}>created : {item?.created}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: '500',
  },
  desc: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    flexGrow: 1,
    lineHeight: 25,
  },
  date: {
    marginTop: 'auto',
    marginBottom: 28,
    alignSelf: 'flex-end',
  },
  deleteLogo: {
    textAlign: 'right',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    width: 20,
    height: 24,
  },
});
