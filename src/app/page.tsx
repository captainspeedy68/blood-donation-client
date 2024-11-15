import Heading from "@/app/(homepage)/Heading";
import Image from "next/image";
import Connecting from "./(homepage)/Connecting";

export default function Home() {
  return (
    <div className=" min-h-screen pb-20">
      <Heading></Heading>
      <Connecting></Connecting>
    </div>
  );
}
