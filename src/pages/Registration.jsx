import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { AuthContext } from "../Provider/AuthProvider";
import { imageUpload } from "../Api/utlis";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import bloodDrop from "../assets/Lotties/Blood drop.json";

const Registration = () => {
  const {
    createUser,
    updateUser,
    createUserWithLoginGoogle,
    setUser,
    loading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);

  const districtsAndUpazilas = {
    Dhaka: [
      "Savar",
      "Dhamrai",
      "Keraniganj",
      "Nawabganj",
      "Demra",
      "Tongi",
      "Shibpur",
      "Siddhirganj",
      "Narayanganj",
    ],
    Chittagong: [
      "Patiya",
      "Sitakunda",
      "Boalkhali",
      "Rangunia",
      "Anwara",
      "Fatikchhari",
      "Mirsharai",
      "Lohagara",
      "Banshkhali",
      "Sandwip",
    ],
    Rajshahi: [
      "Paba",
      "Durgapur",
      "Charghat",
      "Bagha",
      "Mohonpur",
      "Tanore",
      "Godagari",
      "Shibganj",
      "Niamatpur",
    ],
    Khulna: [
      "Batiaghata",
      "Dacope",
      "Dumuria",
      "Koyra",
      "Terokhada",
      "Paikgachha",
      "Kalaroa",
      "Shyamnagar",
      "Assasuni",
    ],
    Barishal: [
      "Bakerganj",
      "Barisal Sadar",
      "Agailjhara",
      "Muladi",
      "Banaripara",
      "Wazirpur",
      "Gournadi",
      "Uzirpur",
      "Kalapara",
    ],
    Sylhet: [
      "Moulvibazar",
      "Rajnagar",
      "Juri",
      "Kulaura",
      "Sreemangal",
      "Fenchuganj",
      "Balaganj",
      "Gowainghat",
      "Companiganj",
    ],
    Rangpur: [
      "Kurigram",
      "Gaibandha",
      "Lalmonirhat",
      "Nilphamari",
      "Rangpur Sadar",
      "Kachdana",
      "Pirganj",
      "Pirgachha",
      "Badarganj",
    ],
    Khagrachari: [
      "Dighinala",
      "Lakshmipur",
      "Manikchhari",
      "Mahalchhari",
      "Madhupur",
      "Mohalchhari",
      "Khagrachhari Sadar",
    ],
    Comilla: [
      "Laksam",
      "Titas",
      "Muradnagar",
      "Debidwar",
      "Monohorgonj",
      "Kamalnagar",
      "Comilla Sadar",
      "Nangalkot",
    ],
    Jessore: [
      "Abhaynagar",
      "Chaugachha",
      "Keshabpur",
      "Jessore Sadar",
      "Benapole",
      "Shashibhushon",
      "Bagherpara",
      "Jhikargachha",
    ],
    Mymensingh: [
      "Mymensingh Sadar",
      "Trishal",
      "Haluaghat",
      "Fulbaria",
      "Phulpur",
      "Gafargaon",
      "Nandail",
      "Bhaluka",
      "Kishoreganj",
    ],
    Noakhali: [
      "Begumganj",
      "Chatkhil",
      "Companiganj",
      "Senbagh",
      "Haimchar",
      "Noakhali Sadar",
      "Chhagalnaiya",
    ],
    Madaripur: ["Madaripur Sadar", "Shibchar", "Rajoir", "Kalkini", "Lohajang"],
    Shariatpur: [
      "Shariatpur Sadar",
      "Naria",
      "Gosairhat",
      "Bhedarganj",
      "Zinzira",
      "Chandpur",
    ],
    Chuadanga: [
      "Chaudanga",
      "Maheshpur",
      "Shyamnagar",
      "Bhandaria",
      "Khanjahan Ali",
      "Bagerhat",
    ],
    Sunamganj: [
      "Jagannathpur",
      "Chhatak",
      "Dasmina",
      "Shalla",
      "Sadar",
      "Moulvibazar",
    ],
    Bogura: [
      "Sadar",
      "Sherpur",
      "Shibganj",
      "Gabtali",
      "Kahaloo",
      "Khetlal",
      "Dhunat",
      "Nandigram",
    ],
  };
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setUpazilas(districtsAndUpazilas[selectedDistrict] || []);
  };

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      confirm_password,
      bloodGroup,
      district,
      upazila,
    } = data;

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      let photoURL = "";
      if (data.image && data.image[0]) {
        photoURL = await imageUpload(data.image[0]);
      }

      await createUser(email, password);
      await updateUser(name, photoURL);

      const userData = {
        name,
        email,
        photoURL,
        bloodGroup,
        district: district || "",
        upazila: upazila || "",
        phone: "",
        address: "",
        role: "donor",
        status: "active",
      };

      await fetch("https://assaingment-12-server-iota.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setUser(userData);
      toast.success("Signup Successful");
      reset();
      navigate("/dashboard/profile");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await createUserWithLoginGoogle();

      const userData = {
        name: data?.user?.displayName || "",
        email: data?.user?.email,
        photoURL: data?.user?.photoURL,
        bloodGroup: "",
        district: "",
        upazila: "",
        phone: "",
        address: "",
        role: "donor",
        status: "active",
      };

      await fetch("https://assaingment-12-server-iota.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setUser(userData);
      toast.success("Signup Successful");
      navigate("/dashboard/profile");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-red-100 dark:bg-gray-700 dark:text-white px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8  p-6 rounded-md max-w-6xl w-full">
        {/* ✅ Lottie Animation */}
        <div className="hidden lg:block w-1/2 ">
          <Lottie animationData={bloodDrop} loop={true} />
        </div>

        {/* ✅ Registration Form */}
        <div className="w-full lg:w-1/2 ">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-red-600">Donation Blood</h1>
            <p className="text-sm text-gray-400">
              Welcome to the Blood Donation Platform
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                />
              </div>

              {/* Avatar Image + Preview */}
              <div>
                <label className="block text-sm mb-1">Avatar Image</label>
                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 w-20 h-20 rounded-full object-cover border"
                  />
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm mb-1">Blood Group</label>
                <select
                  {...register("bloodGroup", { required: true })}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                >
                  <option value="">Select</option>
                  {["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"].map(
                    (g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm mb-1">District</label>
                <select
                  {...register("district")}
                  onChange={handleDistrictChange}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                >
                  <option value="">Select</option>
                  {Object.keys(districtsAndUpazilas).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm mb-1">Upazila</label>
                <select
                  {...register("upazila")}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                >
                  <option value="">Select</option>
                  {upazilas.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm mb-1">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirm_password", { required: true })}
                  className="w-full px-3 py-2 border rounded-md border-red-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-red-600 text-white rounded-md"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600">
                Login here
              </Link>
            </p>

            {/* Google Sign In */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2 w-full hover:bg-red-600 transition-transform ease-in-out duration-150 hover:text-white"
              >
                <FcGoogle /> Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
