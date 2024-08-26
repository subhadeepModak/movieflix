import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../AuthContext/AuthContextProvider';
import {handleLogin} from '../components/CustomBot/constant';
const SignIn = ({navigation}: any) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

  const [hasError, setError] = useState(null);
  useEffect(() => {
    if (authState?.isSignedIn) {
      return navigation.navigate('Dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const submitHandler = () => {
    if (!formData.username || !formData.password) {
      setError('Please provide correct credentials.');
      return;
    }
    setIsLoginInProgress(true);

    return handleLogin(formData)
      .then(() => {
        setTimeout(() => {
          authDispatch({
            type: 'UPDATE_AUTHENTICATION_STATUS',
            payload: {
              isSignedIn: true,
              dealerCode: formData.username,
            },
          });
          setIsLoginInProgress(false);
        }, 2000);
      })
      .catch(e => {
        setIsLoginInProgress(false);
        return setError(e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'red', fontSize: 25, fontWeight: 'bold'}}>
          Mahindra{' '}
        </Text>
        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
          Finance
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '600',
            fontFamily: 'Helvetica',
          }}>
          DEALER BUDDY
        </Text>
        <TextInput
          style={styles.userInputStyle}
          onChangeText={text =>
            setFormData((prev: any) => ({...prev, username: text}))
          }
          placeholder="Username"
          value={formData.username}
        />
        <TextInput
          style={styles.passwordInputStyle}
          onChangeText={text =>
            setFormData((prev: any) => ({...prev, password: text}))
          }
          placeholder="Password"
          value={formData.password}
          secureTextEntry={true}
        />
        {hasError && <Text>{hasError}</Text>}
        <TouchableOpacity
          onPress={submitHandler}
          style={[
            styles.submitBtnStyle,
            isLoginInProgress ? {opacity: 0.7} : {},
          ]}
          delayPressOut={300}
          disabled={isLoginInProgress}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {isLoginInProgress ? '. . .' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: 'white'}}>Version 1.0.1</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'black',
    gap: 50,
  },
  formContainer: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'red',
    width: '75%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  userInputStyle: {
    borderRadius: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  passwordInputStyle: {
    borderRadius: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  submitBtnStyle: {
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    width: '100%',
    borderWidth: 1,
  },
});
