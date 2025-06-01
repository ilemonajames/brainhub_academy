import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constant/Colors'
import { userDetailContext } from '../../context/userDetailContext'
import { PaystackProvider, usePaystack } from 'react-native-paystack-webview'
import Payment from '../../components/payment'

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
<PaystackProvider debug publicKey='pk_test_d9f1fdfa4a678d16b9e41cbb5dc9d39d66434875' currency='NGN'
defaultChannels={['card', 'mobile_money']}>
            <Payment/>
</PaystackProvider>
            
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