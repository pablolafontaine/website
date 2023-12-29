import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1>page not found!</h1>
      <Link href="/">home</Link>
    </div>
  );
}
