import Hero from "@/components/shared/hero";
import Policies from "@/components/shared/policies";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Policies />
    </div>
  );
}
