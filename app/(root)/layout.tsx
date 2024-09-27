import Image from 'next/image';
import Sidebar from "@/components/Sidebar";
import MobileNav from '@/components/MobileNav';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={{
        firstName: 'Lee',
        lastName: 'Ben',
      }}/>

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src="/icons/logo.svg"
            alt="menu-icon"
            width={30}
            height={30}
          />
          <div>
            <MobileNav user={{
              firstName: 'Lee',
              lastName: 'Ben',
            }} />
          </div>
        </div>
        {children}
      </div>

    </main>
  );
}
