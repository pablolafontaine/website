import Link from "next/link";

export default function Header() {
  return (
    <div className="text-center opacity-80 font-mono text-sm italic sticky top-0 bg-white">
      <Link href="/" className="mr-4 !text-gray-500">
        
      </Link>
      <Link href="/blog" className="!text-gray-500">
        
      </Link>
    </div>
  );
}
