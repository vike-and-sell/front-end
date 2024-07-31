import axios from "axios";
import { useEffect, useState } from "react";
import { Listing } from "../utils/interfaces";
import { ListingCard } from "./ListingCard";
import { PriBlueButton } from "./Button";
import { useNavigate } from "react-router-dom";

export default function RecommendationsWidget() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Listing[]>([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/recommendations`, {
        withCredentials: true,
      })
      .then((r) => setRecommendations(r.data));
  }, []);

  return (
    <div className='h-full flex flex-col gap-2 relative'>
      <h2 className='font-semibold text-pri-blue text-xl p-0 text-center'>
        Recommendations
      </h2>
      <div className='flex flex-wrap h-full w-full overflow-y-scroll justify-center'>
        {recommendations.slice(0, 30).map((l) => {
          return (
            <div className='w-1/2 p-1 lg:w-full'>
              <ListingCard listingInfo={l}></ListingCard>
            </div>
          );
        })}
        <PriBlueButton
          title='See more'
          className='font-semibold text-xl p-0 w-full text-center lg:mb-12'
          clickHandle={() => navigate("/recommendations/1")}
        ></PriBlueButton>
      </div>
      <div className='hidden lg:block absolute bottom-0 h-12 w-full bg-gradient-to-b from-transparent to-white pointer-events-none'></div>
    </div>
  );
}
