interface ReviewsProps {
  children: React.ReactNode;
  averageRating: string;
}

export function Reviews({ children, averageRating }: ReviewsProps) {
  return (
    <>
      <h2 className='text-pri-blue font-semibold mt-4 mb-2'>
        User Reviews (Average Rating : {averageRating})
      </h2>
      <div className='flex flex-col gap-3'>{children}</div>
    </>
  );
}

interface ReviewProps {
  review: string;
}

export function Review({ review }: ReviewProps) {
  return (
    <div className='shadow px-2 py-3 border-slate-300 border-[1.5px] rounded-lg'>
      {review}
    </div>
  );
}
