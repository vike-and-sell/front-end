import { useNavigate } from "react-router-dom";

export default function VerificationSuccess() {
    const navigate = useNavigate();

    return (
    <main className="flex flex-col h-full justify-center items-center gap-4">
        <div className='flex flex-col px-3 pb-10 items-center gap-2'>
          <span className='text-rt-dark-blue text-center text-xl md:text-3xl font-bold pb-8'>
            Account Verification Successful!
          </span>
          <span className='text-rt-dark-blue text-center text-md md:text-2xl font-semibold lg:px-24'>
            Login to your new account to begin buying and selling within the UVic community!
          </span>
        </div>

        <button
          className='bg-pri-blue relative px-4 rounded-md text-white text-2xl font-semibold p-3'
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
    </main>);
}