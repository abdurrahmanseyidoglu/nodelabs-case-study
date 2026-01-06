import { useEffect, useState } from "react";

export default function GoogleSignInMessage() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showMessage) return null;

  return (
    <div className="my-9">
      <h1 className="text-5xl text-lime-500 mb-5">
        Congrats! You have signed in with Google!
      </h1>
      <p className="text-2xl text-amber-500">
        You will not see Data because this is a demo, The backend OAuth token
        endpoint is not yet implemented.
      </p>
    </div>
  );
}
