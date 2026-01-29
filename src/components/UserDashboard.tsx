import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Dumbbell, Search } from "lucide-react";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter a city");
      return;
    }

    // Next step: navigate or fetch gyms
    console.log("Searching gyms in:", city);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center items-center gap-2 mb-6">
          <Dumbbell className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome to Gym per Day
          </h1>
        </div>

        <p className="text-slate-600 text-lg mb-10">
          Train anywhere, anytime — no subscriptions, no commitments.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 shadow-lg"
        >
          <Search className="w-5 h-5" />
          Book Your Gym for a Day
        </button>
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Dialog.Panel className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Find Gyms Near You
            </Dialog.Title>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Which city are you looking to work out in today?
              </label>
              <input
                type="text"
                placeholder="Eg: Bangalore, Mumbai, Hyderabad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                We’ll show gyms available for daily access in this city.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Find Gyms
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
