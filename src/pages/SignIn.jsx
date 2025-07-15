import AuthForm from '../components/AuthForm';

const SignIn = () => {
  return <AuthForm type="sign-in" />;
};
// const [form, setForm] = useState({
//   email: "",
//   password: "",
// });
// const { signIn, setActive, isLoaded } = useSignIn();
// // const [error, setError] = useState("");
// // const [status, setStatus] = useState("start");
// const navigate = useNavigate();
// // const [code, setCode] = useState(null);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!isLoaded) return;

//   try {
//     const signInAttempt = await signIn.create({
//       identifier: form.email,
//       password: form.password,
//     });

//     // If sign-in process is complete, set the created session as active
//     // and redirect the user
//     if (signInAttempt.status === "complete") {
//       await setActive({ session: signInAttempt.createdSessionId });
//       navigate("/");
//     } else {
//       // If the status isn't complete, check why. User might need to
//       // complete further steps.
//       console.error(JSON.stringify(signInAttempt, null, 2));
//     }
//   } catch (err) {
//     // See https://clerk.com/docs/custom-flows/error-handling
//     // for more info on error handling
//     console.error(JSON.stringify(err, null, 2));
//   }
// };

// return (
//   <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
//     <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//     <input
//       type="email"
//       placeholder="Email"
//       value={form.email}
//       onChange={(e) => setForm({ ...form, email: e.target.value })}
//       className="w-full p-2 border rounded mb-2"
//       required
//     />
//     <input
//       type="password"
//       placeholder="Password"
//       value={form.password}
//       onChange={(e) => setForm({ ...form, password: e.target.value })}
//       className="w-full p-2 border rounded mb-4"
//       required
//     />
//     <button
//       type="submit"
//       className="w-full bg-blue-600 text-white py-2 rounded"
//     >
//       Sign In
//     </button>
//     <p className="mt-2">
//       Don't have an account? <span className="text-blue-300">Sign Up</span>
//     </p>
//     {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
//   </form>

export default SignIn;
