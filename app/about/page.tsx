"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Dedicated to Your Recovery
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            At Physio Care, we believe in providing personalized, evidence-based physiotherapy to help you achieve your health and mobility goals.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/clinic/800/600"
                alt="Our Clinic"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to empower our patients to live active, pain-free lives through expert physiotherapy care, education, and ongoing support. We strive to be the leading provider of rehabilitation services in the community.
              </p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Why Choose Us?</h3>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Experienced and certified physiotherapists
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  State-of-the-art equipment and facilities
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Personalized treatment plans
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Compassionate and patient-centered approach
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
