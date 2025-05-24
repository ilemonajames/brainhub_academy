import React, { useState, useContext } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth, db } from './../../Config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {userDetailContext} from '../../context/userDetailContext'

export default function SignUp() { // Changed to PascalCase for component name
  const router = useRouter();
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {userDetail, setUserDetail} = useContext(userDetailContext);

  const CreateNewAccount = () => {
    // Basic validation
    if (!fullName.trim() || !email.trim() || !password) {
      alert('Please fill all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await saveUser(user);
        alert('Account created successfully!');
        router.push('auth/signIn');
      })
      .catch((error) => {
        console.error('Signup error:', error);
        let errorMessage = 'Signup failed';
        
        // More specific error messages
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email is already in use';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters';
        }
        
        alert(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const saveUser = async (user) => {
    const data = {
      name: fullName,
            email: email,
            member: false,
            uid: user.uid
    }
    try {
      await setDoc(doc(db, 'users', user.uid), // use id as document
      data);
      setUserDetail(data); //called the setUserDetail function(Isaac)


    } catch (error) {
      console.error('Error saving user:', error);
      throw error; // Re-throw to handle in the calling function
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>Create New Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='Enter Full name' 
          onChangeText={setFullname} 
          value={fullName}
          style={styles.TextInput} 
        />
        <TextInput 
          placeholder='Enter Email' 
          onChangeText={setEmail} 
          value={email}
          style={styles.TextInput} 
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput 
          placeholder='Password' 
          onChangeText={setPassword} 
          value={password}
          secureTextEntry={true} 
          style={styles.TextInput} 
        />
        <TouchableOpacity 
          onPress={CreateNewAccount} 
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.WHITE} />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.accountTextContainer}>
        <Text style={styles.accountText}>Already Have an Account?</Text>
        <Pressable style={styles.signInPressable} onPress={() => router.push('auth/signIn')}>
          <Text style={styles.signInText}>Sign in</Text>
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
  },
  inputContainer: {
    marginTop: 20,
    width: '80%', // Adjust width as necessary
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
