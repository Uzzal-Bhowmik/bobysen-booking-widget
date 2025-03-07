import bgFlowerLeft from "@/assets/images/flower-left.svg";
import bgFlowerRightTop from "@/assets/images/flower-right-top.svg";
import bgFlowerRightBottom from "@/assets/images/flower-right-bottom.svg";
import Image from "next/image";

export default function BgFlowers() {
  return (
    <div className="fixed inset-0 -z-50">
      <Image
        className="absolute -top-16 -left-20 -z-50 opacity-50 lg:-left-10"
        src={bgFlowerLeft}
        alt="Background flower graphic"
      />

      <Image
        className="absolute -top-16 -right-40 -z-50 opacity-50 lg:-right-20"
        src={bgFlowerRightTop}
        alt="Background flower graphic"
      />

      <Image
        className="absolute -right-20 -bottom-16 -z-50 opacity-50"
        src={bgFlowerRightBottom}
        alt="Background flower graphic"
      />
    </div>
  );
}
