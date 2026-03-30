"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs, query, orderBy } from "@/lib/firebase";
import Image from "next/image";
import { motion } from "motion/react";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        setServices(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Service)));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive physiotherapy treatments tailored to your unique needs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={service.imageUrl || "https://picsum.photos/seed/service/800/600"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
