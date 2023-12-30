const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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"
});

const openFun=async()=>{
const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "tôi đang cần thuê huấn luyện viên ở phòng gym",}],
    max_tokens:100
  });
  console.log(chatCompletion.choices[0].message.content);
}

openFun();