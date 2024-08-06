import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Welcome to Our Service
        </h1>
        <Image
          src="/Ai.jpg"
          alt="Service illustration"
          width={300}
          height={200}
          className="rounded-md mb-6 mx-auto"
        />
        <p className="text-gray-600 mb-8 text-center">
          Get access to exclusive content and features by subscribing today!
        </p>
        <Link href="/dashboard" className="block">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg">
            Start Your Journey......
          </Button>
        </Link>
      </div>
    </div>
  );
}
