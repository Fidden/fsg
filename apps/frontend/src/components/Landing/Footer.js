import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="w-full items-start grid grid-cols-4 max-md:grid-cols-1 gap-8 py-32">
      <Link href="" className="w-full flex max-lg:hidden items-center text-xl font-semibold text-primary-100">
        <Image className="mr-3" width="40" height="40" src="/logo.png" alt="Logo" />
        FSG
      </Link>
      <div className="w-full flex flex-col gap-4">
        <p className="text-prebase font-medium">Компания</p>
        <div className="flex flex-col gap-3">
          <Link href="" className="text-prebase font-medium text-primary-60">
            О нас
          </Link>
          <Link href="" className="text-prebase font-medium text-primary-60">
            Условия обслуживания
          </Link>
          <Link href="" className="text-prebase font-medium text-primary-60">
            Доставка
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="text-prebase font-medium">Полезная информация</p>
        <div className="flex flex-col gap-3">
          <Link href="" className="text-prebase font-medium text-primary-60">
            О нас
          </Link>
          <Link href="" className="text-prebase font-medium text-primary-60">
            О нас
          </Link>
          <Link href="" className="text-prebase font-medium text-primary-60">
            О нас
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="text-prebase font-medium">Контакты</p>
        <div className="flex flex-col gap-3">
          <Link href="" className="text-prebase font-medium text-primary-60">
            (+995) 032 250 00 60
          </Link>
          <Link href="" className="text-prebase font-medium text-primary-60">
            info@fsgpost.com
          </Link>
          <Link href="" className="text-prebase font-medium text-primary-60">
            Помощь
          </Link>
        </div>
      </div>
    </div>
  );
}
