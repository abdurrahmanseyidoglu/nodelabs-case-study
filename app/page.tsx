import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <h1 className="mb-5 text-4xl font-bold">Home page 🏡</h1>
        <h1 className="mb-5 text-xl">This page should be visible to everyone ✅</h1>
        <Link
          href="/dashboard"
          className="p-3 bg-amber-200 block w-fit rounded-primary font-bold hover:bg-amber-500"
        >
          Go to Dashboard 🔐
        </Link>
      </div>
    </div>
  );
}
