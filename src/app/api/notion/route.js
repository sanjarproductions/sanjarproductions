export async function POST(req) {
    const DATABASE_ID = process.env.DATABASE_ID;
    const SECRET = process.env.SECRET;

    if (!DATABASE_ID || !SECRET) {
        console.error("❌ ERROR: Missing Notion credentials");
        return new Response(JSON.stringify({ error: "Missing Notion credentials" }), { status: 500 });
    }

    console.log("✅ NOTION_SECRET:", SECRET ? "Exists" : "MISSING");
    console.log("✅ NOTION_DATABASE_ID:", DATABASE_ID || "MISSING");

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${SECRET}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Notion API Error:", errorText);
            return new Response(JSON.stringify({ error: "Notion API request failed", details: errorText }), { status: response.status });
        }

        const data = await response.json();
        console.log("✅ Notion API Data:", data);
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error("❌ API Fetch Error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch Notion data", details: error.message }), { status: 500 });
    }
}
