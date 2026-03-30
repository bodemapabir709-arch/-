"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth, db, onAuthStateChanged, getDoc, doc } from "@/lib/firebase";
import Link from "next/link";
import { LayoutDashboard, Users, Stethoscope, MessageSquare, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        // Check if user is admin
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else if (user.email === "dcrofiq@gmail.com") {
          setIsAdmin(true); // Default admin
        } else {
          router.push("/"); // Not an admin, go home
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!isAdmin) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: "Doctors", path: "/admin/doctors", icon: <Users className="w-5 h-5 mr-3" /> },
    { name: "Services", path: "/admin/services", icon: <Stethoscope className="w-5 h-5 mr-3" /> },
    { name: "Testimonials", path: "/admin/testimonials", icon: <MessageSquare className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => auth.signOut()}
            className="flex w-full items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-8"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
