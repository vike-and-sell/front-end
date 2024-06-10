import vikeLogo from "../../assets/vikelogo.svg";
import { IoMenu } from "react-icons/io5";
import { NavigationBar } from "./NavigationBar";

interface HeaderProps {
  isActive: boolean;
  onClick: () => void;
}

export default function Header({ onClick, isActive }: HeaderProps) {
  return (
    <header className='flex gap-4 relative border-b-[0.5px] border-slate-300 bg-white lg:border-none  flex-col'>
      <div className='z-20 flex items-center justify-between p-4 bg-white lg:mr-5'>
        <img src={vikeLogo} alt='Vike Logo' />
        <button onClick={onClick} className='lg:hidden'>
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
  );
}
