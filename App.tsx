import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MovieList from './components/screens/MovieList';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <MovieList />
    </SafeAreaView>
  );
}

export default App;
