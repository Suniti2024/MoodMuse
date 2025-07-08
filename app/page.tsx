


export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* 🌌 Background Image */}
      <img
        src="/lp.jpg" // Ensure this image exists in public/
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* 🌓 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* 🎯 Center Container with Different Gradient */}
      <div className="z-10 text-center px-6 max-w-3xl w-full space-y-10 bg-gradient-to-br from-white/10 via-purple-500/20 to-indigo-600/30 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-white/10">

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight drop-shadow-xl leading-tight">
          🎧 Welcome to <span className="text-purple-300">MoodMuse</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 font-medium">
          Your mood matters. Experience AI-curated quotes, music, and visuals that match how you feel.
        </p>

        {/* ✨ Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Signup
          </a>
          <a
            href="/home"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Try for Free
          </a>
        </div>

        <p className="text-sm text-gray-300 italic pt-4">
          “Let your feelings guide the experience.”
        </p>
      </div>
    </main>
  );
}


//  export default function HomePage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white px-6">
//       <div className="max-w-3xl w-full text-center space-y-8">
//         <h1 className="text-5xl font-bold drop-shadow-lg">🎧 MoodMuse</h1>
//         <p className="text-xl text-gray-200">
//           Discover content tailored to your emotions — powered by AI and your voice.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//           <a
//             href="/login"
//             className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-semibold shadow-md transition"
//           >
//             Login
//           </a>
//           <a
//             href="/signup"
//             className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold shadow-md transition"
//           >
//             Signup
//           </a>
//           <a
//             href="/home"
//             className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-full font-semibold shadow-md transition"
//           >
//             Free Trial
//           </a>
//         </div>
//       </div>
//     </main>
//   );
// }
