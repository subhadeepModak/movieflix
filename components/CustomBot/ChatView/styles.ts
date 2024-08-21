import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  user: {
    position: 'absolute',
    top: -22,
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  buddy: {
    color: 'red',
    fontWeight: '600',
  },
  container: {
    width: '100%',
    padding: 8,
    paddingTop: 20,
  },
  response: {
    maxWidth: '75%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: 'white',
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    maxWidth: '75%',
    marginLeft: '25%',
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderColor: '#dadada',
    borderWidth: 0.5,
    backgroundColor: 'white',
  },
  text: {
    padding: 5,
    color: 'black',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  loadingWrapper: {
    width: 120,
    padding: 20,
  },
  chatButtonStyle: {
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
    backgroundColor: 'red',
  },
  btnText: {color: '#fff', fontWeight: '500'},
  imageSt: {
    padding: 5,
    margin: 5,
    height: 150,
    width: 'auto',
    borderRadius: 5,
  },
});

export default styles;
