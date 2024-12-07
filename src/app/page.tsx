import Heading from "@/components/Heading";
import Image from "next/image";
import Connecting from "./(homepage)/Connecting";
import JoiningMission from "./(homepage)/JoiningMission";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Heading></Heading>
      <Connecting></Connecting>
      <JoiningMission></JoiningMission>
    </div>
  );
}
