interface DefaultButtonProps {
  title: string;
}

export default function DefaultButton({ title }: DefaultButtonProps) {
  return (
    <button className="bg-[#166aac] text-white px-4 py-2 rounded-lg">
      {title}
    </button>
  );
}
