import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import Link from 'next/link';

export default function SettingsItem({ img, children, description, href = '#' }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-primary-2 cursor-pointer rounded-xl">
      <div className="flex gap-3 items-center">
        <div className="svg_24">{img}</div>
        <div>
          <h3 className="text-base font-medium text-primary-100">{children}</h3>
          <p className="text-sm text-primary-60">{description}</p>
        </div>
      </div>

      <div className="svg_24">
        <ArrowRightIcon />
      </div>
    </Link>
  );
}
