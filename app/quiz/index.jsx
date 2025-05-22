import { View, Text, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';
import Button from './../../components/Shared/Button'
import {db} from './../../Config/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';



export default function Quiz() {
     const { courseParams}= useLocalSearchParams();
     const course = JSON.parse(courseParams);
     const [currentPage, setCurrentPage] = useState(0);
     const [selectedOption, setSelectedOption] = useState(null);
     const [result, setResult]=useState([]);
     const [loading, setLoading]=useState(false);
     const quiz = course?.quiz
     const router= useRouter()
     const GetProgress=(currentPage)=>{
      const perc=(currentPage/quiz?.length)
      return perc
     }
     const onOptionSelect=(selectedChoice)=>{
        setResult(prev=>({
          ...prev, [currentPage]:{
            userChoice: selectedChoice,
            isCorrect: quiz[currentPage]?.correctAns==selectedChoice,
            question: quiz[currentPage]?.question,
            correctAns: quiz[currentPage]?.correctAns
          }
        }));
        console.log(result)
     }

     const onQuizFinish= async()=>{
      setLoading(true);
        // Save the result in database for quiz
        try{await updateDoc(doc(db, 'Courses',course?.docId ), {
          quizResult: result
        })
        
        setLoading(false);
        router.replace({
          pathname: '/quiz/summary',
          params: {
            quizResultParam: JSON.stringify(result)
          }
        })
      }catch(e){
        setLoading(false);
        }
        //redirect to quiz summary
        
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
          <Pressable>
            <Ionicons name="arrow-back" size={30} color="black" style={{
            // backgroundColor: Colors.WHITE,
            // padding: 6,
            // borderRadius: 10
        }} />
          </Pressable>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 25,
            color: Colors.WHITE
          }}>{currentPage+1} of {quiz?.length}</Text>
        </View>
        <View style={{
          marginTop: 20
        }}>
      <Progress.Bar progress={GetProgress(currentPage)} color={Colors.WHITE} height={10} width={Dimensions.get('screen').width*0.85} />

        </View>
        <View style={{
          padding: 25,
          backgroundColor: Colors.WHITE,
          marginTop: 30,
          height: Dimensions.get('screen').height*0.65,
          elevation: 1,
          borderRadius: 20
        }}>

        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-bold',
          textAlign: 'center'
        }}>{quiz[currentPage]?.question}</Text>
        {quiz[currentPage]?.options.map((item,index)=>(
          <TouchableOpacity onPress={()=>{setSelectedOption(index);onOptionSelect(item)}}key={index} style={{
            padding:15,
            borderWidth: 2,
            borderRadius: 15,
            marginTop: 8,
            borderColor: selectedOption==index?Colors.GREEN: null,
            backgroundColor: selectedOption==index?Colors.LIGHT_GREEN:null
            
          }}>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 20
            }}>{item}</Text>
          </TouchableOpacity>
        ))}
        </View>
          
        {(selectedOption != null && (quiz?.length - 1)>currentPage) && <Button text={'next'} onPress={()=>{setCurrentPage(currentPage+1); setSelectedOption(null)}}/>}
          {(selectedOption!=null &&quiz?.length-1==currentPage) &&<Button text='Finish' loading={loading}
           onPress={()=> onQuizFinish()}
           />}
      </View>
    </View>
  )
}
