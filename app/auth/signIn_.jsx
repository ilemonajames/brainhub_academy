import React from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ToastAndroid } from 'react-native';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth } from './../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from'react';
import { getDoc } from 'firebase/firestore';
import userDetailContext from '../../context/userDetailContext';

export default function signIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userDetail , setUserDetail} = useContext(userDetailContext); // userDetail context
  const [loading, setLoading]= useState(false); // to show the loading icon

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
     .then( async (resp) => {
     const user = resp.user;
       
       // await getUserDetails(user.uid);
       console.log(user.email + ' User signed in successfully');
       await getUserDetail();
       setLoading(false);
       router.replace('/(tabs)/home') //replace instead of push so it doesn't go to previous page
       // router.push('home');
      })
     .catch((error) => {
        console.log('Error signing in:', error);
        ToastAndroid.show('Invalid email or password', {
          duration: ToastAndroid.SHORT,
          backgroundColor: Colors.RED,
          position: ToastAndroid.BOTTOM,
      });
        setLoading(false);  // setloading call
      });
      
  };
  const getUserDetail= async()=>{ //get user detail function
        const result = await getDoc(doc(db, 'users', user.uid));
        console.log(result.data())
        setUserDetail(result.data) // setting user detail
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>
          Welcome Back
        </Text>
        <View style={styles.inputContainer}>
         
        <TextInput placeholder='Enter Email' style={styles.TextInput} value={email} onChangeText={setEmail} />
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.TextInput} value={password} onChangeText={setPassword} />
       
        <TouchableOpacity style={styles.submitButton} 
        onPress={onSignInClick}
        disabled={loading} /* disable button while loading is true */> 
          {loading?
          <Text style={styles.submitButtonText}>Submit</Text>:
          <ActivityIndicator size={'large'} color={Colors.WHITE} /> /* loading icon */
          }
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
    fontStyle:'bold'
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
