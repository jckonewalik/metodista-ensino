import { PlusIcon } from '@heroicons/react/solid';

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="absolute bottom-5 right-5 w-16 h-16 z-10 bg-gradient-to-l from-red-600 to-red-400 flex items-center justify-center rounded-full active:opacity-90"
    >
      <PlusIcon className="text-white h-10 w-10" />
    </div>
  );
}
