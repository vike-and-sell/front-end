import vikeLogo from "../assets/vikelogo.svg";

export default function LoginHeading() {
    return (
        <>
            <main>
                {/* white logo box */}
                <div className="bg-white flex-col sm:gap-y-[50px] flex gap-5 sm:flex-1 sm:h-full h-1/3">
                    <div className="basis-1/6 relative inset-0">
                        <img src={vikeLogo} alt='Vike Logo' className="h-full max-w-md mx-auto"/>  
                    </div>
                    <div className="relative text-center"><span className="text-[#045693] text-xl sm:text-2xl font-bold">
                            Reuse </span><span className="text-black text-xl sm:text-2xl font-bold"> 
                            Today, Renew Tomorrow – Join Us!</span></div>
                    <div className="relative text-center"><span className="text-[#FFC427] text-xl sm:text-2xl font-bold">
                            Refurbish </span><span className="text-black text-xl sm:text-2xl font-bold"> 
                            to Flourish – Give New Life to the Old!</span></div>
                    <div className="relative text-center"><span className="text-[#BE0F0F] text-xl sm:text-2xl font-bold">
                            Recycle </span><span className="text-black text-xl sm:text-2xl font-bold"> 
                            Right – Shape a Greener Future!</span></div>
                </div>  
            </main>
        </>
    );
} 