export const metadata = {
  title: "Sell Your Truck | Penn Rock Industries",
  description: "We buy dump trucks, day cabs, and heavy equipment. Cash offers.",
};

export default function SellPage() {
  return (
    <main className="bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          We Buy Trucks & Equipment
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Turn your surplus inventory into cash. We are actively buying dump trucks, day cabs, and heavy machinery.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* What We Buy Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">What We Are Looking For</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">✓ <strong>Dump Trucks</strong> (Kenworth, Peterbilt, Ford)</li>
              <li className="flex items-center gap-2">✓ <strong>Day Cabs</strong> & Sleepers</li>
              <li className="flex items-center gap-2">✓ <strong>Excavators & Dozers</strong></li>
              <li className="flex items-center gap-2">✓ <strong>Trailers</strong> (Lowboys, dumps)</li>
              <li className="flex items-center gap-2">✓ Fleet Liquidations</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Sell to Penn Rock?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">⚡ <strong>Fast Decisions</strong> - No tire kickers.</li>
              <li className="flex items-center gap-2">💰 <strong>Fair Market Value</strong> offers.</li>
              <li className="flex items-center gap-2">🚛 <strong>We Handle Transport</strong>.</li>
              <li className="flex items-center gap-2">🤝 <strong>Simple Process</strong> from start to finish.</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Ready to get an offer?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Send us the Year, Make, Model, and a few photos. <br className="hidden md:block"/>
            We will get back to you with a number.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="tel:7175550199" // REPLACE WITH REAL NUMBER
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              📞 Call Bryan: 717-555-0199
            </a>
            <a 
              href="mailto:sales@pennrock.com?subject=I have a truck to sell" // REPLACE WITH REAL EMAIL
              className="bg-white text-slate-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              ✉️ Email Photos
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}