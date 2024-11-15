import React from "react";
import SearchDonor from "../../components/SearchDonor";

const Connecting = () => {
  return (
    <div className=" h-[1000px] bg-[url('https://i.ibb.co.com/TrBjFC9/43d8ac7bb106e4c7c82a84cfa4ca4801.png')]  bg-cover bg-center w-full">
      <div className=" bg-white opacity-90 h-full">
        <div className="flex justify-center pt-40 p-8 items-center ">
          <div className=" flex-1 flex items-center justify-center">
            <div className="justify-center items-center align-middle lg:ml-10">
              <h1 className="font-normal text-6xl">
                Connecting lives through blood donation
              </h1>
              <h3 className="w-[650px] font-medium text-lg">
                BloodLine is a dedicated blood donation service based in Dhaka,
                Bangladesh, committed to saving lives through the power of
                community generosity. Our mission is to ensure that a safe and
                adequate blood supply is readily available to those who need
                it.By building a network of compassionate donors and working
                closely with healthcare providers, Share Blood aims to bridge
                the gap between donors and patients, ensuring timely and
                effective assistance in emergencies.
              </h3>
            </div>
          </div>
          <div className="object-cover flex-1 flex justify-center rounded-lg">
            <img
              className="w-[618px] opacity-full rounded-2xl items-center h-[412px]  object-contain"
              src="https://i.postimg.cc/9FjvYFHH/e4a65d599ad47bb2d6d4874b2574aa43.png"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="text-center font-normal text-2xl mb-12 mt-7">
            Search Donor
          </div>
          <SearchDonor />
        </div>
      </div>
    </div>
  );
};

export default Connecting;
