import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../AuthContext/AuthContextProvider';

const Dashboard = ({navigation}: any) => {
  const [_, authDispatch] = useContext(AuthContext);

  const handleLogout = () => {
    console.log('logged out');
    authDispatch({
      type: 'UPDATE_AUTHENTICATION_STATUS',
      payload: {
        isSignedIn: false,
        dealerCode: null,
      },
    });
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Pressable onPress={handleLogout} style={styles.btnStyle}>
          <Text style={styles.text}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  btnStyle: {
    position: 'absolute',
    top: 10,
    right: 20,
    fontSize: 18,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',

    backgroundColor: '#dedede',
  },
  text: {
    color: 'red',
    padding: 5,
    fontWeight: 'bold',
  },
});
