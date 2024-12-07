"use client";

import { handleDonorSearch } from "@/services/postApi";
// import axios from "axios";
// import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";


import React, { useState } from "react";
import FormDivision from "./FormDivision";



const DivisionSelector = ({ divisions }: { divisions: Array<{ name: string; districts: string[] }> }) => {

const [donors, setDonors] = useState<string[]>([])

  return (
    <div>
      <FormDivision divisions={divisions} setDonors={setDonors} ></FormDivision>


      {
        donors &&  <div><div>Found {donors.length} matches</div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Blood Group</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {donors?.map((donor, i )=> <tr>
        <th>{i + 1}</th>
        <td>{donor.name.firstName}</td>
        <td>{donor.gender}</td>
        <td>{donor.bloodGroup}</td>
      </tr>)}
      
      
    </tbody>
  </table>
</div>
          
        </div>
      }
    </div>
  );
};

export default DivisionSelector;
