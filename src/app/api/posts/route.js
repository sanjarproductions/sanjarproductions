import { HttpStatusCode } from "axios";

export async function POST(req) {
  const DATABASE_ID = process.env.DATABASE_ID;
  const SECRET = process.env.SECRET;

  if (!DATABASE_ID || !SECRET) {
    return new Response(
      JSON.stringify({ error: "Missing Notion credentials" }),
      { status: HttpStatusCode.Unauthorized }
    );
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({
          error: "Notion API request failed",
          details: errorText,
        }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: HttpStatusCode.Ok });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch Notion data",
        details: error.message,
      }),
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
