"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs, query, orderBy } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  imageUrl: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Testimonial {
  id: string;
  patientName: string;
  feedback: string;
  rating: number;
}

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsSnap, servicesSnap, testimonialsSnap] = await Promise.all([
          getDocs(query(collection(db, "doctors"), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "services"), orderBy("createdAt", "desc"))),
          getDocs(query(collection(db, "testimonials"), orderBy("createdAt", "desc"))),
        ]);

        setDoctors(doctorsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Doctor)));
        setServices(servicesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Service)));
        setTestimonials(testimonialsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Testimonial)));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/physio/1920/1080"
            alt="Physiotherapy"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Recover Faster, Live Pain-Free
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto"
          >
            Expert physiotherapy services tailored to your specific needs. We help you regain mobility and improve your quality of life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Book an Appointment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">Comprehensive care for all your physical therapy needs.</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={service.imageUrl || "https://picsum.photos/seed/service/800/600"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No services available yet.</p>
        )}
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Specialists</h2>
            <p className="mt-4 text-xl text-gray-600">Highly qualified professionals dedicated to your recovery.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
          ) : doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <motion.div 
                  key={doctor.id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-2xl overflow-hidden text-center p-6 border border-gray-100"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                      src={doctor.imageUrl || "https://picsum.photos/seed/doctor/400/400"}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{doctor.specialization}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{doctor.bio}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No doctors added yet.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Patient Stories</h2>
          <p className="mt-4 text-xl text-gray-600">Hear what our patients have to say about their recovery journey.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.feedback}"</p>
                <div className="font-bold text-gray-900">- {testimonial.patientName}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No testimonials yet.</p>
        )}
      </section>
    </div>
  );
}
