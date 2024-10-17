'use client';
import { useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSingupModal";
import LogoutButtton from "../LogoutButton";
import { useRouter } from "next/navigation";

interface userNavProps {
  userId?: string | null;
}

const UserNav: React.FC<userNavProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isopen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="p-2 relative inline-block border border-gray-300 rounded-full shadow-sm hover:shadow-lg transition-shadow">
      <button
        onClick={() => setIsOpen(!isopen)}
        className="flex items-center space-x-2 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
      >
        {/* Hamburger Menu Icon */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        {/* User Icon */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {isopen && (
        <div className="flex flex-col cursor-pointer w-[220px] absolute top-[60px] right-0 bg-white border border-gray-200 rounded-xl shadow-lg transition-all">
          {userId ? (
            <>
              {/* Menu Links for Authenticated Users */}
              <MenuLink
                label="My Properties"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/myproperties');
                }}
              />
              <MenuLink
                label="My Favourites"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/myfavourites');
                }}
              />
              <MenuLink
                label="My Reservations"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/myreservation');
                }}
              />
              <div className="border-t border-gray-200 my-2"></div>
              <LogoutButtton />
            </>
          ) : (
            <>
              {/* Menu Links for Guests */}
              <MenuLink
                label="Login"
                onClick={() => {
                  setIsOpen(false);
                  loginModal.open();
                }}
              />
              <MenuLink
                label="Sign Up"
                onClick={() => {
                  setIsOpen(false);
                  signupModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
