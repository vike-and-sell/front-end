import vikeLogo from "../assets/vikelogo.svg";

export default function LoginHeading() {
    return (
        <>
            <div className="bg-white flex-col my-8 mx-2 lg:gap-y-[50px] sm:order-2 sm:flex-1 sm:h-screen h-1/3 flex gap-5 justify-center xl:justify-start xl:pt-32 items-center">
                <div className="sm:basis-1/6">
                    <img src={vikeLogo} alt='Vike Logo' className="object-contain lg:h-full max-w-md"/>  
                 </div>
                <div className="relative text-center">
                    <span className="text-pri-blue xs:text-sm text-xl sm:text-2xl font-bold">
                        Reuse{' '}
                    </span>
                    <span className="text-black text-lg sm:text-2xl font-bold"> 
                        Today, Renew Tomorrow – Join Us!
                    </span>
                </div>
                <div className="relative text-center">
                    <span className="text-sec-yellow text-xl sm:text-2xl font-bold">
                        Refurbish{' '}
                    </span>
                    <span className="text-black text-lg sm:text-2xl font-bold"> 
                        to Flourish – Give New Life to the Old!
                    </span>
                </div>
                <div className="relative text-center">
                    <span className="text-red text-xl sm:text-2xl font-bold">
                        Recycle{' '}
                    </span>
                    <span className="text-black text-lg sm:text-2xl font-bold"> 
                        Right – Shape a Greener Future!
                    </span>
                </div>
            </div>  
        </>
    );
} 