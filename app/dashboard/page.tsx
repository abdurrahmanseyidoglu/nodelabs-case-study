import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {/* TODO: Fix ts and get user profile info */}
        <pre>{`${JSON.stringify(session?.user.fullName)}`}</pre>
      </div>
    </div>
  );
}
