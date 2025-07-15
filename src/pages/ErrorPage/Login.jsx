import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const {
    loginUser,
    createUserWithLoginGoogle,
    setUser,
    resetPassword,
  } = useContext(AuthContext);

  
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

      // fetch user data from backend
      const res = await fetch(`http://localhost:3000/users/${loggedUser.email}`);
      const dbUser = await res.json();

      if (dbUser?.email) {
        setUser(dbUser);
        localStorage.setItem("bloodUser", JSON.stringify(dbUser));

        if (dbUser.role === "admin") {
          navigate("/dashboard");
        } else if (dbUser.role === "volunteer") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard/profile");
        }

        Swal.fire({
          title: `${dbUser.name || dbUser.email} logged in successfully!`,
          icon: "success",
          draggable: true,
        });
      } else {
        setError("User not found in database.");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const saveUserInDB = async (userData) => {
    try {
      await fetch("http://localhost:3000/users", {
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

      const res = await fetch(`http://localhost:3000/users/${user.email}`);
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

      if (dbUser.role === "admin") {
        navigate("/dashboard");
      } else if (dbUser.role === "volunteer") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/profile");
      }

      Swal.fire({
        title: `${dbUser.name || dbUser.email} logged in successfully!`,
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.log(error);
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
    <>
      <div
        className="bg-[url(https://i.pinimg.com/736x/d2/64/65/d264656c53a4c0f70d26f4e14864b350.jpg)] 
        dark:bg-[url(https://wallpaperaccess.com/full/4893666.jpg)] dark:text-white bg-no-repeat bg-center bg-cover py-28"
      >
        <div className="bg-transparent backdrop-blur-sm max-w-md w-11/12 mx-auto p-8 space-y-3 rounded-xl text-white shadow-2xl">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md bg-white border-gray-300 text-gray-800 focus:border-violet-600"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border-gray-300 bg-white dark:text-gray-800 focus:dark:border-violet-600"
              />
              <div className="flex justify-end text-xs text-gray-600">
                <button
                  onClick={handleResetPassword}
                  type="button"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
            >
              Login
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-600">
              Login with social accounts
            </p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleLoginWithGoogle}
              aria-label="Log in with Google"
              className="p-3 rounded-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-center sm:px-6 text-gray-600 mt-4">
            Don't have an account?
            <Link to="/signUp" className="underline text-blue-600 ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
