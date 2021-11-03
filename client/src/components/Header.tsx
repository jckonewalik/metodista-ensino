import { Avatar } from '@mui/material';

interface HeaderProps {
  title: string;
}
export default function Header({ title }: HeaderProps) {
  return (
    <div className="relative text-center flex flex-col justify-center bg-gradient-to-l from-red-600 to-red-400 h-20 min-h-20">
      <span className=" font-thin text-center text-white text-2xl">
        {title}
      </span>
      <div className="absolute top-5 right-5">
        <Avatar />
      </div>
    </div>
  );
}
