import vikeLogo from "../assets/vikelogo.svg";

export default function LoginPage() {
    return (
        <>
            <main className='flex flex-col sm:flex-row h-screen'>
                <div className="bg-white relative sm:flex-1 sm:order-2 sm:h-full h-1/3">
                    <div className="relative inset-0">
                        <img src={vikeLogo} alt='Vike Logo' className="m-auto"/>  
                    </div>
                    <div className="relative text-center"><span className="text-[#045693] text-2xl font-bold">
                            Reuse </span><span className="text-black text-2xl font-bold"> 
                            Today, Renew Tomorrow – Join Us!</span></div>
                </div>
                <div className="bg-[#045693] relative sm:flex-1 sm:order-1 sm:h-full h-2/3">
                    <button className="bg-white relative p-4 rounded-md text-[#045693] font-semibold">
                        Sign In
                    </button>
                </div>
            </main>
        </>
    );
}