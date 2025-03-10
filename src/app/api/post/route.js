import { HttpStatusCode } from "axios";

export async function POST(req, res) {
  const SECRET = process.env.SECRET;

  const body = await req.json();

  const slug = body.postId;

  if (!SECRET) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ error: "Missing Notion credentials" });
  }

  return await fetch(`https://api.notion.com/v1/pages/${slug}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
  })
    .then((r) => r.json())
    .then((d) => {
      return new Response(JSON.stringify(d), { status: HttpStatusCode.Ok });
    })
    .catch((err) => {
      return new Response(
        JSON.stringify({
          error: "Failed to fetch Notion data",
          details: err?.message,
        }),
        { status: HttpStatusCode.InternalServerError }
      );
    });
}
