"use client";
import { useWindowScroll } from "react-use";
import Container from "../Container";
import Categories from "./Categories";
import Collection from "./Collection";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { y } = useWindowScroll();

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
            py-4
            border-b-[1px]        
        "
      >
        <Container zIndex={20}>
          <div
            className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0
            "
          >
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      {y < 50 && <Collection />}
      <Categories />
    </div>
  );
};

export default Navbar;
