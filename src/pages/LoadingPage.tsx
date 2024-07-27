import vikeLogo from "../assets/vikelogo.svg";


export default function LoadingPage () {

    return(
        <div className="flex flex-col items-center justify-center h-screen motion-safe:animate-pulse">
                <div className="mb-8">
                    <img
                        alt="Vike Logo"
                        className=""
                        src={vikeLogo}
                        />
                </div>
                
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-pri-blue motion-reduce:animate-[spin_1.5s_linear_infinite]">
                   <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                   </span>
                </div>
                
            
        </div>
    )
}