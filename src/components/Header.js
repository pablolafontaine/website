import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Header() {
  return (
    <div className="pt-2 h-12 text-center font-mono text-sm italic sticky top-0 flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="!text-gray-500">
          home
        </Link>
        <Link href="/blog" className="mx-8 !text-gray-500">
          blog
        </Link>
      </div>
      <ThemeSwitcher />
    </div>
  );
}
