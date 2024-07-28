import { Charity } from "../utils/interfaces";
import { Image } from "@chakra-ui/react";
interface CharityCardProps {
  charityInfo: Charity;
}

export default function CharityCard({ charityInfo }: CharityCardProps) {
  const dateString = daysUntil(charityInfo.endDate);
  const isActive = charityInfo.status == "AVAILABLE" ? true : false;
  return (
    <div
      className={`flex justify-between items-center border-slate-300 border-[1.5px] rounded-2xl py-4 px-5 ${
        isActive ? "" : "grayscale"
      }`}
    >
      <div className="flex gap-4">
        <div>
          <Image
            borderRadius="20%"
            boxSize="100px"
            src={`${charityInfo.logoUrl}`}
            alt={`${charityInfo.name} logo`}
          />
        </div>
        <div className="flex flex-col  justify-center">
          <h3 className="font-semibold text-pri-blue p-0">
            {charityInfo.name}
          </h3>
          <div className=" text-pri-blue p-0 text-sm">
            Total Raised :{" "}
            <span className="text-green-700 font-bold">
              $ {charityInfo.fund}
            </span>
          </div>
          {isActive ? (
            <div className=" text-slate-500 p-0 text-xs">
              Active Listings : {charityInfo.numListings}
            </div>
          ) : (
            ""
          )}
          <div className=" text-slate-500 p-0 text-xs">
            {isActive ? dateString : "Ended"}
          </div>
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
