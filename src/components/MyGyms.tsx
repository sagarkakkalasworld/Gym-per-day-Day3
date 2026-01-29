import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Dumbbell, MapPin } from "lucide-react";

type Gym = {
  id: string;
  gymName: string;
  city: string;
  gmapLocation?: string;
  openHours: string;
  perDayCost: string;
  holidays: string;
};

export default function MyGyms() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGyms = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "gyms"),
        where("ownerId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const gymsList: Gym[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Gym, "id">),
      }));

      setGyms(gymsList);
      setLoading(false);
    };

    fetchGyms();
  }, []);

  if (loading)
    return <div className="text-center mt-20">Loading your gyms...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Dumbbell className="w-7 h-7 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-900">
            My Registered Gyms
          </h1>
        </div>

        {gyms.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center text-slate-600">
            You haven’t registered any gyms yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {gyms.map((gym) => (
              <div
                key={gym.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
              >
                <h2 className="text-xl font-semibold text-emerald-600 mb-1">
                  {gym.gymName}
                </h2>

                <p className="text-slate-700 mb-1">
                  <span className="font-medium">City:</span> {gym.city}
                </p>

                <p className="text-slate-700 mb-1">
                  <span className="font-medium">Open Hours:</span>{" "}
                  {gym.openHours}
                </p>

                <p className="text-slate-700 mb-1">
                  <span className="font-medium">Per Day Cost:</span>{" "}
                  {gym.perDayCost}
                </p>

                <p className="text-slate-700 mb-3">
                  <span className="font-medium">Holidays:</span>{" "}
                  {gym.holidays}
                </p>

                {gym.gmapLocation && (
                  <a
                    href={gym.gmapLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
