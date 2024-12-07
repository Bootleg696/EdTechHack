import 'dotenv/config';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Use the API key from .env
export function chat() {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": `You are a personalised system for university students that will give them opportunities for internships, startups etc 
                based on the skills of a student (they do not need to match ALL the skills but the ones with the most skills match will take precedence). 
                For starters, the student will be prompted to input their role (what they want to achieve (for example, software engineer)), which year of university they are in, their skills, university and working rights as well. 
                The students will then be provided with information on the clubs (related to their universities), courses they can do, programs they can do and internship opportunities.
                If the student does not have sufficient skills for any of these four categories, then they should be provided with resources with being able to gain these skills.
                Please answer the question with clickable links.`
            },
            {
                "role": "assistant",
                "content": `Give a nice welcoming message for the student. 
                I am a first year student with basic skills in C and Python only. I am an australian citizen and am looking for job recommendatiosn based on my skillset.`
            },
        ],
        "model": "llama-3.3-70b-versatile",
        "temperature": 1,
        "max_tokens": 34830,
        "top_p": 1,
        "stream": true
    });

    // return chatCompletion.choices[0].message.content;
    return chatCompletion.choices[0]?.message?.content;
    // process.stdout.write(chunk.choices[0]?.delta?.content || '');
}