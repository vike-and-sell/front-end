import vikeLogo from "../../assets/vikelogo.svg";
import { IoMenu } from "react-icons/io5";
import { NavigationBar } from "./NavigationBar";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isActive: boolean;
  onClick: () => void;
}

export default function Header({ onClick, isActive }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex gap-4 relative border-b-[0.5px] border-slate-300 bg-white lg:border-none  flex-col z-30">
      <div className=" flex items-center justify-between p-4 bg-white lg:mr-5 z-30">
        <img
          className="cursor-pointer"
          src={vikeLogo}
          alt="Vike Logo"
          onClick={() => {
            navigate(`/`);
          }}
        />
        <button title="ellipsis" onClick={onClick} className="lg:hidden">
          <IoMenu size={42} color="#166aac" />
        </button>
      </div>
      <div
        onClick={onClick}
        className={`lg:hidden absolute left-0 top-full w-full bg-pri-blue transition-all duration-500 ${
          isActive ? "translate-y-0" : "-translate-y-full"
        } z-10`}
      >
        <NavigationBar></NavigationBar>
      </div>
    </header>
  );
}
