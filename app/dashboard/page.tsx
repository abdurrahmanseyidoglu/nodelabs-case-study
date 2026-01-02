import { auth } from "@/auth";
import BankCardIndex from "@/components/Common/BankCard/BankCardIndex";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {/* TODO: Fix ts and get user profile info */}
        <pre>{`${JSON.stringify(session?.user.fullName)}`}</pre>
      </div>
      {/* !TODO: Make this Dynamic via props  */}
      <div className="bg-red-50 p-8">
        <BankCardIndex />
      </div>
    </div>
  );
}
