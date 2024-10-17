import Link from "next/link";
import Image from "next/image";
import SerarchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import { getUserId } from "@/app/lib/actions";
const Navbar = async () => {
  const userId = await getUserId();
  return (
    <nav className="w-full fixed top-0 left-0 py-2 border-b bg-white z-10 ">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="bnb logo"
              width={100}
              height={38}
            ></Image>
          </Link>
          <div className="flex space-x-6">
            <SerarchFilters />
          </div>
          <div className="flex items-center space-x-6">
            <AddPropertyButton userId={userId} /> {/**add property*/}
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
