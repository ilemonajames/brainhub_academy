import { View, Text, Image, Pressable, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import FlipCard from 'react-native-flip-card';
import * as Progress from 'react-native-progress';




export default function FlashCards() {
    const {courseParams}=useLocalSearchParams();
    const router=useRouter();
    const course=JSON.parse(courseParams);
    const flashcard=course?.flashcards
    const [currentPage, setCurrentPage]=useState(0);
    const width= Dimensions.get('screen').width;
    const GetProgress=(currentPage)=>{
      const perc=(currentPage/flashcard?.length)
      return perc
     }
    const onScroll=(event)=>{
        const index=Math.round(event?.nativeEvent?.contentOffset.x/width);
        console.log(index);
        setCurrentPage(index)
    }
  return (
    <View>
      <Image source={require('./../../assets/images/wave.png')}
            style={{
              height: 800,
              width: '100%'
            }}
            />
        <View style={{
                position: 'absolute',
                padding: 25,
                width: '100%'
              }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Pressable onPress={()=>router.back()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                  </Pressable>
                  <Text style={{
                              fontFamily: 'outfit-bold',
                              fontSize: 25,
                              color: Colors.WHITE
                            }}>{currentPage+1} of {flashcard?.length}</Text>
            </View>
            <View style={{
          marginTop: 20
        }}>
      <Progress.Bar progress={GetProgress(currentPage)} color={Colors.WHITE} height={10} width={Dimensions.get('screen').width*0.85} />

        </View>
            <FlatList
            data={flashcard}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            renderItem={({item, index})=>(
                <View style={{
                    height: 500,
                    
                    marginTop:60
                    
                    // marginHorizontal: width*0.05 //I prefer it with this tbf
                }}>

                <FlipCard style={styles.flipcard}>
                  {/* Face Side */}
                  <View style={styles.frontCard}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 28
                    }}>{item.front}</Text>
                  </View>
                  {/* Back Side */}
                  <View style={styles.backCard}>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 28,
                        width: Dimensions.get('screen').width*0.78,
                        padding: 20,
                        textAlign: 'center',
                        color: Colors.WHITE
                    }}>{item.back}</Text>
                  </View>
                </FlipCard>
                </View>
                
            )}/>
            </View>


    </View>
  )
}

const styles = StyleSheet.create({
    flipcard:{
        width:Dimensions.get('screen').width*0.78,
        height: 400,
        backgroundColor: Colors.WHITE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: Dimensions.get('screen').width*0.05
    },
    frontCard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 20,

    },
    backCard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 20,
        backgroundColor: Colors.PRIMARY

    }

})