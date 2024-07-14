import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function NavLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-4 w-4 lg:h-6 lg:w-6 rotate-[15deg]" />
      <p className="text-[16px]">EduChain</p>
    </div>
  );
}
