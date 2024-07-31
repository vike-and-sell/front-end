import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";

interface StarRatingsProps {
  setValue: (value: number) => void;
  defaultValue: number;
}

export default function StarRatings({
  defaultValue,
  setValue,
}: StarRatingsProps) {
  const [rating, setRating] = useState([false, false, false, false, false]);

  useEffect(() => {
    const newRating = rating.map((_, i) => defaultValue > i);
    setRating(newRating);
  }, [defaultValue]);

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
      className={"star" + index.toString()}
      size='28px'
      color={active ? "#166aac" : "#9da3b0"}
      onClick={() => handleChange(index)}
    ></GoStarFill>
  );
}
