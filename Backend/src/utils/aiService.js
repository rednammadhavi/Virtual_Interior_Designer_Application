import OpenAI from "openai"
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const generateRoomDesign = async (imageUrl, prompt) => {
    const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: `Redesign this room in style: ${prompt}`,
        size: "1024x1024"
    })
    return response.data[0].url
}

export { generateRoomDesign }