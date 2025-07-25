# Path Finder - Using AI to Uncover Career Paths Beyond the Obvious

## About Path Finder

Path Finder is an intelligent career guidance application that helps students and graduates discover personalised career opportunities based on their academic background, interests, and goals. Using AI, the platform analyses user input to generate tailored career insights, transferable skills identification, and actionable next steps.

### What It Does

- **Personalised Career Analysis**: Input your degree, favourite modules, hobbies, and career goals to receive AI-generated career insights
- **Skills Mapping**: Automatically identifies transferable, technical, and interest-based skills from your background
- **Career Path Discovery**: Suggests 5 unique career paths across diverse industries, including both traditional and emerging opportunities
- **Actionable Guidance**: Provides specific next steps and encouragement for each career path

🚀 **Live Demo**: [https://lighthearted-snickerdoodle-b713b5.netlify.app/](https://lighthearted-snickerdoodle-b713b5.netlify.app/)

### Tech Stack

**Frontend:**

- React with TypeScript
- Chakra UI
- React Router DOM
- Vite

**Backend:**

- Netlify Serverless Functions (Node.js)
- Google Gemini 2.0 Flash API (AI processing)

**Development & Deployment:**

- TypeScript for type safety
- ESLint for code quality
- Vitest for testing
- Netlify hosting with automatic deployments

## Setup & Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RaeesaParker/pathFinder.git
   cd pathFinder
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Get a Gemini API key:**

   1. Sign up for an account at [Google AI Studio](https://aistudio.google.com/)
   2. Create an API key at [API Key Management](https://aistudio.google.com/app/apikey)

4. **Set up environment variables:**

   Create a `.env` file in the root directory:

   **macOS/Linux:**

   ```bash
   touch .env
   ```

   **Windows (Command Prompt):**

   ```cmd
   echo. > .env
   ```

   **Windows (PowerShell):**

   ```powershell
   New-Item .env -Type File
   ```

   Add your Gemini API key to the `.env` file:

   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Install Netlify CLI globally:**

   ```bash
   npm install -g netlify-cli
   ```

6. **Start the development server:**

   ```bash
   netlify dev
   ```

   The app will be available at `http://localhost:8888` with both frontend and serverless functions running.

### Running Tests

To run the test suite:

```bash
npm test
```

This will run all tests using Vitest with comprehensive coverage of components, accessibility, and user interactions.

---
