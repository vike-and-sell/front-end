// This makes my life a lot harder as we have to download huge libraries

import { useState } from "react";
import { GoStarFill } from "react-icons/go";

export default function StarRatings() {
  const [rating, setRating] = useState([false, false, false, false, false]);
  const [ratingValue, setRatingValue] = useState(0);

  function handleChange(index: number) {
    let newValue = 0;
    const newRating = rating.map((_, i) => {
      if (index >= i) {
        newValue++;
        return true;
      }
      return false;
    });
    setRatingValue(newValue);
    setRating(newRating);
    console.log(newValue);
  }

  return (
    <div className='flex'>
      {rating.map((activeRating, index) => {
        return (
          <Star
            key={index}
            index={index}
            active={activeRating}
            handleChange={handleChange}
          ></Star>
        );
      })}
    </div>
  );
}

interface StarProps {
  active: boolean;
  index: number;
  handleChange: (index: number) => void;
}

function Star({ active, index, handleChange }: StarProps) {
  return (
    <>
      {active ? (
        <GoStarFill
          size='28px'
          color='red'
          onClick={() => handleChange(index)}
        ></GoStarFill>
      ) : (
        <GoStarFill
          size='28px'
          color='green'
          onClick={() => handleChange(index)}
        ></GoStarFill>
      )}
    </>
  );
}
