import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { usePaystack } from 'react-native-paystack-webview';
import Colors from '../constant/Colors';

export default function Payment() {
    const {popup} = usePaystack();
  
  const paynow = ()=>{
        popup.newTransaction({
          email:'toman2k21@gmail.com',
          amount: 5000,
          reference: `TXN_${Date.now()}`,
          onSuccess:async(res)=>{
            console.log('Success');
          },
          onCancel:()=>{
            console.log('User cancelled')
          },
          onError:(res)=>{
            console.log('Webview error',err)
          },
          onLoad:(res)=>{
            console.log('Webview loaded')
  
          }
        })
      }
  return (
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
                    <TouchableOpacity onPress={()=>paynow()} style={{
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
  )
}