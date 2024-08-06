import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import Header from '../components/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Home = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  const onClickAdd = () => {
    props.navigation.push('AddNote');
  };

  const onClickList = () => {
    props.navigation.push('NoteList');
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
        <Header />
        <Pressable onPress={onClickAdd} style={{borderBottomWidth: 0.5}}>
          <Text style={styles.row}>Add Note +</Text>
        </Pressable>
        <Pressable onPress={onClickList} style={{borderBottomWidth: 0.5}}>
          <Text style={styles.row}>Notes</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  row: {
    padding: 20,
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
  },
  backgroundStyle: {
    flex: 1,
    marginHorizontal: 30,
  },
});
