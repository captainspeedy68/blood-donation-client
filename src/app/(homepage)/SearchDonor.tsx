"use client";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const SearchDonor = () => {
  
  const [startDate, setDate] = useState<Date | null>(null);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];


  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  return (
    <div className="flex relative justify-evenly items-center">
      {/* Blood Group Dropdown */}
      <div className="flex flex-col">
        <label> Select Blood</label>
        <select className="select select-bordered join-item border-2 bg-white rounded-sm w-44 max-w-48 min-h-2 h-9 p-1 text-xs">
          <option disabled selected>
            Select
          </option>
          {bloodGroups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label >Select District</label>
      <select className="select select-bordered join-item border-2 bg-white rounded-sm w-44 max-w-48 min-h-2 h-9 p-1 text-xs">
        <option disabled selected>
          Select District
        </option>
        <option>Sci-fi</option>
        <option>Drama</option>
        <option>Action</option>
      </select>
      </div>
      

      {/* Date Picker */}
      <div>
        <h1>Select a Date</h1>
        <DatePicker
          className="bg-white custom-datepicker border-2 p-2 rounded-md"
          selected={startDate}
          onChange={handleDateChange}
          showYearDropdown
          showMonthDropdown
          showIcon
        />
      </div>

      {/* Search Button */}
      <button className=" bg-[#003752] items-center align-middle text-white rounded-sm w-36 mt-5 h-9">Search</button>
    </div>
  );
};

export default SearchDonor;
