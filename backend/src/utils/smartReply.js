import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSmartReplies(messageText){
    console.log("Generating smart replies for:", messageText);

    const prompt = `Suggest 3 short, natural, casual replies to this message:\n"${messageText}"\n\nReplies:\n1.`;
    try{
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.6,
            max_tokens: 50,
        });
    
        const replyText = completion.choices[0].message.content.trim();
        console.log("OpenAI reply text:", replyText);
        const replies = replyText
            .split(/\d\.\s+/)
            .filter(Boolean)
            .map((r) => r.trim());
    
        return replies;
    }catch(error){
        console.error("OpenAI API error:", error);
        throw error;
    }
}