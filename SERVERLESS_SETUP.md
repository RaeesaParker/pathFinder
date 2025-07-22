# PathFinder - AI-Powered Career Guidance

## Serverless Function Setup

This application uses Netlify serverless functions to securely call the Google Gemini API for generating personalized career insights.

### Environment Variables

To enable AI-powered career insights, you need to set up a Gemini API key:

1. Sign up for an account at [Google AI Studio](https://aistudio.google.com/)
2. Create an API key at [API Key Management](https://aistudio.google.com/app/apikey)
3. In your Netlify dashboard, go to Site Settings > Environment Variables
4. Add a new environment variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key

### Local Development

For local development with Netlify functions:

1. Install Netlify CLI globally:

   ```bash
   npm install -g netlify-cli
   ```

2. Create a `.env` file in the root directory (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

3. Add your Gemini API key to the `.env` file:

   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Run the development server:
   ```bash
   netlify dev
   ```

This will start both your React app and the serverless functions locally.

### Deployment

The app is configured to deploy automatically to Netlify. Make sure to:

1. Set the `GEMINI_API_KEY` environment variable in your Netlify dashboard
2. The `netlify.toml` file is already configured for automatic deployment

### Serverless Function Details

- **Endpoint**: `/.netlify/functions/generate-career-insights`
- **Method**: POST
- **Input**: Form data (degree, modules, interests, goals)
- **Output**: Structured career insights JSON
- **AI Model**: Google Gemini 2.0 Flash
- **Fallback**: If the AI service fails, the app shows placeholder data

### Files Structure

```
netlify/
└── functions/
    └── generate-career-insights.js  # Serverless function
src/
└── utils/
    └── generateCareerPrompt.ts     # Utility functions
netlify.toml                        # Netlify configuration
.env.example                        # Environment variables template
```
