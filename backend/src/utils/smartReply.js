import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSmartReplies(messageText){
    const prompt = `Suggest 3 short, natural, casual replies to this message:\n"${messageText}"\n\nReplies:\n1.`;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens: 50,
    });

    const replyText = completion.choices[0].message.content.trim();
    const replies = replyText
        .split(/\d\.\s+/)
        .filter(Boolean)
        .map((r) => r.trim());

    return replies;
}