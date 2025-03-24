import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full pb-4 text-center">
      <p className="text-sm font-medium text-gray-600">
        Powered by{" "}
        <Link
          href="https://bookatable.mu"
          target="_blank"
          referrerPolicy="no-referrer"
          className="text-secondary-3 hover:underline"
        >
          Bookatable
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
