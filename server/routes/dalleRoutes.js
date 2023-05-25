import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send('')
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
        });

        console.log(response)

        const image = response.data.data[0].url;

        res.status(200).json({ photo: image });
    } catch (error) {
        // console.log({ message: error })
    }
});

export default router;