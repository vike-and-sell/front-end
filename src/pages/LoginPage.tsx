import LoginHeading from "../components/LoginHeading";

export default function LoginPage() {
    return (
        <>
            <main className='flex flex-col sm:flex-row h-screen'>
                {/* white logo box */}
                <div className="sm:order-2 sm:flex-1 flex justify-center items-center">
                    <LoginHeading></LoginHeading>
                </div>
                
                {/* blue inputs box */}
                <div className="bg-[#045693] flex justify-center items-center sm:flex-1 sm:order-1 h-full h-2/3">
                    <button className="bg-white relative p-4 rounded-md text-[#045693] font-semibold">
                        Sign In
                    </button>
                </div>
            </main>
        </>
    );
}