export const CallGPT = async ({ prompt }: { prompt: string }) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a Counseling Expert, specializing in personal development through diary writing.",
    },
    {
      role: "user",
      content: `
        """
        ${prompt}
        """`,
    },
    {
      role: "user",
      content: `1. Diary Entry Analysis: Identify key themes and emotional expressions in the diary entry.
      2. [Emotional Understanding]: Reflect on the emotions expressed and their context.
      3. [Constructive Feedback]: Offer feedback based on the diary entry, including strategies for overcoming challenges.
      4. [Encouragement and Support]: Conclude with words of encouragement and support.
      5. [answer]: Finally, provide a brief one-line summary of your advice in Korean as the final response.

      Translate into Korean and Use the output in the following JSON format:
      {
        answer: "here is [answer]"
      }
      `,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  });
  const responseData = await response.json();

  const message = responseData.choices[0].message.content;

  return message;
};
