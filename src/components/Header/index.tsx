import Image from "next/image";
import logo from "@/assets/logos/logo.svg";

export default function Header() {
  return (
    <div className="mb-3 py-3">
      <Image
        src={logo}
        alt="Logo of Bookatable"
        width={130}
        height={130}
        priority={true}
        className="mx-auto block"
      />
    </div>
  );
}
