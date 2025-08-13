import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), "public", "data", "folk_tales_deduplicated.csv");
    const file = fs.readFileSync(csvPath, "utf8");

    const parsed = Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json(parsed.data);
  } catch (error) {
    console.error("Error loading folktales:", error);
    return NextResponse.json({ error: "Failed to load folktales" }, { status: 500 });
  }
}
