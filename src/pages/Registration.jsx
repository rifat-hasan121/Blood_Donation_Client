import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { AuthContext } from "../Provider/AuthProvider";
import { imageUpload } from "../Api/utlis";
import { useForm } from "react-hook-form";

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
    watch,
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

      const result = await createUser(email, password);
      await updateUser(name, photoURL);

      const userData = {
        name,
        email,
        photoURL,
        bloodGroup,
        district,
        upazila,
        phone: "",
        address: "",
        role: "donor",
      };

      await fetch("http://localhost:3000/users", {
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
      };

      await fetch(`http://localhost:3000/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setUser(userData);

      toast.success("Signup Successful");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-red-600">
            Donation Blood
          </h1>
          <p className="text-sm text-gray-400">
            Welcome to the Blood Donation Platform
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Avatar Image
              </label>
              <input type="file" {...register("image")} accept="image/*" />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              />
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block mb-2 text-sm">
                Blood Group
              </label>
              <select
                {...register("bloodGroup", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block mb-2 text-sm">
                District
              </label>
              <select
                {...register("district", { required: true })}
                onChange={handleDistrictChange}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              >
                <option value="">Select District</option>
                {Object.keys(districtsAndUpazilas).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="upazila" className="block mb-2 text-sm">
                Upazila
              </label>
              <select
                {...register("upazila", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirm_password", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-red-300"
              />
            </div>
          </div>

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

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600">
              Login here
            </Link>
          </p>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center gap-2 border rounded-lg px-4 py-2 w-full"
            >
              <FcGoogle /> Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
