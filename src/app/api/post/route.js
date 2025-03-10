import { HttpStatusCode } from "axios";

export async function POST(req) {
  console.log("POST /api/post - Request received");
  const SECRET = process.env.SECRET;

  const body = await req.json();
  console.log("Request body:", { postId: body.postId });

  const slug = body.postId;

  if (!SECRET) {
    console.error("API Error: Missing Notion SECRET environment variable");
    return new Response(
      JSON.stringify({ error: "Missing Notion credentials" }),
      { status: HttpStatusCode.Unauthorized }
    );
  }

  try {
    console.log(`Fetching post with ID: ${slug}`);
    const pageResponse = await fetch(`https://api.notion.com/v1/pages/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SECRET}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
    });

    if (!pageResponse.ok) {
      const errorText = await pageResponse.text();
      console.error("Notion API error (page):", {
        status: pageResponse.status,
        details: errorText
      });
      return new Response(
        JSON.stringify({
          error: "Notion API request failed",
          details: errorText,
        }),
        { status: pageResponse.status }
      );
    }

    const pageData = await pageResponse.json();

    const blocksResponse = await fetch(`https://api.notion.com/v1/blocks/${slug}/children`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SECRET}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
    });

    if (!blocksResponse.ok) {
      const errorText = await blocksResponse.text();
      console.error("Notion API error (blocks):", {
        status: blocksResponse.status,
        details: errorText
      });
      return new Response(
        JSON.stringify({
          error: "Notion API request failed",
          details: errorText,
        }),
        { status: blocksResponse.status }
      );
    }

    const blocksData = await blocksResponse.json();

    console.log("Successfully fetched post data:", { 
      id: pageData.id,
      hasProperties: !!pageData.properties,
      objectType: pageData.object,
      blockCount: blocksData.results?.length || 0
    });

    return new Response(JSON.stringify({
      page: pageData,
      blocks: blocksData.results
    }), { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("Exception in post fetch:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch Notion data",
        details: error.message,
      }),
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
