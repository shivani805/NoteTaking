import React, {useEffect, useState} from 'react';
import {
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
import {addNotes, editNote} from '../reducers/reduxSlice';
import PushNotification, {Importance} from 'react-native-push-notification';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const AddNote = props => {
  const editId = props.route.params?.id;
  const [title, setTitle] = useState();
  const [desc, setdesc] = useState();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const {notes} = useSelector(state => state.persistReducer.reduxSlice);
  const [loading, setLoading] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);
  const [date, setDate] = useState(new Date());

  const onButtonClick = () => {
    setLoading(true);
    const uniqueId = Math.random().toString(16).slice(2);
    dispatch(
      addNotes({
        title,
        description: desc,
        created: new Date().toLocaleDateString(),
        id: uniqueId,
        reminder: date,
      }),
    );
    PushNotification.localNotificationSchedule({
      message: title, // (required)
      date: date, // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      channelId: 'channel-id-note',
      data: {
        messageId: uniqueId,
      },
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
    setLoading(false);
    setTitle('');
    setdesc('');
    setDate(new Date());
    ToastAndroid.showWithGravity(
      'Added successfully....',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const onUpdate = () => {
    setLoading(true);
    dispatch(
      editNote({
        title,
        description: desc,
        reminder: date,
        id: editId,
      }),
    );
    PushNotification.localNotificationSchedule({
      message: title, // (required)
      date: date, // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      channelId: 'channel-id-note',
      data: {
        messageId: editId,
      },
      /* Android Only Properties */
      repeatTime: 2, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });

    setLoading(false);
    setTitle('');
    setdesc('');
    setDate(new Date());
    ToastAndroid.showWithGravity(
      'updated successfully....',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const onChange = (event, date) => {
    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;
    console.log(event, date);
    setDate(date);
    setOpenCalender(false);
  };

  function unixTime(time) {
    var u = new Date(time);
    return (
      time?.getFullYear() +
      '-' +
      ('0' + (time?.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + time?.getDate()).slice(-2) +
      ' ' +
      ('0' + time?.getHours()).slice(-2) +
      ':' +
      ('0' + time?.getMinutes()).slice(-2) +
      ':' +
      ('0' + time?.getSeconds()).slice(-2) +
      '.' +
      (time?.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
    );
  }

  useEffect(() => {
    if (editId) {
      const item = notes.find(item => item.id === editId);
      setTitle(item.title);
      setdesc(item.description);
      setDate(new Date(item.reminder));
    }
  }, [editId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      {openCalender && (
        <RNDateTimePicker
          mode="time"
          value={date}
          onChange={onChange}
          // timeZoneOffsetInSeconds={3600}
          // imeZoneOffsetInMinutes={60}
          // dateFormat="dayofweek day month"
        />
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle, backgroundColor: backgroundColor}}>
        <Header title={'Add New'} />
        <View style={{marginTop: 30}}>
          <TextInput
            value={title}
            placeholder="Add Title....."
            style={styles.inputStyle}
            onChangeText={setTitle}
          />
        </View>
        <TextInput
          numberOfLines={5}
          value={desc}
          placeholder="Add Description....."
          style={styles.inputStyle}
          onChangeText={setdesc}
          multiline
        />
        <Pressable onPress={() => setOpenCalender(true)}>
          <TextInput
            value={unixTime(date).toString()}
            placeholder="Set Reminder"
            style={styles.inputStyle}
            readOnly
            inputMode="number"
          />
        </Pressable>
        <CustomButton
          title={'Add'}
          disabled={!title || !desc}
          onButtonClick={!editId ? onButtonClick : onUpdate}
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
