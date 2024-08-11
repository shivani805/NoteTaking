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
import deleteImg from '../images/delete.png';
import editImg from '../images/edit.png';
import {addNotes, deleteNote} from '../reducers/reduxSlice';
import {useTheme} from '@react-navigation/native';

const NoteDetails = props => {
  const {notes} = useSelector(state => state.persistReducer.reduxSlice);
  const item = notes.find(item => item.id === props.route.params.id);
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {colors} = useTheme();
  const onDelete = () => {
    dispatch(
      deleteNote(notes.filter(item => item.id !== props.route.params.id)),
    );
    return props.navigation.push('Home');
  };
  const onEdit = () => {
    props.navigation.push('AddNote', {id: props.route.params.id});
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header title={'Notes'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          ...styles.backgroundStyle,
        }}
        contentContainerStyle={{flex: 1}}>
        <View
          style={{
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <Pressable onPress={onEdit}>
            <Image source={editImg} style={styles.deleteLogo} />
          </Pressable>
          <Pressable onPress={onDelete} style={{marginTop: 10}}>
            <Image source={deleteImg} style={styles.deleteLogo} />
          </Pressable>
        </View>
        <Text style={{...styles.title, color: colors.text}}>{item?.title}</Text>
        <Text style={{...styles.desc, color: colors.text}}>
          {item?.description}
        </Text>
        <Text style={{...styles.date, color: colors.notification}}>
          Reminder : {new Date(item?.reminder).toLocaleTimeString()}
        </Text>
        <Text style={{...styles.date, color: colors.text}}>
          created : {item?.created}
        </Text>
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
    height: 24,
  },
});
