import Link from 'next/link';
import ArrowBigRightIcon from '@/components/icons/ArrowBigRightIcon';

export default function SecondaryButton({ children, link = '#' }) {
  return (
    <Link
      href={link}
      className="flex gap-2 rounded-xl caret-transparent  text-center border-1 border-brand-100  cursor-pointer text-brand-100 font-medium  h-10 px-4 items-center text-md">
      {children}
      <div className="svg_icon_active svg_20">
        <ArrowBigRightIcon />
      </div>
    </Link>
  );
}
