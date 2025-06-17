  
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mood = body.mood;
    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 });
    }

    const token = await getAccessToken();

    const moodMap: Record<string, string> = {
      happy: "feel good",
      sad: "rainy day",
      angry: "hard rock",
      calm: "chill vibes",
    };

    const query = moodMap[mood.toLowerCase()] || mood;

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!searchRes.ok) {
      return NextResponse.json({ error: "Failed to fetch songs from Spotify" }, { status: 500 });
    }

    const searchData = await searchRes.json();

    if (
      !searchData.tracks ||
      !searchData.tracks.items ||
      searchData.tracks.items.length === 0
    ) {
      return NextResponse.json({ error: "No songs found" }, { status: 404 });
    }

    const tracks = searchData.tracks.items;
const randomIndex = Math.floor(Math.random() * tracks.length);
const track = tracks[randomIndex];


    return NextResponse.json({
      trackName: track.name,
      artist: track.artists[0].name,
      previewUrl: track.preview_url,
      spotifyUri: track.uri,
      spotifyExternalUrl: track.external_urls.spotify,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
 