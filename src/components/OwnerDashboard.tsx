import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Dumbbell, Plus } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    gymName: "",
    city: "",
    gmapLocation: "",
    openHours: "",
    perDayCost: "",
    holidays: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "gyms"), {
        ...form,
        ownerId: user.uid,
        createdAt: new Date(),
      });

      setOpen(false);
      navigate("/my-gyms");

    } catch (error) {
      console.error("Error saving gym:", error);
      alert("Failed to save gym");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-7 h-7 text-emerald-600" />
            <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add Gym
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-10 text-center text-slate-600">
          No gyms registered yet. Click <b>Add Gym</b> to get started.
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">
            <Dialog.Title className="text-xl font-bold">
              Register Your Gym
            </Dialog.Title>

            {[
              { name: "gymName", label: "Gym Name" },
              { name: "city", label: "City" },
              { name: "gmapLocation", label: "Google Maps Location URL" },
              { name: "openHours", label: "Open Hours (eg: 6AM - 10PM)" },
              { name: "perDayCost", label: "Per Day Cost (₹ / $)" },
              { name: "holidays", label: "Holidays (eg: Sunday)" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.label}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            ))}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Save Gym
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
