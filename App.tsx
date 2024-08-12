import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MovieList from './components/screens/MovieList';
import SplashScreen from 'react-native-splash-screen';
import {BotButton} from './components/CustomBot';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    position: 'relative',
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <MovieList />
        <BotButton />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
