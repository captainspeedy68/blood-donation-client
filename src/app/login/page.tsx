'use client';

import { useState, useContext, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Next.js 13 router
import Swal from "sweetalert2";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";

const Login = () => {
  const { loginUser, googleSignIn } = useContext(AuthContext)!;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string>("client"); // Default role
  const [userData, setUserData] = useState({
    contactNumber: "",
    gender: "male",
    division: "",
    district: "",
    dateOfBirth: "",
    bloodGroup: "",
    password: "", // Add password field to the state
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleGoogle = async () => {
    try {
      // Ensure role is selected before proceeding
      if (!role) {
        Swal.fire({
          title: "Error",
          text: "Please select a role before signing in.",
          icon: "warning",
          confirmButtonText: "Close",
        });
        return;
      }

      // Perform Google sign-in
      const res = await googleSignIn();
    //   console.log(res.user);

      // Validate bloodGroup
      if (!userData.bloodGroup) {
        Swal.fire({
          title: "Error",
          text: "Please select a blood group.",
          icon: "warning",
          confirmButtonText: "Close",
        });
        return;
      }

      // Validate password
      if (!userData.password) {
        Swal.fire({
          title: "Error",
          text: "Please enter a password.",
          icon: "warning",
          confirmButtonText: "Close",
        });
        return;
      }

      // Prepare the client object based on form input
      const client = {
        email: res.user.email,
        name: {
          firstName: res.user.displayName.split(" ")[0],
          lastName: res.user.displayName.split(" ").slice(-1).join(" "),
        },
        contactNumber: userData.contactNumber,
        gender: userData.gender,
        dateOfBirth: userData.dateOfBirth,
        bloodGroup: userData.bloodGroup,
        presentAddress: {
          division: userData.division,
          district: userData.district,
        },
         // Include the password
      };
      const password= userData.password;
    //   console.log(client);
      
      // Set the appropriate endpoint based on role
      const endpoint =
        role === "client"
          ? "http://localhost:4000/api/user/create-client"
          : "http://localhost:4000/api/user/create-donor";

      // Send the client object with the password
      const userResponse = await axios.post(endpoint, {
        password, client
      });

      const data = userResponse.data;
    //   console.log(data);

      Swal.fire({
        title: "Successfully Registered",
        text: "Welcome!",
        icon: "success",
        confirmButtonText: "Done",
      });

      router.push("/"); // Redirect to home or a specific page
    } catch (error: any) {
      console.error("Axios error:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response data:", error.response.data);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Registration failed. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } else if (error.request) {
        // No response was received from the server
        console.error("Request data:", error.request);
        Swal.fire({
          title: "Error",
          text: "No response from server. Please check your connection.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } else {
        // Something else caused the error
        console.error("Error message:", error.message);
        Swal.fire({
          title: "Error",
          text: error.message || "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 text-white">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            {/* Role Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Role</span>
              </label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="client">Client</option>
                <option value="donor">Donor</option>
              </select>
            </div>

            {/* Contact Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <input
                type="text"
                name="contactNumber"
                value={userData.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter your contact number"
                className="input input-bordered"
                required
              />
            </div>

            {/* Gender Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="select select-bordered"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleInputChange}
                className="select select-bordered"
                required
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Address Fields */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Division</span>
              </label>
              <input
                type="text"
                name="division"
                value={userData.division}
                onChange={handleInputChange}
                placeholder="Enter your division"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <input
                type="text"
                name="district"
                value={userData.district}
                onChange={handleInputChange}
                placeholder="Enter your district"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <div onClick={handleGoogle} className="btn btn-primary">
                Google Sign In
              </div>
            </div>
            {errorMessage && <p className="text-black">{errorMessage}</p>}
            <div>
              <p>
                Don't have an account?{" "}
                <Link href="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
