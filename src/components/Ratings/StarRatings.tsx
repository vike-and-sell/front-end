import { useState } from "react";
import { GoStarFill } from "react-icons/go";

interface StarRatingsProps {
  setValue: (value: number) => void;
}

export default function StarRatings({ setValue }: StarRatingsProps) {
  const [rating, setRating] = useState([false, false, false, false, false]);

  function handleChange(index: number) {
    let newValue = 0;
    const newRating = rating.map((_, i) => {
      if (index >= i) {
        newValue++;
        return true;
      }
      return false;
    });
    setValue(newValue);
    setRating(newRating);
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
    <GoStarFill
      size='28px'
      color={active ? "#166aac" : "#9da3b0"}
      onClick={() => handleChange(index)}
    ></GoStarFill>
  );
}
