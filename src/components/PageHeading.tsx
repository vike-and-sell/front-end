interface PageHeadingProp {
  title: string;
}

export default function PageHeading({ title }: PageHeadingProp) {
  return <h1 className="font-semibold text-pri-blue text-3xl p-0">{title}</h1>;
}
