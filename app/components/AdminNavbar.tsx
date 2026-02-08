import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="bg-[#1a1f2c] text-white p-4 border-b border-gray-800 flex justify-between items-center h-16">
      <div className="flex items-center gap-3">
        {/* Simple text logo for Admin */}
        <div className="font-bold text-lg tracking-wide uppercase text-gray-200">
          PRI <span className="text-orange-500">Manager</span>
        </div>
      </div>
      
      {/* Return to website button */}
      <Link 
        href="/" 
        className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        &larr; Back to Website
      </Link>
    </div>
  );
}