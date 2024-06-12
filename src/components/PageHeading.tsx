interface PageHeadingProp {
  title: string | undefined;
}

export default function PageHeading({ title }: PageHeadingProp) {
  return (
    <h1 className='font-semibold text-[#166aac] text-3xl p-0 mb-4'>{title}</h1>
  );
}
