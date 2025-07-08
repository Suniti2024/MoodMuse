 "use client";

import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useRouter } from "next/navigation";

export default function Home() {
  const [moodText, setMoodText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");
  const [song, setSong] = useState<{ type: "audio" | "spotify"; url?: string; uri?: string } | null>(null);
  const [code, setCode] = useState("");

  const router = useRouter();

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    setMoodText(transcript);
  }, [transcript]);

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const handleGenerate = async () => {
    if (!moodText.trim()) return;

    const emotionRes = await fetch("/api/emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: moodText }),
    });
    const emotionData = await emotionRes.json();
    const detectedEmotion = emotionData.emotion;
    setEmotion(`Here's something for your ${detectedEmotion} mood.`);

    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      const res = await fetch("/api/save-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          mood: detectedEmotion,
          date: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      console.log("💾 Mood Save Result:", data);
    }

    const imageRes = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion: detectedEmotion }),
    });
    const imageData = await imageRes.json();
    setImage(imageData.imageUrl);

    const songRes = await fetch(`/api/generate-song`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: detectedEmotion }),
    });
    if (songRes.ok) {
      const songData = await songRes.json();
      if (songData.previewUrl) {
        setSong({ type: "audio", url: songData.previewUrl });
      } else if (songData.spotifyUri) {
        setSong({ type: "spotify", uri: songData.spotifyUri });
      } else {
        setSong(null);
      }
    } else {
      setSong(null);
    }

    const codeRes = await fetch("/api/generate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion: detectedEmotion }),
    });
    const codeData = await codeRes.json();

    const combinedQuote = `Here's quote for your ${detectedEmotion} mood.` + (codeData.quote ? "\n\n" + codeData.quote : "");
    setQuote(combinedQuote);
    setCode(codeData.code || "");
  };

  const renderSpotifyEmbed = (uri?: string) => {
    if (!uri) return null;
    const parts = uri.split(":");
    if (parts.length === 3 && parts[1] === "track") {
      const trackId = parts[2];
      return (
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
          className="rounded-xl shadow-lg mt-4"
          title="Spotify Player"
        />
      );
    }
    return null;
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-gray-800 p-6 overflow-hidden">

      {/* Background Image */}
      <img
        src="/homebg3.jpg" // Replace with your image name placed inside /public
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 blur-sm z-0"
      />

      {/* History Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => router.push("/history")}
          className="bg-white text-indigo-700 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-100 transition"
        >
          View History
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white/10 backdrop-blur-3xl shadow-2xl rounded-2xl p-12 max-w-3xl w-full space-y-8 text-center text-white z-10">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">🎧 MoodMuse</h1>
        <p className="text-lg text-gray-300">Tell us your mood and get curated content: image, song, and quote.</p>

        <div className="flex gap-4 items-center bg-white/20 p-4 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Describe your mood..."
            className="flex-1 px-5 py-3 rounded-lg border-none bg-white/30 text-lg text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
          />
          <button
            onClick={handleVoiceInput}
            className={`${
              listening ? "bg-red-500" : "bg-green-500"
            } hover:scale-110 transition-transform text-white rounded-full px-4 py-3 shadow-md`}
          >
            {listening ? "🛑" : "🎤"}
          </button>
        </div>

        <button
          onClick={handleGenerate}
          className="bg-pink-600 hover:bg-pink-700 transition-all text-white px-8 py-4 rounded-full font-bold shadow-lg"
        >
          Generate
        </button>

        {emotion && <div className="text-xl font-semibold text-pink-200">{emotion}</div>}

        {image && (
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={image} alt="Mood" className="w-full h-72 object-cover rounded-xl" />
          </div>
        )}

        {song && song.type === "audio" && (
          <audio controls className="w-full mt-4 rounded-xl bg-white/20 p-4 shadow-lg">
            <source src={song.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {song && song.type === "spotify" && renderSpotifyEmbed(song.uri)}

        {code && (
          <pre className="text-left bg-white/20 text-white p-5 rounded-xl shadow-md overflow-auto text-sm">
            <code>{code}</code>
          </pre>
        )}

        {quote && (
          <div className="whitespace-pre-wrap text-lg italic text-white/90 bg-white/15 p-5 rounded-xl shadow-md">
            {quote}
          </div>
        )}
      </div>
    </main>
  );
}

 
 
// "use client";

// import { useEffect, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// export default function Home() {
//   const [moodText, setMoodText] = useState("");
//   const [emotion, setEmotion] = useState("");
//   const [quote, setQuote] = useState("");
//   const [image, setImage] = useState("");
//   const [song, setSong] = useState<{ type: "audio" | "spotify"; url?: string; uri?: string } | null>(null);
//   const [code, setCode] = useState("");

//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   useEffect(() => {
//     setMoodText(transcript);
//   }, [transcript]);

//   const handleVoiceInput = () => {
//     if (!browserSupportsSpeechRecognition) {
//       alert("Speech Recognition is not supported in this browser.");
//       return;
//     }

//     if (!listening) {
//       resetTranscript();
//       SpeechRecognition.startListening({ continuous: false, language: "en-US" });
//     } else {
//       SpeechRecognition.stopListening();
//     }
//   };

//   const handleGenerate = async () => {
//     if (!moodText.trim()) return;

//     // Get emotion
//     const emotionRes = await fetch("/api/emotion", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: moodText }),
//     });
//     const emotionData = await emotionRes.json();
//     const detectedEmotion = emotionData.emotion;
//     setEmotion(detectedEmotion);
//     setEmotion(`Here's something for your ${detectedEmotion} mood.`)

//     // Get image URL// Save the mood to the database
//  // Save mood to DB
//  const userEmail = localStorage.getItem("email");

// if (userEmail) {
//   const res = await fetch("/api/save-mood", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: userEmail,
//       mood: detectedEmotion,
//       date: new Date().toISOString(),
//     }),
//   });

//   const data = await res.json();
//   console.log("💾 Mood Save Result:", data); // ADD THIS
// }



//     const imageRes = await fetch("/api/generate-image", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ emotion: detectedEmotion }),
//     });
//     const imageData = await imageRes.json();
//     setImage(imageData.imageUrl);

 

//     // Get song from /api/generate-song
//     const songRes = await fetch(`/api/generate-song`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ mood: detectedEmotion }),
//     });
//     if (songRes.ok) {
//       const songData = await songRes.json();
//       if (songData.previewUrl) {
//         setSong({ type: "audio", url: songData.previewUrl });
//       } else if (songData.spotifyUri) {
//         setSong({ type: "spotify", uri: songData.spotifyUri });
//       } else {
//         setSong(null);
//       }
//     } else {
//       setSong(null);
//     }
    

//     // Get code snippet and quote
//     const codeRes = await fetch("/api/generate-code", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ emotion: detectedEmotion }),
//     });
//     const codeData = await codeRes.json();

//     // Combine the initial quote + codeData quote
//     const combinedQuote = `Here's quote for your ${detectedEmotion} mood.` + (codeData.quote ? "\n\n" + codeData.quote : "");
//     setQuote(combinedQuote);

//     setCode(codeData.code || "");
//   };

//   // Helper to render Spotify iframe if song.type is 'spotify'
//   const renderSpotifyEmbed = (uri?: string) => {
//     if (!uri) return null;
//     const parts = uri.split(":");
//     if (parts.length === 3 && parts[1] === "track") {
//       const trackId = parts[2];
//       return (
//         <iframe
//           src={`https://open.spotify.com/embed/track/${trackId}`}
//           width="100%"
//           height="80"
//           frameBorder="0"
//           allow="encrypted-media"
//           className="rounded-xl shadow-lg mt-4"
//           title="Spotify Player"
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-6">
//       <div className="bg-white/10 backdrop-blur-3xl shadow-2xl rounded-2xl p-12 max-w-3xl w-full space-y-8 text-center text-white">
//         <h1 className="text-5xl font-extrabold drop-shadow-lg">🎧 MoodMuse</h1>
//         <p className="text-lg text-gray-300">Tell us your mood and get curated content: image, song, and quote.</p>

//         <div className="flex gap-4 items-center bg-white/20 p-4 rounded-xl shadow-lg">
//           <input
//             type="text"
//             placeholder="Describe your mood..."
//             className="flex-1 px-5 py-3 rounded-lg border-none bg-white/30 text-lg text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400"
//             value={moodText}
//             onChange={(e) => setMoodText(e.target.value)}
//           />
//           <button
//             onClick={handleVoiceInput}
//             className={`${
//               listening ? "bg-red-500" : "bg-blue-500"
//             } hover:scale-110 transition-transform text-white rounded-full px-4 py-3 shadow-md`}
//           >
//             {listening ? "🛑" : "🎤"}
//           </button>
//         </div>

//         <button
//           onClick={handleGenerate}
//           className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-8 py-4 rounded-full font-bold shadow-lg"
//         >
//           Generate
//         </button>

//         {/* Show combined quote */}
//           {emotion && (<div>  {emotion} </div>)}
//         {image && (
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <img src={image} alt="Mood" className="w-full h-72 object-cover rounded-xl" />
//           </div>
//         )}

//         {/* Song rendering */}
//         {song && song.type === "audio" && (
//           <audio controls className="w-full mt-4 rounded-xl bg-white/20 p-4 shadow-lg">
//             <source src={song.url} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         )}

//         {song && song.type === "spotify" && renderSpotifyEmbed(song.uri)}

//         {code && (
//           <pre className="text-left bg-white/20 text-white p-5 rounded-xl shadow-md overflow-auto text-sm">
//             <code>{code}</code>
//           </pre>
          
//         )}
//         {quote && (
//           <div className="whitespace-pre-wrap text-lg italic text-white/90 bg-white/15 p-5 rounded-xl shadow-md">
//             {quote}
//           </div>
//         )}

//       </div>
//     </main>
//   );
// }
