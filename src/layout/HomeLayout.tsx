import { useState } from "react";
import vikeLogo from "../assets/vikelogo.svg";
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { NavigationBar } from "../components/HomeLayout/NavigationBar";
import { Input } from "@chakra-ui/react";

export default function HomeLayout() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className='lg:grid h-screen lg:items-start lg:grid-rows-[107px] lg:auto-rows-fr lg:grid-cols-[300px_1fr] bg-white lg:gap-y-4'>
        <div className='lg:flex lg:border-b-[0.5px] border-slate-300  lg:p-4 col-span-full'>
          <header className='flex gap-4 relative border-b-[0.5px] border-slate-300 bg-white lg:border-none  flex-col'>
            <div className='z-20 flex items-center justify-between p-4 bg-white lg:mr-5'>
              <img src={vikeLogo} alt='Vike Logo' />
              <button
                onClick={() => {
                  setIsActive(!isActive);
                }}
                className='lg:hidden'
              >
                <IoMenu size={42} color='#166aac' />
              </button>
            </div>
            <div
              className={`lg:hidden absolute left-0 top-full w-full bg-[#166aac] transition-all duration-500 ${
                isActive ? "translate-y-0" : "-translate-y-full"
              } z-10`}
            >
              <NavigationBar></NavigationBar>
            </div>
          </header>
          <div className='flex items-center flex-grow gap-2 p-4'>
            <Input placeholder='Example query...'></Input>
            <button className='bg-[#045693] p-3 rounded-md'>
              <FaSearch color='white' />
            </button>
          </div>
        </div>
        <div className='bg-[#166aac] items-stretch h-full hidden lg:block rounded-t-[40px] mx-5'>
          <NavigationBar></NavigationBar>
        </div>
      </div>
    </>
  );
}
