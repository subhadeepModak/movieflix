import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {BotSystem} from './components/CustomBot';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    position: 'relative',
  };

  const containerStyle = {
    backgroundColor: '#dadada',
    height: '100%',
    width: '100%',
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={backgroundStyle}>
            <View style={containerStyle} />
            <BotSystem
              // apiUrl={API_URL}
              extraParams={{session_id: 'NS', dealer_code: '14052'}}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
