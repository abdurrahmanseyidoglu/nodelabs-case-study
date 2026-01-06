"use client"; // Error boundaries must be Client Components

import Button from "@/components/Common/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <h2 className="text-3xl text-dark-1 mb-3">Something went wrong!</h2>
      <Button
        className="w-fit! px-10"
        onClick={() => reset()}
        variant={"primary"}
        text="Try again"
      />
    </div>
  );
}
