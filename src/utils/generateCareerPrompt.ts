interface FormData {
  degree: string;
  modules: string[];
  interests: string[];
  goals: string;
  lifeGoals: string;
}

/**
 * Generates a prompt for Sonnet to create personalised career insights
 * @param formData - The user's form data containing degree, modules, interests, and goals
 * @returns A formatted prompt string ready to send to Sonnet
 */
export const generateCareerPrompt = (formData: FormData): string => {
  return `You are a career guidance expert. Based on the following comprehensive form data from a user, generate personalised career insights that align with both their professional aspirations and personal values.

Form Data:
${JSON.stringify(formData, null, 2)}


Generate a response, in British English, that matches this exact structure:

{
  "summary": "A personalised 2-3 sentence summary that mentions their degree, modules, interests, and how their life goals align with potential career directions",
  "transferableSkills": ["Array of 6-8 transferable skills they've developed"],
  "technicalSkills": ["Array of 4-6 technical skills relevant to their degree field"],
  "interestSkills": ["Array of 3-5 skills derived from their hobbies/interests"],
  "careerPaths": [
    {
      "title": "Career Path Title",
      "description": "One sentence description of what this role involves and its impact",
      "nextSteps": ["3-4 specific, actionable steps they can take to pursue this path"],
      "encouragement": "One motivational sentence connecting their background to this career",
      "lifeAlignment": "One sentence explaining how this career aligns with their stated life goals and values"
    }
  ]
}

Requirements:
- Generate exactly 5 unique career paths that are creative and might not be obvious choices
- CRITICALLY IMPORTANT: Ensure career paths strongly align with their life goals and values (work-life balance, making a difference, helping others, financial security, etc.)
- Make sure career paths are diverse across different industries but all respect their life values
- Tailor technical skills to their degree field (STEM, business, arts, etc.)
- Include both traditional and emerging career options that match their life priorities
- Keep descriptions concise but inspiring
- Make next steps specific and actionable
- Ensure encouragement is personal and references their specific background
- The new "lifeAlignment" field should clearly explain how each career path supports their personal values and life goals
- If they mentioned work-life balance, prioritize careers known for this
- If they mentioned making a difference, focus on impact-driven roles
- If they mentioned financial security, consider earning potential
- If they mentioned helping others, emphasize people-focused careers

Return only the JSON object, no additional text or markdown formatting.`;
};

/**
 * Calls the serverless function to generate career insights
 * @param formData - The user's form data
 * @returns Promise that resolves to career insights
 */
export const generateCareerInsights = async (formData: FormData) => {
  const response = await fetch("/.netlify/functions/generate-career-insights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to generate career insights");
  }

  return response.json();
};
