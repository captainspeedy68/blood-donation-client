"use client";

import React, { useState } from "react";
import FormDivision from "./FormDivision";
import axios from "axios";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAddress = {
  division: string;
  district: string;
};

export type TDonor = {
  id: string;
  user: string;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth?: Date;
  email: string;
  contactNumber: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: TAddress;
};

const DivisionSelector = ({
  divisions,
}: {
  divisions: Array<{ name: string; districts: string[] }>;
}) => {
  const [donors, setDonors] = useState<TDonor[]>([]);

  const handleMailSender = async () => {
    const url = "http://localhost:4000/api/send-email/send";

    // Extract email addresses from the selected donors
    const emails = donors.map((donor) => donor.email);
    console.log(emails);
    try {
      const result = await axios.post(url, { recipients: emails });
      alert("Emails sent successfully!");
    } catch (error) {
      alert(`Error sending emails: ${error.message}`);
    }
  }; // This is where the missing closing brace was added.

  return (
    <div>
      <FormDivision divisions={divisions} setDonors={setDonors}></FormDivision>

      {donors.length > 0 && (
        <div>
          <div>Found {donors.length} matches</div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* Table Head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {donors.map((donor, i) => (
                  <tr key={donor.id}>
                    <th>{i + 1}</th>
                    <td>{donor.name.firstName}</td>
                    <td>{donor.gender}</td>
                    <td>{donor.bloodGroup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Button to send mail */}
          <button onClick={handleMailSender} className="btn btn-primary">
            Send Mail To All
          </button>
        </div>
      )}
    </div>
  );
};

export default DivisionSelector;
