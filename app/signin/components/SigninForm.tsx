"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
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
        className="flex flex-col w-full mb-6"
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
        <Button
          text="Sign In"
          variant="primary"
          hasIcon={false}
          type="submit"
        />
        <Button
          text="Sign in with Google"
          variant="secondary"
          hasIcon={true}
          iconAlt="Google logo"
          iconPath="./GoogleLogo.svg"
          iconSize={24}
          type="button"
          onClick={handleGoogleLogin}
        />
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
