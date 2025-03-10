import { HttpStatusCode } from "axios";

export async function POST(req) {
  console.log("POST /api/posts - Request received");
  const DATABASE_ID = process.env.DATABASE_ID;
  const SECRET = process.env.SECRET;

  console.log("Environment variables:", {
    hasSecret: !!SECRET,
    secretPrefix: SECRET ? SECRET.substring(0, 7) : "missing",
    hasDatabaseId: !!DATABASE_ID,
    databaseIdLength: DATABASE_ID ? DATABASE_ID.length : 0
  });

  if (!DATABASE_ID || !SECRET) {
    console.error("API Error: Missing Notion credentials");
    return new Response(
      JSON.stringify({ error: "Missing Notion credentials" }),
      { status: HttpStatusCode.Unauthorized }
    );
  }

  try {
    console.log(`Fetching posts from database: ${DATABASE_ID}`);
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SECRET}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "Created time",
              direction: "descending"
            }
          ],
          page_size: 100
        }),
      }
    );

    console.log(`Notion API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Notion API error:", {
        status: response.status,
        details: errorText
      });
      return new Response(
        JSON.stringify({
          error: "Notion API request failed",
          details: errorText,
        }),
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Successfully fetched posts:", { 
      count: data.results?.length || 0,
      hasResults: !!data.results,
      samplePost: data.results?.[0] ? {
        id: data.results[0].id,
        object: data.results[0].object,
        properties: data.results[0].properties,
        url: data.results[0].url,
        created_time: data.results[0].created_time,
        last_edited_time: data.results[0].last_edited_time,
        parent: data.results[0].parent
      } : null
    });
    return new Response(JSON.stringify({
      object: data.object,
      results: data.results.map(page => ({
        id: page.id,
        object: page.object,
        properties: page.properties,
        url: page.url,
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        parent: page.parent
      })),
      has_more: data.has_more,
      next_cursor: data.next_cursor
    }), { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("Exception in posts fetch:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch Notion data",
        details: error.message,
      }),
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
