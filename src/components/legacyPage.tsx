"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface LegacyYearPageProps {
  year: string;
}

export default function LegacyYearPage({ year }: LegacyYearPageProps) {
  const router = useRouter();
  const [timer, setTimer] = useState(5);

  const goBack = () => {
    router.push("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          goBack();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      onClick={goBack}
      className="h-screen w-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold">Shasthra {year}</h1>
      <p className="text-xl mt-4">going back to home page in {timer} seconds</p>
    </a>
  );
}
