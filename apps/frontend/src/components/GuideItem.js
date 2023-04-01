import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import Link from 'next/link';

export default function GuideItem({ children, description, img, href = '' }) {
  return (
    <Link href={href} className="flex items-center gap-6 px-4 max-sm:px-0 max-sm:hover:bg-white py-3 hover:bg-primary-2 cursor-pointer rounded-xl">
      <div>
        <div className="w-24 h-24 rounded-md bg-primary-2">
          <img src={img}></img>
        </div>
      </div>
      <div className="flex gap-3 items-center grow max-sm:flex-wrap max-sm:gap-1">
        <div className="flex gap-3 grow min-w-0 items-center">
          <div className="flex flex-col gap-2 text-left">
            <h3 className="text-base_lg font-medium text-primary-100">{children}</h3>
            <p className="text-primary-60 text-md">{description}</p>
          </div>
        </div>
      </div>
      <div className="svg_24">
        <ArrowRightIcon />
      </div>
    </Link>
  );
}
