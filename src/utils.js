import {PermissionsAndroid} from 'react-native';

export const requestPermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.error('permission reuestt');
    return 'permission requested';
  } catch (err) {
    console.error('error in requesting permission', err);
    return undefined;
  }
};
