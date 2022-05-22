/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import ReactNativeBiometrics from 'react-native-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  TextInput,
  Button,
  payload,

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

function register() {
  ReactNativeBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload: payload
  })
    .then((resultObject) => {
      const { success, signature } = resultObject

      if (success) {
        console.log(signature)
        //verifySignatureWithServer(signature, payload)
      }
    });
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()


  const [text, onChangeText] = React.useState("");


  const [NameLogin, setNameLogin] = useState('');
  const [FirstNameLogin, setFirstNameLogin] = useState('');

  const [NameRegister, setNameRegister] = useState('');
  const [FirstNameRegister, setFirstNameRegister] = useState('');



  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(key + " : " + value);
    } catch (error) {
      // Error saving data
    }
  };


  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        // value previously stored
        return value
      }
    } catch (e) {
      // error reading value
    }
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View title="login">
          <Text style={styles.titre}>Login</Text>

          <TextInput
            placeholder='Prénom'
            value={NameLogin}
            onChangeText={(text) => setNameLogin(text)}
            style={styles.input}
          />
          <TextInput
            placeholder='Nom'
            value={FirstNameLogin}
            onChangeText={(text) => setFirstNameLogin(text)}
            style={styles.input}
          />
          <Button
            onPress={async () => {

              let name = await getData('name');
              let firstname = await getData('firstname');
              setNameLogin(name)
              setFirstNameLogin(firstname)
              register(alert('Your was logg'))
            }}
            title="Login"
          />
        </View>

        <View title="Register">
          <Text style={styles.titre}>Register</Text>

          <TextInput
            style={styles.input}
            onChangeText={(text) => setNameRegister(text)}
            value={NameRegister}
            placeholder="Prénom"

          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFirstNameRegister(text)}
            value={FirstNameRegister}
            placeholder="Nom"
          />
          <Button
            onPress={() => {
              _storeData("name", NameRegister);
              _storeData("firstname", FirstNameRegister)
              //                console.log(NameRegister)
              //                console.log(FirstNameRegister)
            }}
            title="Save"

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;