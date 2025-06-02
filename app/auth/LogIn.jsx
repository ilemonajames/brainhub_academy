import React from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth } from './../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';


export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user.email + ' User signed in successfully');
        // await getUserDetails(user.uid);
        router.push('home');
      })
      .catch((error) => {
        console.log('Error signing in:', error);
        ToastAndroid.show('Invalid email or password', {
          duration: ToastAndroid.SHORT,
          backgroundColor: Colors.RED,
          position: ToastAndroid.BOTTOM,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./../../assets/images/logo-dark.png')} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>
          Welcome Back
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Enter Email'
            style={styles.TextInput}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            style={styles.TextInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSignInClick}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size='small' color={Colors.WHITE} />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Don't have an Account ? </Text>
        <Pressable style={styles.signInPressable} onPress={() => router.push('auth/signUp')}>
          <Text style={styles.signInText}>Create New Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    paddingTop: 100,
    flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 20,
    fontWeight: 'bold', // Use fontWeight instead of fontStyle for bold text
  },
  inputContainer: {
    marginTop: 20,
  },
  TextInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontFamily: 'outfit',
    fontSize: 16, // Increased font size for better readability
    marginTop: 15,
    borderColor: Colors.PRIMARY,
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16, // Increased font size for better readability
  },
  accountTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
  accountText: {
    fontFamily: 'outfit',
  },
  signInPressable: {
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
  },
});
