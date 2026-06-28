import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const queryStr = req.body?.query || "";

  if (
    queryStr.includes("__schema") ||
    queryStr.includes("__type") ||
    queryStr === ""
  ) {
    try {
      const jsonPath = path.join(process.cwd(), "schema.json");
      const rawJsonString = fs.readFileSync(jsonPath, "utf8");
      const fullCodegenPayload = JSON.parse(rawJsonString);

      const directSchemaObject = fullCodegenPayload.data
        ? fullCodegenPayload.data
        : fullCodegenPayload;

      return res.status(200).json({ data: directSchemaObject });
    } catch (err) {
      return res.status(500).json({
        errors: [{ message: "Schema file read error: " + err.message }],
      });
    }
  }

  try {
    const backendResponse = await fetch(
      "https://backend.reachdigital.dev/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(req.headers.authorization && {
            Authorization: req.headers.authorization,
          }),
        },
        body: JSON.stringify(req.body),
      },
    );

    const text = await backendResponse.text();
    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errors: [{ message: "Backend fetch failed: " + error.message }],
    });
  }
}
