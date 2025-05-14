import { View, Text , StyleSheet, TextInput, Pressable, ScrollView} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors.jsx'
import Button from '../../components/Shared/Button.jsx'
import { useState,  useContext } from 'react'
import Prompt from '../../constant/Prompt.jsx'
import {db} from './../../Config/firebaseConfig.jsx'
import { doc, setDoc } from 'firebase/firestore'
import { userDetailContext } from '../../context/userDetailContext.jsx'
import { useRouter } from 'expo-router'

const { GoogleGenAI } = require('@google/genai');

export default function AddCourse() {
    const [loading, setLoading]=useState(false);
    const [userInput, setUserInput]=useState('');
    const [topics, setTopics]=useState([]);
    const [selectedTopics, setSelectedTopics]=useState([]);
    const {userDetail , setUserDetail} = useContext(userDetailContext);
    const router = useRouter();
    const onGenerateTopic= async()=>{
        //Get topic from Ai model
        setLoading(true);
        const PROMPT=userInput+Prompt.IDEA;
       // const aiRep= // supposed to be the GeneratePromptAIModel function as in the video, but now I'm searching how to implement it
        // const topicIdea = aiRep.response.text();
        // console.log(topicIdea);

        const ai = new GoogleGenAI({
            apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
          });
        
          const config = {
            responseMimeType: 'application/json',
          };
        
          const model = 'gemini-2.0-flash';
        
          const contents = [
            {
              role: 'user',
              parts: [
                {
                  text: `Learn Python: As you are a coaching teacher 
        -User want to learn about to topic
        -Generate 5-7 course title for study(short)
        -make sure it is related to description
        -output will be ARRAY of String in JSON FORMAT only 
        -Do not add any plain text in output,`,
                },
              ],
            },
            {
              role: 'model',
              parts: [
                {
                  text: `\`\`\`json
        [
          "Python Kickstart",
          "Learn Python: The Basics",
          "Python for Absolute Beginners",
          "Core Python Programming",
          "Python Fundamentals",
          "Introduction to Python Development",
          "Python Essentials"
        ]
        \`\`\``,
                },
              ],
            },
            {
              role: 'user',
              parts: [
                {
                  text: `Learn Python:: As you are a coaching teacher
        -User want to learn about to topic
        -Generate 5-7 course title for study(short)
        -make sure it is related to description
        -output will be ARRAY of String in JSON FORMAT only
        -Do not add any plain text in output,`,
                },
              ],
            },
            {
              role: 'model',
              parts: [
                {
                  text: `\`\`\`json
        [
          "Python 101",
          "Python Programming: A Gentle Intro",
          "Python for Data Science Beginners",
          "Python Web Development: Fast Track",
          "Automate with Python",
          "Python Scripting Essentials",
          "Python: From Zero to Hero"
        ]
        \`\`\``,
                },
              ],
            },
            {
              role: 'user',
              parts: [
                {
                  text: `${PROMPT}:: As you are a coaching teacher
                   -User want to learn about to topic
        -Generate 5-7 course title for study(short)
        -make sure it is related to description
        -output will be ARRAY of String in JSON FORMAT only
        -Do not add any plain text in output,`
                  ,
                },
              ],
            },
          ];
        
          const response = await ai.models.generateContent({
            model,
            config,
            contents,
          });
          const aiRep = response;
          const topicIdea =  JSON.parse(aiRep.text);
          console.log('Topic Idea:', topicIdea);
        
          // for await (const chunk of response) {
          //   const topicIdea = chunk.text;
          //   // console.log(chunk.text);
          //   console.log('Topic Idea:', topicIdea);
          // }
          setTopics(topicIdea);
        setLoading(false);

        
    }
    const onTopicSelect=(topic)=>{
      const isAlreadyExist=selectedTopics.find((item)=>item==topic)
      if(!isAlreadyExist){
        setSelectedTopics(prev=>[...prev,topic])
      }
      else{
        const topics=selectedTopics.filter((item)=>item!=topic)
        setSelectedTopics(topics)
      }
    }
    const isTopicSelected=(topic)=>{
      const Selection = selectedTopics.find((item)=>item==topic)
      return Selection?true:false
    }
    const onGenerateCourse=async()=>{
      /* Generate course using Ai model */
      setLoading(true);
      const PROMPT=selectedTopics+Prompt.COURSE;
      const ai2 = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [PROMPT];

  const response = await ai2.models.generateContent({
    model,
    config,
    contents,
  });
  try{
  const aipet=response;
  const resp = JSON.parse(aipet.text);
  const courses1 = resp.courses;
  console.log(courses1);
      // const course= (response.text);
      //save course info to dataase
    
      courses1?.forEach(async(course)=>{
        await setDoc(doc(db, 'Courses', Date.now().toString()),{

          ...course,
          createdOn:new Date(),
          createdBy: userDetail?.uid,

        })
      })

      setLoading(false);
    }catch(e){
        setLoading(false);
    }
      router.push('/(tabs)/home')
      // console.log(courses)
      
    }
  return (
    <ScrollView style={{
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
    <View style={{
      marginBottom:10,
      marginTop: 15
    }}>
      <Text style={{
        fontFamily:'outfit',
        fontSize: 20
      }}>
        Select all topics which you want to add in the course
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          marginTop: 6
        }}>
          {topics.map((item,index)=>(
            <Pressable key={index} 
            onPress={()=>onTopicSelect(item)}><Text style={{
              paddin: 7,
              borderWidth: 0.4,
              borderRadius: 99,
              paddingHorizontal: 15,
              backgroundColor: isTopicSelected(item)?Colors.PRIMARY:null,
              color: isTopicSelected(item)?Colors.WHITE: Colors.PRIMARY
            }}>{item}</Text></Pressable>
            
          ))}
        </View>
      </Text>
    </View>

    {selectedTopics?.length>0 && <Button text={'Create Course'}  onPress={()=>onGenerateCourse()} loading={loading}/>}
    </ScrollView>
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