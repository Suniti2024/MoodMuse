 export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold drop-shadow-lg">🎧 MoodMuse</h1>
        <p className="text-xl text-gray-200">
          Discover content tailored to your emotions — powered by AI and your voice.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            Signup
          </a>
          <a
            href="/home"
            className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            Free Trial
          </a>
        </div>
      </div>
    </main>
  );
}
