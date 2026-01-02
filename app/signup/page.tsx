"use client";
import Image from "next/image";
import SignupForm from "./components/SignupForm";
import AuthenticationImage from "@/components/Common/AuthenticationImage";
export default function Page() {
  return (
    <div className="flex justify-around h-screen">
      <div className="pt-10 h-full flex flex-col justify-center w-full sm:w-101 px-5">
        <Image src="/Logo.svg" alt="Logo" width={108} height={30} />
        <div className="my-auto w-full">
          <h1 className="text-3xl text-dark-1 mb-2 font-semibold">
            Create new account
          </h1>
          <p className="text-dark-3 mb-6">Welcome! Please Create Account</p>
          <SignupForm />
        </div>
      </div>
      <AuthenticationImage imagePath="/AuthenticationImage.png" />
    </div>
  );
}
