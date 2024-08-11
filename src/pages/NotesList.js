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
import imggo from '../images/share.png';
import SearchInput from 'react-native-search-filter';

import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';

const NotesList = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const {notes} = useSelector(state => state.persistReducer.reduxSlice);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [searchText, setSearchText] = useState('');
  const {colors} = useTheme();

  const Onsearch = text => {
    setSearchText(text);
    const a = notes.filter(
      note =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.description.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredNotes([...a]);
  };

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes.length]);

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
          {new Date(item?.reminder).toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchInput
        onChangeText={Onsearch}
        style={{
          ...styles.searchInput,
          borderColor: isDarkMode ? 'white' : 'grey',
          color: colors.text,
        }}
        placeholder="search by keyword"
        caseSensitive={false}
      />

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
});
