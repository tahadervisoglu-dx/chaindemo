// OpenAI service for supply chain insights - Secure version using API route
export async function getSupplyChainInsights(context: string, data: any, lang: string) {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        context,
        data,
        lang
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result.insight || "No insights generated.";
  } catch (error) {
    console.error("OpenAI Service Error:", error);
    return "Error generating insights. Please try again later.";
  }
}