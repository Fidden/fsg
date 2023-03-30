import Link from 'next/link';
import {useRouter} from 'next/router';

export default function NavLink({title = 'Название', description = 'Описание', link = '', image}) {
    const router = useRouter();
    return (
        <Link href={link}>
            <div
                className={
                    router.pathname === link
                        ? 'h-16 px-4 rounded-xl gap-3 flex items-center bg-brand-4 transition ease-out'
                        : 'h-16 px-4 rounded-xl gap-3 flex items-center hover:bg-primary-2 transition ease-in-out-out'
                }>
                <div className={router.pathname === link ? 'svg_icon_active' : 'svg_icon'}>{image}</div>
                <div className="flex flex-col">
                    <p className={router.pathname === link ? 'text-brand-100 text-base font-medium' : 'text-primary-100 text-base font-medium'}>{title}</p>
                    <p className={router.pathname === link ? 'text-brand-60 text-sm' : 'text-primary-60 text-sm'}>{description}</p>
                </div>
            </div>
        </Link>
    );
}
