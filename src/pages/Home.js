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
import NotesList from './NotesList';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import React from 'react';

const Home = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const {colors} = useTheme();
  const onClickAdd = () => {
    props.navigation.push('AddNote');
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(colors.background);
    }, []),
  );
  return (
    <SafeAreaView style={{flex: 1, marginBottom: 30}}>
      <StatusBar barStyle={isDarkMode ? Colors.darker : Colors.lighter} />

      <Header />
      <Pressable
        onPress={onClickAdd}
        style={{
          borderBottomWidth: 0.5,
          borderColor: isDarkMode ? 'white' : 'grey',
        }}>
        <Text style={{...styles.row, color: colors.text}}>Add New +</Text>
      </Pressable>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle}}>
        <NotesList {...props} />
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
