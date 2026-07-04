// frontend - app/dashboard/layout.jsx

import DashboardSidebar from "@/components/layouts/DashboardSidebar";
import DashboardSidebarMobile from "@/components/layouts/DashboardSidebarMobile";
import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";


export default async function DashboardLayout({ children }) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/signin');
  }
  return (
    <div className='flex h-screen overflow-hidden bg-black'>
      <DashboardSidebar />
      <div className='flex-1'>
        <div className='flex-1 overflow-y-auto bg-linear-to-br from-gray-950 to-black'>
          <DashboardSidebarMobile />
        </div>
        <main className='p-6 pt-20 lg:p-8 lg:pt-8'>{children}</main>
      </div>
    </div>
  );
}
