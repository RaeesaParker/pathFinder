# Migration Summary: Claude → Gemini API

## Changes Made

### 1. Updated Serverless Function (`netlify/functions/generate-career-insights.js`)

- **API Endpoint**: Changed from Anthropic Claude to Google Gemini API
- **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Authentication**: Now uses `GEMINI_API_KEY` as URL parameter instead of header
- **Request Structure**: Updated to Gemini's `contents` format with `parts` array
- **Model**: Using `gemini-2.0-flash` (latest model)
- **Response Parsing**: Updated to parse Gemini's response structure (`candidates[0].content.parts[0].text`)

### 2. Environment Variables (`.env.example`)

- **Changed**: `ANTHROPIC_API_KEY` → `GEMINI_API_KEY`
- **Source**: Get key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 3. Documentation (`SERVERLESS_SETUP.md`)

- **Updated**: All references to Anthropic → Google Gemini
- **API Key Setup**: Updated instructions for Google AI Studio
- **Model Info**: Added specification of Gemini 2.0 Flash model

## Key Benefits of Gemini API

1. **Free Tier**: Generous free usage limits
2. **JSON Mode**: Built-in `responseMimeType: "application/json"` support
3. **Safety Settings**: Comprehensive content filtering
4. **Performance**: Fast response times with Gemini 2.0 Flash
5. **Cost**: Generally more cost-effective than Claude

## API Request Structure

```javascript
{
  contents: [
    {
      parts: [{ text: prompt }]
    }
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 4000,
    responseMimeType: "application/json"
  },
  safetySettings: [
    // Harassment, hate speech, explicit content, dangerous content
  ]
}
```

## Response Structure

```javascript
{
  candidates: [
    {
      content: {
        parts: [{ text: "JSON response string" }],
      },
    },
  ];
}
```

## Testing

- ✅ Build passes successfully
- ✅ Syntax validation passes
- ✅ All documentation updated
- ✅ Environment variables configured

## Next Steps

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Set `GEMINI_API_KEY` in your `.env` file for local development
3. Set `GEMINI_API_KEY` in Netlify environment variables for production
4. Test the functionality with `netlify dev`
