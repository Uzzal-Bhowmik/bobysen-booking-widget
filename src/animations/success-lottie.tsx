"use client";

import successAnimation from "@/assets/lottie/check-mark-lottie.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function SuccessLottie() {
  const lottieSettings = {
    loop: false,
    autoplay: true,

    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie options={lottieSettings} height={380} width={380} speed={0.8} />
  );
}
