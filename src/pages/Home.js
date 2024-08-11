import React, {useEffect, useState} from 'react';
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
import netinfo from '@react-native-community/netinfo';

const Home = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colors} = useTheme();
  const [isConnected, setIsConnected] = useState(false);

  const onClickAdd = () => {
    props.navigation.push('AddNote');
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(colors.background);
    }, []),
  );

  useEffect(() => {
    const unsubscribe = netinfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={{...styles.backgroundStyle}}>
        <NotesList {...props} isConnected={isConnected} />
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
    paddingHorizontal: 20,
  },
});
