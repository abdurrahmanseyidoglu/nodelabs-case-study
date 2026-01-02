import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <h1 className="mb-5">Woah! Such empty :D</h1>
      <Link
        href="/dashboard"
        className="p-3 bg-amber-200 block w-fit rounded-primary hover:bg-amber-500"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
