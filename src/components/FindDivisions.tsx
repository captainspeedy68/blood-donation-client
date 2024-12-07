import axios from "axios";
import React from "react";

import {getDivisions} from "@/services/postApi";
import DivisionSelector from "./DivisionSelector";

const FindDivisions = async () => {
  const data = await getDivisions();
  // getDivi
  
  

  const divisions = data.divisions;
  // let selectedDivisions = "";
 
  return (
    <div>
      <DivisionSelector divisions={data.divisions} />
    </div>
  );
};

export default FindDivisions;
