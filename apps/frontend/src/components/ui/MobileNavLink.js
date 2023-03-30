import Link from 'next/link';
import {useRouter} from 'next/router';

export default function MobileNavLink({title = 'Название', link = '#', image}) {
    const router = useRouter();
    return (
        <Link className="flex items-center justify-center basis-1/4 transition ease-out" href={link}>
            <div
                className={
                    router.pathname === link
                        ? 'border-t-1 flex w-full border-brand-100 justify-center items-center py-3'
                        : 'border-primary-8 border-t-1 w-full justify-center flex items-center py-3'
                }>
                <div className="flex flex-col gap-1 px-3 items-center">
                    <div className={router.pathname === link ? 'svg_icon_active' : 'svg_icon'}>{image}</div>
                    <p className={router.pathname === link ? 'text-brand-100 text-sm ' : 'text-primary-60 text-sm '}>{title}</p>
                </div>
            </div>
        </Link>
    );
}
