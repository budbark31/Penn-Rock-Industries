"use client";

import { useState } from "react";

interface ContactProps {
  truckTitle: string;
  stockNumber?: string; // Optional if you add stock numbers later
}

export default function ContactButtons({ truckTitle }: ContactProps) {
  const [showPhone, setShowPhone] = useState(false);

  // --- REPLACE WITH YOUR ACTUAL DETAILS ---
  const PHONE_NUMBER = "610-507-4832"; // Put your real number here
  const PHONE_CLEAN = "6105074832";    // Numbers only for the link
  const EMAIL_ADDRESS = "sales@pennrock.com";
  // ----------------------------------------

  const emailSubject = encodeURIComponent(`Interested in: ${truckTitle}`);
  const emailBody = encodeURIComponent(`Hi, I'm interested in the ${truckTitle}. Is it still available?`);

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Primary Call/Text Button */}
      <div className="relative">
        <a
          href={`tel:${PHONE_CLEAN}`}
          className="flex items-center justify-center w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg text-lg transition-all shadow-md active:scale-95"
          onClick={(e) => {
            // On desktop, we might want to just reveal the number instead of trying to open FaceTime
            if (window.innerWidth > 768) {
              e.preventDefault();
              setShowPhone(!showPhone);
            }
          }}
        >
          {showPhone ? PHONE_NUMBER : "📞 Call or Text for Price"}
        </a>
        
        {/* Desktop Helper: Shows number if they clicked "Call" on a computer */}
        {showPhone && (
          <div className="absolute top-full left-0 right-0 mt-2 text-center text-sm text-gray-500 bg-gray-50 py-2 border rounded shadow-sm">
            Dial: <span className="font-bold text-gray-900 select-all">{PHONE_NUMBER}</span>
          </div>
        )}
      </div>

      {/* 2. Secondary Email Button */}
      <a
        href={`mailto:${EMAIL_ADDRESS}?subject=${emailSubject}&body=${emailBody}`}
        className="flex items-center justify-center w-full bg-white hover:bg-gray-50 text-blue-900 border-2 border-blue-900 font-bold py-3 rounded-lg text-lg transition-colors"
      >
        ✉️ Email Sales
      </a>
      
      <p className="text-center text-xs text-gray-400 mt-2">
        We respond to texts and emails 7 days a week.
      </p>
    </div>
  );
}