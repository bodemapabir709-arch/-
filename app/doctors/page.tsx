"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs, query, orderBy } from "@/lib/firebase";
import Image from "next/image";
import { motion } from "motion/react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  imageUrl: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const q = query(collection(db, "doctors"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        setDoctors(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Doctor)));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Our Specialists</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Meet our team of experienced and dedicated physiotherapists.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {doctors.map((doctor) => (
              <motion.div 
                key={doctor.id}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={doctor.imageUrl || "https://picsum.photos/seed/doctor/600/800"}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4 text-lg">{doctor.specialization}</p>
                  <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No doctors available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
