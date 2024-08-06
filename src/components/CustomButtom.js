import {Button, StyleSheet} from 'react-native';

const CustomButton = ({onButtonClick, title, disabled}) => {
  return (
    <Button
      onPress={onButtonClick}
      title={title}
      style={styles.buttonStyle}
      color={'#22DD22'}
      disabled={disabled}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    background: '#22DD22',
    padding: 40,
  },
});
