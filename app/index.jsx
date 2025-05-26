import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import Colors from '../constant/Colors';
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "@/Config/firebaseConfig";
import { doc,getDoc } from "firebase/firestore";
import {useContext} from 'react'
import { userDetailContext } from "@/context/userDetailContext";

export default function Index() {

  const router = useRouter();
  const {userDetail, setUserDetail}=useContext(userDetailContext);
  onAuthStateChanged(auth, async(user)=>{
    if (user){  //checking if user is logged in or not
      console.log(user);
      const result = await getDoc(doc(db, 'users', user?.uid))
     
      setUserDetail(result.data())
      router.replace('/(tabs)/home')
    }
  })
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:Colors.WHITE,
      }}
    >
      <Image source={require('./../assets/images/landing.png')}
       
        style={{
          width: '100%',
          height: 300,
          marginTop: 70,
        }}
      />

      <View style={{
        backgroundColor:Colors.PRIMARY,
        padding:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'100%'
      }
      }>
        <Text style={{
          color:Colors.WHITE,
          fontSize:30,
          fontFamily:'outfit-bold',
          textAlign:"center"
        }}>Welcome to Apexdemy</Text>

        <Text style={{
          color:Colors.WHITE,
          fontSize:20,
          fontFamily:'outfit',
          textAlign:"center",
          paddingTop: 30,
        
        }}>
          Your one stop place to learn anything, with the help of AI
        </Text>
        <TouchableOpacity style={[style.button, {backgroundColor:Colors.WHITE}]}
         onPress={() => router.push('/auth/signUp')}
        >
        <Text style={style.buttonText}>
          Getting Started
        </Text>

        </TouchableOpacity>

        <TouchableOpacity style={[style.button, {backgroundColor:Colors.PRIMARY,
          borderWidth:1,
          borderColor:Colors.WHITE,


        }]}
        onPress={()=>router.push('auth/signIn')}
        >
        <Text style={[style.buttonText,{color:Colors.WHITE}]}>
          Already Have an account
        </Text>

        </TouchableOpacity>
       
      </View>

    
     
    </View>
  );
}

const style = StyleSheet.create({
  button : {
    padding:15,
    backgroundColor:Colors.WHITE,
    marginTop:20,
    borderRadius:10,
  },

  buttonText: {
    color:Colors.PRIMARY,
    textAlign:'center',
    fontSize:20,
    fontFamily:'outfit',
    textTransform:'capitalize'
  }
})