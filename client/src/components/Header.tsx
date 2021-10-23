import { Avatar } from '@mui/material';

export default function Header() {
  return (
    <div className="relative text-center flex flex-col justify-center h-30 bg-gradient-to-l from-red-600 to-red-400 h-20">
      <span className=" font-thin text-center text-white text-2xl">Turmas</span>
      <div className="absolute top-5 right-5">
        <Avatar />
      </div>
    </div>
  );
}
