import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btn: {
    height: 30,
    width: 'auto',
    minWidth: 50,
    paddingHorizontal: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 0.6,
  },
  active: {
    backgroundColor: 'grey',
  },
  text: {
    color: 'white',
    height: 'auto',
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: '600',
  },
});
