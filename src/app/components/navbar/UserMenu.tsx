"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import UseRegisterModal from "@/app/hooks/useRegisterModal";
import UseLoginModal from "@/app/hooks/useLoginModal";

const UserMenu = () => {
  const registerModal = UseRegisterModal();
  const loginModal = UseLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative z-20">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
            "
        >
          Admin Console
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hower:shadow-md
                transition
            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem 
                onClick={loginModal.onOpen}
                label="Sign In"
              />
              <MenuItem 
                onClick={registerModal.onOpen}
                label="Sign Up"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
