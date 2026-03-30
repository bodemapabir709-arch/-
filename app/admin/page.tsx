"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs } from "@/lib/firebase";
import { Users, Stethoscope, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ doctors: 0, services: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctorsSnap, servicesSnap, testimonialsSnap] = await Promise.all([
          getDocs(collection(db, "doctors")),
          getDocs(collection(db, "services")),
          getDocs(collection(db, "testimonials")),
        ]);

        setStats({
          doctors: doctorsSnap.size,
          services: servicesSnap.size,
          testimonials: testimonialsSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  const statCards = [
    { title: "Total Doctors", value: stats.doctors, icon: <Users className="w-8 h-8 text-blue-600" />, color: "bg-blue-100" },
    { title: "Total Services", value: stats.services, icon: <Stethoscope className="w-8 h-8 text-green-600" />, color: "bg-green-100" },
    { title: "Testimonials", value: stats.testimonials, icon: <MessageSquare className="w-8 h-8 text-purple-600" />, color: "bg-purple-100" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center">
            <div className={`p-4 rounded-full ${stat.color} mr-6`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
