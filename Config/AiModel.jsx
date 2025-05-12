// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// template for the google gemini model

const { GoogleGenAI } = require('@google/genai');

async function main() {
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
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
