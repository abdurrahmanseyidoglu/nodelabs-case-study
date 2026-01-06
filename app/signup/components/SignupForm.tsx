"use client";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { SignupFormData } from "@/types/AuthenticationFormData";
import { _register } from "@/lib/apiActions";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setError(null);
    setLoading(true);
    let redirectPath: string | null = null;

    try {
      await _register(data.fullName, data.email, data.password);
      //TODO: sign user automatically after creating an or redirect him to login with a success message?
      // await signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      //   redirect: false,
      // });
      redirectPath = "/signin?registered=true";
    } catch (err) {
      setError(`${err}`);
      redirectPath = "/signup";
    } finally {
      setLoading(false);
      if (redirectPath) {
        redirect(redirectPath);
      }
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/dashboard" });
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
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Full name must be at least 3 characters long",
            },
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message:
                "Full name can only contain letters, spaces, hyphens, and apostrophes.",
            },
          })}
          type="text"
          name="fullName"
          autoComplete="name"
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          isRequired
        />
        {errors.fullName && (
          <span className="text-red-500 text-sm mb-2 -mt-3 text-wrap">
            {errors.fullName.message}
          </span>
        )}
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
          <span className="text-red-500 text-sm mb-2 -mt-3 block ">
            {errors.email.message}
          </span>
        )}
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
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
          <span className="text-red-500 text-sm mb-2 -mt-3 text-wrap">
            {errors.password.message}
          </span>
        )}
        <Button
          text={loading ? "Creating Account..." : "Create Account"}
          variant="primary"
          hasIcon={false}
          type="submit"
          isDisabled={loading}
        />
        <Button
          text="Sign up with Google"
          variant="secondary"
          hasIcon={true}
          iconAlt="Google logo"
          iconPath="/GoogleLogo.svg"
          iconSize={24}
          type="button"
          onClick={handleGoogleSignUp}
        />
      </form>
      <div className="flex items-center justify-center gap-1 text-sm">
        <p className="text-dark-3 ">{`Already have an account?`}</p>
        <Link
          href={"/signin"}
          className="text-dark-1 relative curved-line hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
