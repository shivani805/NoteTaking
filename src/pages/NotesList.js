import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import imggo from '../images/share.png';
import SearchInput from 'react-native-search-filter';
import calendar from '../images/calendar1.png';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

const NotesList = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const {notes} = useSelector(state => state.persistReducer.reduxSlice);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [openCalender, setOpenCalender] = useState(false);
  const {colors} = useTheme();
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('Keyword');
  const Onsearch = text => {
    const a = notes.filter(
      note =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.description.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredNotes([...a]);
  };

  const onClickFilter = () => {
    setOpenCalender(!openCalender);
  };

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes.length]);

  const onChangeDate = (event, date) => {
    const a = notes.filter(
      note =>
        new Date(note.reminder).toLocaleDateString() ===
        new Date(date).toLocaleDateString(),
    );
    setOpenCalender(false);
    setDate(date);
    setFilteredNotes([...a]);
  };

  const data = [
    {label: 'Date', value: 'Date'},
    {label: 'Keyword', value: 'Keyword'},
  ];

  const ListItem = ({item, id}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.push('NoteDetails', {id: item.id})}
        style={{...styles.box, borderColor: isDarkMode ? 'white' : 'grey'}}
        key={item.id}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{...styles.title, color: colors.text, maxWidth: 100}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <Image source={imggo} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item?.reminder).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {value === 'Keyword' && (
          <SearchInput
            onChangeText={Onsearch}
            style={{
              ...styles.searchInput,
              borderColor: isDarkMode ? 'white' : 'grey',
              color: colors.text,
            }}
            placeholder={`search by ${value}`}
            caseSensitive={false}
          />
        )}
        {value === 'Date' && (
          <Pressable
            onPress={() => onClickFilter()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={calendar} />
            <Text style={{marginLeft: 5}}>
              {!date ? 'dd/mm/yyyy' : new Date(date).toLocaleDateString()}
            </Text>
          </Pressable>
        )}
        {openCalender && value === 'Date' && (
          <RNDateTimePicker mode="date" value={date} onChange={onChangeDate} />
        )}
        <Dropdown
          style={[styles.dropdown]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by'}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
      </View>

      <FlatList
        data={filteredNotes && filteredNotes.length > 0 ? filteredNotes : []}
        keyExtractor={item => `item-${item.id}`}
        renderItem={({item}, id) => <ListItem item={item} id={id} />}
        ListEmptyComponent={<Text style={{margin: 30}}>No Notes added...</Text>}
        horizontal
        showsHorizontalScrollIndicator={false}
        refreshing
        // extraData={props.isConnected}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'space-between',
        }}
      />
    </SafeAreaView>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  box: {
    borderWidth: 0.3,
    padding: 10,
    width: 133,
    marginTop: 24,
    borderRadius: 12,
    height: 124,
    overflow: 'hidden',
  },
  timestamp: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 10,
    marginTop: 'auto',
  },
  description: {
    fontSize: 13,
    marginTop: 10,
  },
  backgroundStyle: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  searchInput: {
    borderBottomWidth: 1,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 122,
  },
  itemTextStyle: {
    color: 'black',
  },
});
