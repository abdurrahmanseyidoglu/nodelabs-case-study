"use client";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  // !TODO: Handle OAuth Login
  const handleGoogleLogin = () => {
    console.log("Login via Google");
  };

  return (
    <>
      <form
        className="flex flex-col w-86 mb-6"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Input
          {...register("email")}
          type="email"
          name="email"
          autoComplete="email"
          id="email"
          label="Email"
          placeholder="Enter your email"
        />
        <Input
          {...register("password")}
          type="password"
          name="password"
          autoComplete="current-password"
          id="password"
          label="Password"
          placeholder="Enter your password"
        />
        <button
          className="w-full py-3.5 bg-primary rounded-primary text-dark-1 font-semibold hover:brightness-95 ease-in-out duration-150 hover:cursor-pointer active:brightness-90 mb-4"
          type="submit"
        >
          Sign In
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 border border-gray-5 rounded-primary  hover:bg-gray-100 ease-in-out duration-150 hover:cursor-pointer active:brightness-90"
          onClick={handleGoogleLogin}
        >
          <Image
            src="./GoogleLogo.svg"
            alt="googleLogo"
            width={24}
            height={24}
          />
          <p className="text-dark-3 font-semibold"> Sign in with Google</p>
        </button>
      </form>
      <div className="flex items-center justify-center gap-1 text-sm">
        <p className="text-dark-3 ">{`Don't have an account?`}</p>
        <Link
          href={"/signup"}
          className="text-dark-1 relative curved-line hover:underline"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
