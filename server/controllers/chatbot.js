const express = require('express')
const dotenv = require("dotenv");
const OpenAI = require('openai')

// Load environment variables from a .env file
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const maxTokens = 50;

exports.chatBox = async (req, res) => {
    try {
        const { query } = req.body
        if (!query) {
            return res.status(500).json({
                success: false,
                message: "All fields are required"
            })
        }
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `${query}` }],
            // max_tokens: maxTokens
        });
        const response = chatCompletion.choices[0].message.content;

        if (response) {
            return res.status(200).json({
                success: true,
                message: "Response recieved succesfully",
                response
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while connecting with OpenAi",
            error: error.message
        })
    }
}