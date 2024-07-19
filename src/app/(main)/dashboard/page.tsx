"use client";

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { withAuth } from '@/app/hoc/WithAuth';

const Dashboard = () => {
  return (
    <main className="flex min-h-screen flex-col px-2 py-6 md:p-6">
      <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to EduChain</strong>
          </p>
    </main>
  );
}

export default withAuth(Dashboard);
