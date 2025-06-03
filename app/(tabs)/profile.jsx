import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors'
import ProfileMenu from '../../constant/Option'
import { userDetailContext } from '../../context/userDetailContext'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../Config/firebaseConfig'

export default function Profile() {
  const {userDetail, setUserDetail}=useContext(userDetailContext);
  const router=useRouter();
  return (
    <FlatList data={[]}
    ListHeaderComponent={<View style={{
      backgroundColor: Colors.BG_GRAY,
      // background: Colors.WHITE
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        padding: 20
      }}>Profile</Text>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: -5,
        backgroundColor: Colors.BG_GRAY

      }}>
              <Image source={require('./../../assets/images/logo-dark.png')} style={styles.logo} />
              <Text style={{
                marginTop:0,
                fontFamily: 'outfit-bold',
                fontSize: 25
              }}>{userDetail?.name}</Text>
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: Colors.GRAY
              }}>{userDetail?.email}</Text>
            </View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BG_GRAY
      }}>
        
        <TouchableOpacity  style={styles.profileop} onPress={()=>router.push('/addCourse')}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                  }}>Add Course</Text>
                </TouchableOpacity>
        <TouchableOpacity  style={styles.profileop} onPress={()=>router.push('/(tabs)/home')}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                  }}>My Course</Text>
                </TouchableOpacity>
            
          <TouchableOpacity  style={styles.profileop} onPress={()=>router.push('/(tabs)/progress')}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                  }}>Course Progress</Text>
                </TouchableOpacity>
          
          <TouchableOpacity  style={styles.profileop}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                  }}>My Subscription</Text>
                </TouchableOpacity>
            <TouchableOpacity  style={styles.profileop} onPress={()=>signOut(auth).then(()=>{
              setUserDetail(null)
              router.push('/');
            }).catch((error)=>{
              console.log(error)
            })
            }>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                  }}>Logout</Text>
                </TouchableOpacity>
      </View>
    </View>}/>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // backgroundColor: Colors.WHITE,
    alignItems: 'center',
    width: Dimensions.get('screen').width
    // paddingTop: 100,
    // flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 0
  },
profileop:{
  padding:15,
                  borderRadius: 15,
                  elevation:1,
                  backgroundColor: Colors.WHITE,
                  width: Dimensions.get('screen').width*0.9,
                  margin: 5,
                  height: 60 
}})