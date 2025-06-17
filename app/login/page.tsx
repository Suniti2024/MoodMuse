// 'use client';
// import { useState } from 'react';

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setMessage(`Welcome, ${data.user.username} 🎉`);
//     } else {
//       setMessage(data.error || 'Login failed ❌');
//     }
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
//         <button type="submit">Log In</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
if (res.ok) {
  localStorage.setItem("email", data.user.email); // ✅ Set email in localStorage
  // Now redirect or show success message
} else {
  // Show error
  console.error(data.error);
}

    if (res.ok) {
      setMessage(`Welcome, ${data.user.username} 🎉`);
      setTimeout(() => {
        router.push('/home'); // Redirect to page.tsx
      }, 1500);
    } else {
      setMessage(data.error || 'Login failed ❌');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
