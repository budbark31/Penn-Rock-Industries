"use client";

import { usePathname } from "next/navigation";

export default function StudioLayoutWrapper({
  children,
  publicNavbar,
  publicFooter,
  adminNavbar
}: {
  children: React.ReactNode;
  publicNavbar: React.ReactNode;
  publicFooter: React.ReactNode;
  adminNavbar: React.ReactNode;
}) {
  const pathname = usePathname();
  // Check if we are inside the "/studio" folder
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    // ADMIN MODE: Show Admin Nav + Content (No Footer)
    return (
      <div className="flex flex-col h-screen bg-[#13141b]">
        {adminNavbar}
        {/* Force Studio to take remaining height and scroll internally */}
        <div className="flex-grow overflow-hidden relative z-0">
          {children}
        </div>
      </div>
    );
  }

  // PUBLIC MODE: Show Public Nav + Content + Footer
  return (
    <div className="flex flex-col min-h-screen">
      {publicNavbar}
      <div className="flex-grow">
        {children}
      </div>
      {publicFooter}
    </div>
  );
}