import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function NavLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-8 w-8 lg:h-10 lg:w-10 rotate-[15deg]" />
      <p className="text-[16px]">EduChain</p>
    </div>
  );
}
