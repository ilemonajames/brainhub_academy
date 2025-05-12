import { View, Text , StyleSheet, TextInput} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors.jsx'
import Button from '../../components/Home/Shared/Button.jsx'
import { useState } from 'react'
import Prompt from '../../constant/Prompt.jsx'


export default function AddCourse() {
    const [loading, setLoading]=useState(false);
    const [userInput, setUserInput]=useState('');
    const onGenerateTopic= async()=>{
        //Get topic from Ai model
        setLoading(true);
        const PROMPT=userInput+Prompt.IDEA;
       // const aiRep= // supposed to be the GeneratePromptAIModel function as in the video, but now I'm searching how to implement it
        const topicIdea = aiRep.response.text();
        console.log(topicIdea);
        setLoading(false);
    }
  return (
    <View style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30
      }}>Create New Course</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
      }}>What do you want to learn Today?</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 20,
        marginTop: 8,
        color: Colors.GRAY,
      }}>What course do you want to create (ex.Learn Python, Digital Marketing, 10th Science Chapters, etc..)</Text>
      <TextInput placeholder='(Ex, Learn Python, Learn 12th Grade Chemistry)'
      style={styles.textInput}
      numberOfLines={3}
      multiline={true}
      onChangeText={(value)=>setUserInput(value)}/>

      <Button text={'Generate Topic'} type='outline' onPress={()=>onGenerateTopic()} loading={loading}/>
    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15, 
        borderWidth: 1, 
        borderRadius: 15,
        height:100,
        marginTop: 10,
        alignItems: 'flex-start',
        fontSize: 18
    }
})