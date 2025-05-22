import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from './../../constant/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function QuestionAnswer() {
    const {courseParams}=useLocalSearchParams();
    const course= JSON.parse(courseParams);
    const qaList= course?.qa;
    const [selectedQuestion, setSelectedQuestion]=useState();
    const router=useRouter();

    const onQuestionSelect=(index)=>{
        if(selectedQuestion==index){
            setSelectedQuestion(null)
        }
        else{
            setSelectedQuestion(index)
        }
    }
  return (
    <FlatList
    data={[]}
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={
<View>
      <Image source={require('./../../assets/images/wave.png')}
            style={{
              height: 800,
              width: '100%'
            }}
            />
        <View style={{
            position: 'absolute',
            width: '100%',
            padding: 20,
            marginTop: 35

        }}>
           <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 7,
            alignItems: 'center'
           }}>
            <Pressable>
            <Ionicons name="arrow-back" size={30} color="black" onPress={()=>router.back()}/>
          </Pressable>
          <View><Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 28,
                color: Colors.WHITE,
            }}>Question & Answers</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.WHITE
            }}>{course?.courseTitle}</Text></View>
             
           </View>

            <FlatList 
            data={qaList}
            renderItem={({item, index})=>(
                <Pressable style={styles.card}
                onPress={()=>onQuestionSelect(index)}
                >
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20
                    }}>{item?.question}</Text>
                    {selectedQuestion==index && 
                    <View style={{
                        borderTopWidth:0.4,
                        marginVertical:10,
                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                        marginTop: 10

                            // color: Colors.GREEN
                        }}>Answer:{item?.answer}</Text>
                    </View>
                    }
                </Pressable>
            )}/>
        </View>


    </View>
    }
    />
    
  )
}

const styles= StyleSheet.create({
    card:{
        padding: 20,
        backgroundColor: Colors.WHITE,
        marginTop: 15,
        borderRadius: 15,
        elevation: 1
    }
})