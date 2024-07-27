interface UserCard {
  username: string;
}

export default function UserCard({ username }: UserCard) {
  return (
    <div className="shadow border-solid border-2 border-slate-300 rounded-3xl p-4 font-bold">
      {username}
    </div>
  );
}
