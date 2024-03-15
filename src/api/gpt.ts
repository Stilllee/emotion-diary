export const CallGPT = async ({ prompt }: { prompt: string }) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a psychological counselor who analyzes emotional diaries. Proceed in the following order.",
    },
    {
      role: "user",
      content: "Please translate the following text into Korean:",
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
      content: `1. [evaluates]: Evaluate the given emotional diary content, explore the unconscious, and analyze the content in-depth.
      2. [Psychological analysis]: Perform a more detailed psychological analysis using professional psychological knowledge and utilize a famous quote.
      3. [1 action tip]: Write down 1 action tip that will be helpful in future customer situations in a professional and kind tone, as a psychological counselor would use, in JSON array format.

      Translate into Korean and Use the output in the following JSON format:
      {
        emotional_result: "here is [evaluates]",
        analysis: "here is [Psychological analysis]",
        action: "here is [1 action tips]"
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
