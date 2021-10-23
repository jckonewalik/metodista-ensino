import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="bg-red-300 flex h-screen justify-center items-center">
      <ul>
        <li className="list-disc list-outside">
          <Link href="/classes">
            <a className="font-bold text-xl">Classes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
