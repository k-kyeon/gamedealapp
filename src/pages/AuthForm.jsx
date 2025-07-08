"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

const AuthForm = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = type === "sign-in" ? signInSchema : signUpSchema;

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    // ✅ This will be type-safe and validated.
    console.log("Form values: ", values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full min-h-screen bg-blue-100 justify-center items-center border-2 border-red-600"
        >
          <div className="w-3/4 bg-white p-20 rounded-4xl">
            <div className="flex flex-col space-y-8 ">
              <h1 className="font-bold">
                {type === "sign-in" ? "Sign In" : "Sign Up"}
              </h1>

              {type === "sign-up" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name you will be displayed as.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the email you will log in with.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-center">
              <Button type="submit" className="mt-7 w-3/4" disabled={isLoading}>
                {type === "sign-in" ? "Sign In" : "Sign Up"}

                {isLoading && (
                  <CircleLoader color="#ffffff" size={25} className="ml-2" />
                )}
              </Button>

              {errorMessage && <p>{errorMessage}</p>}

              <div className="flex justify-center mt-5">
                <p className="text-gray-800">
                  {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link
                  to={type === "sign-in" ? "/sign-up" : "/sign-in"}
                  className="ml-1"
                >
                  {type === "sign-in" ? "Sign Up" : "Sign In"}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
