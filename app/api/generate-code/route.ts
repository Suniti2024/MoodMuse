//  // app/api/generate-quote/route.ts
// import { NextResponse } from 'next/server';

// const moodQuotes: Record<string, string[]> = {
//   happy: [
//     "Life set hai bro, tension mat le!",
//     "Aaj toh dil garden-garden ho gaya 🌸",
//     "Full on vibes aaj, mast reh!",
//   ],
//   sad: [
//     "Dil hai ki manta nahi 💔",
//     "Mood off hai, par tu strong hai boss!",
//     "Kya yaar, zindagi ne maar diya today 🥲",
//   ],
//   angry: [
//     "Gussa aaraha hai toh chill maar, chai pi le 🍵",
//     "Mood kharab hai? Uninstall karde problems ko 🔥",
//     "Sabko ignore kar, khudko priority de 😤",
//   ],
//   excited: [
//     "Aaj toh scene on hai! 💥",
//     "Kuch bada hone wala hai boss 😎",
//     "Energy level 1000%, let’s gooo 🚀",
//   ],
//   neutral: [
//     "Bas chal raha hai yeh zindagi ka safari 🛣️",
//     "Kuch khaas nahi, but also no stress!",
//     "Zindagi 50-50 chal rahi hai 🤷‍♂️",
//   ],
//   romantic: [
//     "Tu hi meri aesthetic story ka filter hai ❤️",
//     "Tere bina coffee bhi tasteless lagti hai ☕💔",
//     "Dil DND mode mein tha, tu notification ban ke aayi 😍",
//   ],
//   lazy: [
//     "Aaj ka motto: Eat, Sleep, Repeat 😴",
//     "Kaam se break lena bhi self-care hai bro!",
//     "Productivity kal se, aaj toh relax hi relax 😌",
//   ],
//   anxious: [
//     "Deep breath le, sab theek ho jaayega 💆‍♂️",
//     "Overthinking is the real villain, not you 👀",
//     "Thoda slow chal, race abhi baaki hai 🧠",
//   ],
// };

// export async function POST(req: Request) {
//   try {
//     const { emotion } = await req.json();
//     const quotes = moodQuotes[emotion] || moodQuotes['neutral'];
//     const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//     return NextResponse.json({ quote: randomQuote });
//   } catch (error) {
//     console.error("Quote generation error:", error);
//     return NextResponse.json({ error: "Failed to generate quote" }, { status: 500 });
//   }
// }
// app/api/generate-quote/route.ts
import { NextResponse } from 'next/server';

const moodQuotes: Record<string, string[]> = {
  joy: [
    "Life set hai bro, tension mat le!",
    "Aaj toh dil garden-garden ho gaya 🌸",
    "Full on vibes aaj, mast reh!",
  ],
  sadness: [
    "Dil hai ki manta nahi 💔",
    "Mood off hai, par tu strong hai boss!",
    "Kya yaar, zindagi ne maar diya today 🥲",
  ],
  anger: [
    "Gussa aaraha hai toh chill maar, chai pi le 🍵",
    "Mood kharab hai? Uninstall karde problems ko 🔥",
    "Sabko ignore kar, khudko priority de 😤",
  ],
  excited: [
    "Aaj toh scene on hai! 💥",
    "Kuch bada hone wala hai boss 😎",
    "Energy level 1000%, let’s gooo 🚀",
  ],
  neutral: [
    "Bas chal raha hai yeh zindagi ka safari 🛣️",
    "Kuch khaas nahi, but also no stress!",
    "Zindagi 50-50 chal rahi hai 🤷‍♂️",
     
  ],
   fear: [
  "Dar lag raha hai? Toh thoda sa strong ban ja, tu kar sakta hai 💪",
  "Andhera scary hai, par roshni usi ke baad milti hai 🌑✨",
  "Darr ke aage sirf Mountain Dew nahi, success bhi hai 😎",
],

  lazy: [
    "Aaj ka motto: Eat, Sleep, Repeat 😴",
    "Kaam se break lena bhi self-care hai bro!",
    "Productivity kal se, aaj toh relax hi relax 😌",
  ],
  anxious: [
    "Deep breath le, sab theek ho jaayega 💆‍♂️",
    "Overthinking is the real villain, not you 👀",
    "Thoda slow chal, race abhi baaki hai 🧠",
  ],
};

export async function POST(req: Request) {
  try {
    const { emotion } = await req.json();
    const cleanEmotion = emotion?.toLowerCase().trim(); // Normalize input
    const quotes = moodQuotes[cleanEmotion] || moodQuotes['neutral'];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return NextResponse.json({ quote: randomQuote });
  } catch (error) {
    console.error("Quote generation error:", error);
    return NextResponse.json({ error: "Failed to generate quote" }, { status: 500 });
  }
}
