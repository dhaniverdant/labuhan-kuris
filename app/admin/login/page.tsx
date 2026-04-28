import { login } from "./actions";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Login Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          Masuk dengan akun admin Supabase yang tadi sudah kamu buat.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />
          </div>

          <button
            formAction={login}
            className="w-full rounded-xl bg-black px-4 py-2 text-white"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
