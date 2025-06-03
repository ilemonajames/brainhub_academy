import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors'
import { userDetailContext } from '../../context/userDetailContext'
import { Alert } from 'react-native'


export default function SubscriptionPage() {
    const {userDetail, setUserDetail}= useContext(userDetailContext);

    
  return (
    <View style={{
        backgroundColor: Colors.BG_GRAY,
        height: '100%',
        display:'flex',
        alignItems:'center'
    }}>
      <View style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 50,
              width:'100%'
            
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
                    backgroundColor: Colors.BG_GRAY,
                  width:'100%'
    
                }}>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize:20,
                        textAlign: 'center',
                        marginTop: 20
                    }}>This fee will be billed monthly</Text>
                    <TouchableOpacity onPress={()=>{Alert.alert("notification", "Paid!")}} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: Colors.WHITE,
                        borderRadius: 25,
                        padding: 15,
                        textAlign: 'left',
                        borderWidth:2,
                        borderColor:Colors.BLACK,
                        width:Dimensions.get('screen').width*0.95,
                        margin:10
                    }}>
                        
                            <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 25,                        
                        }}>Monthly payment of:</Text>
                            <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                        }}>5$</Text>
                        
                    </TouchableOpacity>
                </View>
            
    </View>
    
  )
}
const styles = StyleSheet.create({
    logo: {
    width: 180,
    height: 180,
    marginBottom: 0
  },
})