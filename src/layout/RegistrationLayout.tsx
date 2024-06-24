import vikeLogo from "../assets/vikelogo.svg";
import { Outlet } from "react-router-dom";

export default function RegistrationLayout() {
    return (
        <>
            <div className="bg-pri-blue flex h-screen justify-center items-center">
                <div className="bg-white rounded-lg flex flex-col justify-between h-[85%] lg:h-[90%] w-[80%] sm:w-[60%]"> 
                    <div className="h-full">
                        <Outlet></Outlet>
                    </div>

                    <div className="md:basis-[70px] lg:basis-[55px] xl:basis-[65px] pb-6 self-center">
                        <img src={vikeLogo} alt='Vike Logo' className="object-contain md:h-full"/>  
                    </div>                    
                </div>
            </div>
        </>
    );
}