import Hero from "@/components/shared/hero";
import Policies from "@/components/shared/policies";
import ProductTabHome from "@/components/shared/productTabHome";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Policies />
      <ProductTabHome />
    </>
  );
}
