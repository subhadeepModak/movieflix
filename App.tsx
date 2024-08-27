import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {BotSystem} from './components/CustomBot';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './Screens/Dashboard';
import SignIn from './Screens/SignIn';
import AuthContextProvider from './AuthContext/AuthContextProvider';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <AuthContextProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
              </Stack.Navigator>
            </NavigationContainer>
            <BotSystem />
          </AuthContextProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
