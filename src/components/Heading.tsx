import React from "react";

const Heading = () => {
  return (
    <div className="wave-container relative">
      <img
        className="md:h-[900px] w-full "
        src="https://i.postimg.cc/RF1C0Z5D/7cb1aa65b5dc5595c84f0f5112cd9e86.png"
        alt=""
      />
      <div className="absolute top-48 left-9">
        <h1 className=" text-white font-bold text-7xl bg-[#003752] bg-opacity-40 rounded-xl items-center flex justify-center w-[1100px] p-7">
          Save Lives By Donating Blood Today
        </h1>
        <h2 className="text-white mt-4 ml-1 py-2 text-xl font-normal">
          Join BloodLine's mission to make Bangladesh healthy. Your donation can
          save countless lives. <br></br> Act now and be a hero.
        </h2>
        <div className="mt-7">
          <button className="btn absolute rounded-xl bg-[#003752] left-10 text-lg text-white font-normal">
            Join As A Donor
          </button>
          <button className="btn absolute rounded-xl border-4 bg-transparent font-normal left-56 border-[#003752] text-lg text-white">
            Join As A Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default Heading;
