"use client";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { SigninFormData } from "@/types/AuthenticationFormData";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const onSubmit = async (data: SigninFormData) => {
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      console.log(data);
      //TODO: research on how to handle response error messages instead of a generic error message (to many requests, invalid credentials.. etc..)
      setError("Error happened");
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    console.log("Login via Google");
  };

  return (
    <>
      {error && (
        <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <form
        className="flex flex-col w-full mb-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email format is invalid",
            },
          })}
          name="email"
          autoComplete="email"
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          isRequired
        />
        {errors.email && (
          <span className="text-red-500 text-sm mb-2 -mt-3 ">
            {errors.email.message}
          </span>
        )}
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long ",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one lowercase letter, one uppercase letter, and one number.",
            },
          })}
          type="password"
          name="password"
          autoComplete="current-password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          isRequired
        />
        {errors.password && (
          <span className="text-red-500 text-sm mb-2 -mt-3  text-wrap">
            {errors.password.message}
          </span>
        )}
        <Button
          text={loading ? "Signing in..." : "Sign In"}
          variant="primary"
          hasIcon={false}
          type="submit"
          isDisabled={loading}
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
