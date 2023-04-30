import Link from 'next/link';

export default function Button({ children, href = '' }) {
  return (
    <Link href={href} className="py-4 max-md:text-base text-center px-8 inline text-land_18 font-medium text-white bg-brand-100 rounded-xl">
      {children}
    </Link>
  );
}
