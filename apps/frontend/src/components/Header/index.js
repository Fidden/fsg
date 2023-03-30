import Link from 'next/link';
import Navigation from '@/components/Navigation/index';
import Account from '@/components/Header/Account';
import Image from 'next/image';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import {useAuth} from '@/hooks/auth';
import MobileMenu from './MobileMenu';

export default function Header() {
    const {user} = useAuth();

    return (
        <header className="flex fixed inset-0 z-10 bg-reverse_primary-85 backdrop-blur-md w-full h-20">
            <div className="flex items-center justify-between grow px-8 max-sm:px-4 xl:container xl:mx-auto">
                <div className="flex lg:flex-1 items-center gap-x-4 max-sm:gap-0">
                    <Link className="flex max-lg:hidden items-center text-xl font-semibold text-primary-100"
                          href={!user ? '/' : '/dashboard'}>
                        <Image className="mr-3" width="40" height="40" src="/logo.png" alt="Logo"/>
                        FSG
                    </Link>
                    <div className="lg:hidden">
                        <MobileMenu/>
                    </div>

                    <LocaleSwitcher className="max-lg:hidden"/>
                </div>
                <Navigation className="max-lg:hidden"/>
                <div className="flex flex-1 items-center justify-end">
                    <Account/>
                </div>
            </div>
        </header>
    );
}
