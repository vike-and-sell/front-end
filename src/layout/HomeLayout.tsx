import { useState } from "react";
import { NavigationBar } from "../components/HomeLayout/NavigationBar";
import Header from "../components/HomeLayout/Header";
import SearchBar from "../components/HomeLayout/SearchBar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="lg:grid h-screen lg:items-start lg:grid-rows-[140px_1fr]  lg:grid-cols-[300px_1fr]">
        <div className="lg:flex lg:border-b-[0.5px] border-slate-300  lg:p-4 col-span-full">
          <Header
            isActive={isActive}
            onClick={() => {
              setIsActive(!isActive);
            }}
          ></Header>
          <SearchBar></SearchBar>
        </div>
        <div className="bg-pri-blue items-stretch h-full hidden lg:block rounded-t-[40px] mx-5">
          <NavigationBar></NavigationBar>
        </div>
        <div className="overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
