import { Charity } from "../utils/interfaces";
import { Image } from "@chakra-ui/react";
interface CharityCardProps {
  charityInfo: Charity;
}

export default function CharityCard({ charityInfo }: CharityCardProps) {
  const dateString = daysUntil(charityInfo.endDate);
  return (
    <div className='flex justify-between items-center border-slate-300 border-[1.5px] rounded-2xl py-4 px-5'>
      <div className='flex gap-4'>
        <div>
          <Image
            borderRadius='20%'
            maxHeight='100px'
            width='auto'
            src={`${charityInfo.logoUrl}`}
            alt={`${charityInfo.name} logo`}
            objectFit='cover'
          />
        </div>
        <div className='flex flex-col  justify-center'>
          <h3 className='font-semibold text-pri-blue p-0'>
            {charityInfo.name}
          </h3>
          <div className=' text-pri-blue p-0 text-sm'>
            Total Raised :{" "}
            <span className='text-green-700 font-bold'>
              {" "}
              $ {charityInfo.fund}
            </span>
          </div>
          <div className=' text-slate-500 p-0 text-xs'>{dateString}</div>
        </div>
      </div>
    </div>
  );
}

function daysUntil(targetDateStr: string): string {
  let outputString = "";
  const targetDate = new Date(targetDateStr);
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference > 1) {
    outputString = `Ends in ${daysDifference} days`;
  } else if (daysDifference == 0) {
    outputString = `Ends in today`;
  } else if (daysDifference == 1) {
    outputString = "Ends in 1 day";
  } else {
    outputString = "Charity ended";
  }

  return outputString;
}
