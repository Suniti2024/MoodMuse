// "use client";
// import { useEffect, useState } from "react";

// export default function MoodSong({ mood }: { mood: Record<string, string> }) {
//  // const [song, setSong] = useState<any>(null);
// interface Song {
//   title: string;
//   artist: string;
//   url: string;
// }

// const [song, setSong] = useState<Song | null>(null);

//   useEffect(() => {
//     const fetchSong = async () => {
//       const res = await fetch(`/api/song?mood=${mood}`);
//       const data = await res.json();
//       setSong(data);
//     };
//     fetchSong();
//   }, [mood]);

//   if (!song) return <p>Loading song...</p>;

//   return (
//     <div className="p-4 border rounded-lg shadow">
//       <p className="font-bold mb-2">{song.name} — {song.artist}</p>
//       <iframe
//         src={song.embedUrl}
//         width="100%"
//         height="80"
//         allow="encrypted-media"
//         className="rounded"
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

interface Song {
  title: string;
  artist: string;
  embedUrl: string;
}

export default function MoodSong({ mood }: { mood: string }) {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      const res = await fetch(`/api/song?mood=${mood}`);
      const data = await res.json();
      setSong(data);
    };
    fetchSong();
  }, [mood]);

  if (!song) return <p>Loading song...</p>;

  return (
    <div className="p-4 border rounded-lg shadow">
      <p className="font-bold mb-2">
        {song.title} — {song.artist}
      </p>
      <iframe
        src={song.embedUrl}
        width="100%"
        height="80"
        allow="encrypted-media"
        className="rounded"
      />
    </div>
  );
}
