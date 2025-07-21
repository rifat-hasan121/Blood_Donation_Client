import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import Lottie from "lottie-react";
import bloodDrop from "../../assets/Lotties/Blood drop.json";

const Login = () => {
  const [error, setError] = useState("");
  const { loginUser, createUserWithLoginGoogle, setUser, resetPassword } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const emailRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const passValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passValidation.test(password)) {
      setError(
        "Password should have at least 1 uppercase letter, 1 lowercase letter, and be minimum 6 characters long."
      );
      return;
    }

    try {
      const result = await loginUser(email, password);
      const loggedUser = result.user;

      const res = await fetch(
        `https://assaingment-12-server-iota.vercel.app/users/${loggedUser.email}`
      );
      const dbUser = await res.json();

      if (dbUser?.email) {
        setUser(dbUser);
        localStorage.setItem("bloodUser", JSON.stringify(dbUser));

        if (dbUser.role === "admin" || dbUser.role === "volunteer") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard/profile");
        }

        Swal.fire({
          title: `${dbUser.name || dbUser.email} logged in successfully!`,
          icon: "success",
        });
      } else {
        setError("User not found in database.");
      }
    } catch (error) {
      toast(error.message);
      setError(error.message);
    }
  };

  const saveUserInDB = async (userData) => {
    try {
      await fetch("https://assaingment-12-server-iota.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error("Failed to save user in DB:", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await createUserWithLoginGoogle();
      const user = result.user;

      const res = await fetch(
        `https://assaingment-12-server-iota.vercel.app/users/${user.email}`
      );
      let dbUser = await res.json();

      if (!dbUser?.email) {
        const userData = {
          name: user?.displayName || "",
          email: user?.email,
          photoURL: user?.photoURL || "",
          bloodGroup: "",
          district: "",
          upazila: "",
          phone: "",
          address: "",
          role: "donor",
          status: "active",
        };

        await saveUserInDB(userData);
        dbUser = userData;
      }

      setUser(dbUser);
      localStorage.setItem("bloodUser", JSON.stringify(dbUser));

      if (dbUser.role === "admin" || dbUser.role === "volunteer") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/profile");
      }

      Swal.fire({
        title: `${dbUser.name || dbUser.email} logged in successfully!`,
        icon: "success",
      });
    } catch (error) {
      toast(error.message);
      setError(error.message);
    }
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success("Check your email to reset your password!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-red-100 px-4 py-20">
      {/* Left side: Lottie Animation */}
      <div className="hidden lg:block w-1/3 p-8">
        <Lottie animationData={bloodDrop} loop={true} />
      </div>

      {/* right side: Login Form */}
      <div className="w-full lg:w-1/2 max-w-md bg-white p-8 space-y-4 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-600">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-red-500"
            />
            <div className="text-right mt-1">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">Or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={handleLoginWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?
          <Link to="/signUp" className="text-blue-600 ml-1 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
