import Link from 'next/link';

export default function Page({ children, href = '' }) {
  return (
    <Link href={href} className="w-8 h-8 rounded-xl bg-primary-4 hover:bg-primary-8 text-primary-60 text-sm justify-center flex items-center">
      {children}
    </Link>
  );
}
