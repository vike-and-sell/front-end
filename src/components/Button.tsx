interface DefaultButtonProps {
  title: string;
  clickHandle?: () => void;
}

export default function DefaultButton({
  title,
  clickHandle,
}: DefaultButtonProps) {
  return (
    <button
      className='bg-pri-blue text-white px-4 py-2 rounded-lg'
      onClick={clickHandle}
    >
      {title}
    </button>
  );
}
