import {StyleSheet, Text, View} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={{marginBottom: 20, marginTop: 10}}>
      <Text style={styles.title}>{title || 'Note Taker'}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '700',
    color: '#22DD22',
  },
});
