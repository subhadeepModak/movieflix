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
    padding: 8,
    paddingTop: 20,
  },
  response: {
    borderColor: 'sky',
    borderWidth: 0.5,
    maxWidth: '75%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: '#343538',
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    maxWidth: '75%',
    marginLeft: '25%',
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderColor: 'red',
    borderWidth: 0.5,
    backgroundColor: '#343538',
  },
  text: {
    padding: 5,
    color: 'white',
  },
  loadingWrapper: {
    width: 120,
    padding: 20,
  },
});

export default styles;
