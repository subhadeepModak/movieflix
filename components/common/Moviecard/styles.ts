import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  labelContainer: {display: 'flex', height: 40},
  yearLabel: {
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
    fontSize: 24,
  },
  container: {
    backgroundColor: 'white',
    height: 250,
    width: '49%',
    borderRadius: 5,
    position: 'relative',
  },
  poster: {height: '100%', width: 'auto', borderRadius: 5},
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 2,
    backgroundColor: 'rgba(98, 107, 120, 0.3)',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratings: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
