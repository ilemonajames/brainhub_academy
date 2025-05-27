import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';
import { ScrollView } from 'react-native';

export default function QuizSummary() {
    const {quizResultParam}=useLocalSearchParams();
    const [correctAnsw, setCorrectAnsw] = useState(0);
    const [totalQuestion, setTotalQuestion]= useState(0);
    const router = useRouter();
    // const r=JSON.parse(quizResultParam)
    const quizResult=JSON.parse(quizResultParam);
    

    useEffect(()=>{
        calculateResult();
    }, [quizResult])
    const calculateResult=()=>{
        if(quizResult !== undefined){
            const correctAns = Object.entries(quizResult)?.filter(([key, value])=>value?.isCorrect==true)
            const totalQues=Object.keys(quizResult).length;
            setCorrectAnsw(correctAns.length);
            setTotalQuestion(totalQues);
        }
        
    }
    const GetPerMark=()=>{
        return ((correctAnsw/totalQuestion)*100).toFixed(0)
    }
  return (
    <FlatList 
    data={[]}
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={
         <View>
        <Image source={require('./../../assets/images/wave.png')}
        style={{
            width: '100%',
            height: 700
        }}/>
        <View style={{
            position: 'absolute',
            width: '100%',
            padding: 25
        }}>
            <Text style={{
                textAlign: 'center',
                fontFamily: 'outfit-bold',
                fontSize: 30,
                color: Colors.WHITE
            }}> Quiz Summary</Text>
            <View style={{
                backgroundColor: Colors.WHITE,
                padding: 20,
                borderRadius: 20,
                marginTop: 60,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Image source={require('./../../assets/images/trophy.png')} style={{
                width: 100,
                height: 100,
                marginTop: -60
                }}/>
                <Text style={{
                    fontSize: 26,
                    fontFamily: 'outfit-bold',

                }}>
                    {GetPerMark()>60? 'Congratulations!': 'Try Again'}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: Colors.GRAY,
                        fontSize: 17
                    }}>You got {GetPerMark()}% Correct Answer</Text>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10
                    }}>
                        <View style={styles.resultTextContainer}>
                           <Text style={styles.resultText}>Q{totalQuestion}</Text>
                            
                        </View>
                        <View style={styles.resultTextContainer}>
                           <Text style={styles.resultText}>
                           ✅{correctAnsw} </Text>
                            
                        </View>
                        <View style={styles.resultTextContainer}>
                           <Text style={styles.resultText}>
                            ❌{totalQuestion-correctAnsw} </Text>
                            
                        </View>
                    </View>
            </View>
                    <Button text={'Back to Home'} onPress={()=>router.push('/(tabs)/home')}/>
            <View style={{
                marginTop:25,
                flex: 1
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25
                }}>Summary</Text>
                <FlatList
                data={Object.entries(quizResult)}
                renderItem={({item,index})=>{
                    const quizItem = item[1];
                    return (
                    <View key = {index} style={{
                        padding: 15,
                        borderWidth: 1,
                        marginTop: 5,
                        borderRadius: 15,
                        backgroundColor: quizItem?.isCorrect==true?Colors.LIGHT_GREEN:Colors.LIGHT_RED,
                        borderColor: quizItem?.isCorrect==true?Colors.GREEN:Colors.RED

                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                        }}>{quizItem.question}</Text>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 15
                        }}>Ans: {quizItem?.correctAns}</Text>
                    </View>)
                    
                }}/>
            </View>
        </View>
    </View>
    }
    />
   
  )
}

const styles = StyleSheet.create({
    resultTextContainer:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        elevation: 1
    },
    resultText:{
        fontFamily: 'outfit',
        fontSize: 20
    }
})