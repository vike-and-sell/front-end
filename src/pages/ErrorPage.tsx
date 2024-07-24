interface ErrorPageProps {
  children: React.ReactNode;
}

export default function ErrorPage({ children }: ErrorPageProps) {
  return (
    <main className='flex flex-col p-4'>
      <h1 className='text-xl font-bold text-pri-blue' data-cy="error-message" >Error : {children}</h1>
    </main>
  );
}
