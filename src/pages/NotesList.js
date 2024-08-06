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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import imggo from '../images/chevron.png';
import {SearchBar} from 'react-native-screens';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useState} from 'react';
const NotesList = props => {
  const {notes} = useSelector(state => state.persistReducer.reduxSlice);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [searchText, setSearchText] = useState('');

  const Onsearch = text => {
    setSearchText(text);
    const a = notes.filter(
      note =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.description.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredNotes([...a]);
  };

  const ListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.push('NoteDetails', {id: item.id})}
        style={styles.box}
        key={item.id}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Image source={imggo} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.timestamp}>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Header title={'Notes'} />
      <SearchInput
        onChangeText={Onsearch}
        style={styles.searchInput}
        placeholder="search by keyword"
        caseSensitive={false}
      />

      <FlatList
        data={filteredNotes && filteredNotes.length > 0 ? filteredNotes : []}
        keyExtractor={item => `item-${item.id}`}
        renderItem={({item}) => <ListItem item={item} />}
        ListEmptyComponent={<Text style={{margin: 30}}>No Notes added...</Text>}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
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
    marginLeft: 23,
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
    marginHorizontal: 30,
    borderBottomWidth: 1,
  },
});
