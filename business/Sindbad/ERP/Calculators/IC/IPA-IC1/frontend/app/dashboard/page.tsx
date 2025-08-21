"use client";

import Link from "next/link";
import InsuranceCard from "@/components/InsuranceCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Insurance Calculator
        </h1>

        {/* Insurance Card */}
        <InsuranceCard />

        {/* Back Button */}
        <div className="mt-10 flex justify-end">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          >
            ← Back to Main Calculator
          </Link>
        </div>
      </div>
    </main>
  );
}








