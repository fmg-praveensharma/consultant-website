// components/IconButton.tsx
import Link from "next/link";

interface IconButtonProps {
  icon: string;
  label: string;
  href: string;
}

const HomeButton: React.FC<IconButtonProps> = ({ icon, label, href }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center justify-center p-4 px-10 m-2 text-center bg-white border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
        <span className="text-4xl">{icon}</span>
        <span className="mt-2 text-lg font-semibold">{label}</span>
      </div>
    </Link>
  );
};

export default HomeButton;
