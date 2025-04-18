import Image from "next/image";
import appImage from "../../public/images/business-competition-animate.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className=" w-full flex items-center justify-center flex-col">
      <Image src={appImage} alt="app-main-image"/>
      <div>
        <p className="text-sm text-orange-500 font-semibold mb-4">Create Clashes And Find Winner</p>
      </div>
      <div>
        <Link href={"/dashboard"}>
            <Button className="bg-orange-500">
              Start Here
            </Button>
        </Link>
      </div>
    </div>
  );
}
