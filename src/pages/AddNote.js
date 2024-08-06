import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
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
import {useDispatch} from 'react-redux';
import {addNotes} from '../reducers/reduxSlice';

const AddNote = () => {
  const [title, setTitle] = useState();
  const [desc, setdesc] = useState();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const [loading, setLoading] = useState(false);
  const onButtonClick = () => {
    setLoading(true);
    dispatch(
      addNotes({
        title,
        description: desc,
        date: new Date().toLocaleDateString(),
        id: Date.now(),
      }),
    );
    setTitle('');
    setdesc('');
    ToastAndroid.showWithGravity(
      'Added successfully....',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setLoading(false);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle, backgroundColor: backgroundColor}}>
        <Header title={'Add New'} />
        <Text style={styles.headerText}>Add New</Text>
        <TextInput
          value={title}
          placeholder="Add Title....."
          style={styles.inputStyle}
          onChangeText={setTitle}
        />
        <TextInput
          numberOfLines={5}
          value={desc}
          placeholder="Add Description....."
          style={styles.inputStyle}
          onChangeText={setdesc}
          multiline
        />
        <CustomButton
          title={'Add'}
          disabled={!title || !desc}
          onButtonClick={onButtonClick}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
    marginBottom: 20,
  },
  row: {
    padding: 20,
    // borderBottomWidth: 0.5,
    fontSize: 22,
    color: 'black',
  },
  backgroundStyle: {
    flex: 1,
    marginHorizontal: 30,
  },
  inputStyle: {
    borderWidth: 0.5,
    flex: 1,
    marginBottom: 30,
  },
});

export default AddNote;
