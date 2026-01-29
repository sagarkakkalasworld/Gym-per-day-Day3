import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Dumbbell, Search, MapPin } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

type Gym = {
  id: string;
  gymName: string;
  city: string;
  gmapLocation: string;
  openHours: string;
  perDayCost: string;
  holidays: string;
};

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("Please enter a city");
      return;
    }

    try {
      setLoading(true);
      setOpen(false);

      const q = query(
        collection(db, "gyms"),
        where("city", "==", city)
      );

      const snapshot = await getDocs(q);
      const results: Gym[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Gym, "id">),
      }));

      setGyms(results);
    } catch (error) {
      console.error("Error fetching gyms:", error);
      alert("Failed to fetch gyms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Dumbbell className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold">
              Welcome to Gym per Day
            </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Train anywhere, anytime — no subscriptions, no commitments.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 shadow-lg"
          >
            <Search className="w-5 h-5" />
            Book Your Gym for a Day
          </button>
        </div>

        {/* Results */}
        {loading && (
          <p className="text-center text-slate-600">
            Searching gyms...
          </p>
        )}

        {!loading && gyms.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gyms.map((gym) => (
              <div
                key={gym.id}
                className="bg-white rounded-xl shadow p-6 space-y-3"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {gym.gymName}
                </h3>

                <p className="text-slate-600">
                  📍 {gym.city}
                </p>

                <p className="text-slate-600">
                  🕒 {gym.openHours}
                </p>

                <p className="text-slate-600">
                  💰 {gym.perDayCost} / day
                </p>

                <p className="text-slate-500 text-sm">
                  Holidays: {gym.holidays}
                </p>

                <div className="flex items-center justify-between pt-3">
                  <a
                    href={gym.gmapLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-600 hover:underline"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </a>

                  <button
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && gyms.length === 0 && (
          <p className="text-center text-slate-600 mt-10">
            No gyms found for this city.
          </p>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Dialog.Panel className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
            <Dialog.Title className="text-xl font-bold">
              Find Gyms Near You
            </Dialog.Title>

            <div>
              <label className="block text-sm font-medium mb-2">
                Which city are you looking to work out in today?
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Eg: Bangalore, Mumbai"
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                We’ll show gyms available for daily access.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
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
