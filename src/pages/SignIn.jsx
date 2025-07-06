import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { signIn, setActive, isLoaded } = useSignIn();

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        <Link to={"/"} />;
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>

      <>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e })}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={onSignInPress}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Code
        </button>
      </>
    </div>
  );
};

export default SignIn;
