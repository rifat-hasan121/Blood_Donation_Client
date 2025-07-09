import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import {
  MdPerson,
  MdEmail,
  MdLocationCity,
  MdPlace,
  MdLocalHospital,
  MdHome,
  MdBloodtype,
  MdDateRange,
  MdAccessTime,
  MdMessage,
} from "react-icons/md";

const AddBloodForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

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
    // Add more districts and upazilas as necessary
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Watch district changes for upazila dropdown
  const selectedDistrict = watch("recipientDistrict");

  React.useEffect(() => {
    if (selectedDistrict) {
      setUpazilas(districtsAndUpazilas[selectedDistrict] || []);
    }
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      ...data,
      status: "Pending",
    };

    try {
      const response = await axiosSecure.post(
        "/donation-requests",
        donationRequest
      );

      if (response.status === 200) {
        toast.success("Donation request created successfully!");
        reset();
        navigate("/dashboard/My-donation-request");
      } else {
        toast.error("Error creating donation request.");
      }
    } catch (error) {
      console.error("Error submitting the donation request:", error);
      toast.error("Failed to create donation request.");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center text-gray-800 rounded-xl bg-gray-50 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-3xl p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Donation Request
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requester Name */}
          <InputField
            label="Requester Name"
            icon={<MdPerson />}
            value={user?.displayName || ""}
            readOnly
          />

          {/* Requester Email */}
          <InputField
            label="Requester Email"
            icon={<MdEmail />}
            value={user?.email || ""}
            readOnly
          />

          {/* Recipient Name */}
          <InputField
            label="Recipient Name"
            icon={<MdPerson />}
            {...register("recipientName", { required: true })}
            placeholder="Recipient Name"
            error={errors.recipientName}
          />

          {/* Recipient District */}
          <SelectField
            label="Recipient District"
            icon={<MdLocationCity />}
            {...register("recipientDistrict", { required: true })}
          >
            <option value="">Select District</option>
            {Object.keys(districtsAndUpazilas).map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </SelectField>

          {/* Recipient Upazila */}
          <SelectField
            label="Recipient Upazila"
            icon={<MdPlace />}
            {...register("recipientUpazila", { required: true })}
            disabled={!upazilas.length}
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upa) => (
              <option key={upa} value={upa}>
                {upa}
              </option>
            ))}
          </SelectField>

          {/* Hospital Name */}
          <InputField
            label="Hospital Name"
            icon={<MdLocalHospital />}
            {...register("hospitalName", { required: true })}
            placeholder="Hospital Name"
            error={errors.hospitalName}
          />

          {/* Full Address */}
          <TextAreaField
            label="Full Address"
            icon={<MdHome />}
            {...register("fullAddress", { required: true })}
            placeholder="Full Address"
            error={errors.fullAddress}
          />

          {/* Blood Group */}
          <SelectField
            label="Blood Group"
            icon={<MdBloodtype />}
            {...register("bloodGroup", { required: true })}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </SelectField>

          {/* Donation Date */}
          <InputField
            label="Donation Date"
            icon={<MdDateRange />}
            type="date"
            {...register("donationDate", { required: true })}
            error={errors.donationDate}
          />

          {/* Donation Time */}
          <InputField
            label="Donation Time"
            icon={<MdAccessTime />}
            type="time"
            {...register("donationTime", { required: true })}
            error={errors.donationTime}
          />

          {/* Request Message */}
          <TextAreaField
            label="Request Message"
            icon={<MdMessage />}
            {...register("requestMessage", { required: true })}
            placeholder="Additional message (optional)"
            error={errors.requestMessage}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBloodForm;

// Reusable Input Field
const InputField = React.forwardRef(({ label, icon, error, ...rest }, ref) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="flex items-center border rounded bg-gray-50">
      <span className="px-2 text-gray-600 text-xl">{icon}</span>
      <input
        ref={ref}
        {...rest}
        className={`w-full px-3 py-2 outline-none bg-transparent ${
          rest.readOnly ? "text-gray-500" : "text-gray-800"
        }`}
      />
    </div>
    {error && (
      <span className="text-xs text-red-500">This field is required</span>
    )}
  </div>
));

// Reusable Textarea Field
const TextAreaField = React.forwardRef(
  ({ label, icon, error, ...rest }, ref) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-start border rounded bg-gray-50">
        <span className="px-2 pt-2 text-gray-600 text-xl">{icon}</span>
        <textarea
          ref={ref}
          {...rest}
          rows={3}
          className="w-full px-3 py-2 outline-none bg-transparent text-gray-800"
        ></textarea>
      </div>
      {error && (
        <span className="text-xs text-red-500">This field is required</span>
      )}
    </div>
  )
);

// Reusable Select Field
const SelectField = React.forwardRef(
  ({ label, icon, error, children, ...rest }, ref) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center border rounded bg-gray-50">
        <span className="px-2 text-gray-600 text-xl">{icon}</span>
        <select
          ref={ref}
          {...rest}
          className="w-full px-3 py-2 outline-none bg-transparent text-gray-800"
        >
          {children}
        </select>
      </div>
      {error && (
        <span className="text-xs text-red-500">This field is required</span>
      )}
    </div>
  )
);
