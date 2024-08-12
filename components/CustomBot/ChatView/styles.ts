import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  user: {
    position: 'absolute',
    top: -15,
    color: 'red',
    fontSize: 10,
  },
  container: {
    width: '100%',
    display: 'flex',
    gap: 5,
    marginTop: 15,
    height: '100%',
  },
  response: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    borderColor: 'sky',
    borderWidth: 1,
    maxWidth: '70%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  question: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: '20%',
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 5,
  },
  text: {
    padding: 5,
  },
});

export default styles;
