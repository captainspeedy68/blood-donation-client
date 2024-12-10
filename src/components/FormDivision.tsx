import { handleDonorSearch } from "@/services/postApi";
import React, { useState } from "react";
import { TDonor } from "./DivisionSelector";
interface DivisionProps {
  divisions: Array<{ name: string; districts: string[] }>;
  setDonors: React.Dispatch<React.SetStateAction<TDonor[]>>; // Adjust the type based on `donors` state
}
const FormDivision: React.FC<DivisionProps> = ({ divisions, setDonors }) => {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");

  const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];

  const handleSearchClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedBloodGroup || !selectedDivision || !selectedDistrict) {
      alert("Please select all fields!");
      return;
    }

    try {
      const results = await handleDonorSearch(
        selectedBloodGroup,
        selectedDivision,
        selectedDistrict
      );
      // console.log(results);

      setDonors(results.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  const handleBloodGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBloodGroup = event.target.value;
    setSelectedBloodGroup(selectedBloodGroup);
  }

  const handleDivisionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const divisionName = event.target.value;
    // console.log("Selected Division:", divisionName); // Log selected value
    setSelectedDivision(divisionName);
  
    const division = divisions.find((div) => div.name === divisionName);
    setDistricts(division ? division.districts : []);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.target.value;
    // console.log("Selected District:", districtName); // Log selected value
    setSelectedDistrict(districtName);
  };
  return (
    <form className="flex justify-center gap-x-5">
      {/* Division Selector */}

      <div className="flex flex-col">
        <label htmlFor="division" className="mb-2 font-medium">
          Select Blood Group
        </label>
        <select
          onChange={handleBloodGroupChange}
          className="select select-bordered w-full max-w-xs bg-white"
        >
          <option disabled selected>
            Select Blood Group
          </option>
          {bloodGroups?.map((group) => (
            <option key={group.value} value={group.value}>
              {group.value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="division" className="mb-2 font-medium">
          Select Division
        </label>
        <select
          id="division"
          className="select select-bordered w-full max-w-xs bg-white"
          onChange={handleDivisionChange}
        >
          <option value="" disabled selected>
            Select Division
          </option>
          {divisions.map((division) => (
            <option key={division.name} value={division.name}>
              {division.name}
            </option>
          ))}
        </select>
      </div>

      {/* District Selector */}
      {districts.length > 0 && (
        <div className="flex flex-col">
          <label htmlFor="district" className="mb-2 font-medium">
            Select District
          </label>
          <select
            onChange={handleDistrictChange}
            value={selectedDistrict}
            id="district"
            className="select select-bordered w-full max-w-xs bg-white"
          >
            <option value="" disabled selected>
              Select District
            </option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      

      <button type="button" className="btn" onClick={handleSearchClick}>
        Search
      </button>
    </form>
  );
};

export default FormDivision;
