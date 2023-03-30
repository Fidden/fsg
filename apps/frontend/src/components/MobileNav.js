import MobileNavLink from './ui/MobileNavLink';
import HomeIcon from '@/components/icons/HomeIcon';
import PinIcon from '@/components/icons/PinIcon';
import TruckIcon from '@/components/icons/TruckIcon';
import BarcodeBoxIcon from '@/components/icons/BarcodeBoxIcon';

export default function MobileNav(props) {
    return (
        <nav className="flex fixed w-full bottom-0 px-4 backdrop-blur-md bg-reverse_primary-85 pb-4">
            <MobileNavLink image={<HomeIcon/>} title="Главная" link="/dashboard"/>
            <MobileNavLink image={<BarcodeBoxIcon/>} title="Посылки" link="/dashboard/parcels"/>
            <MobileNavLink image={<PinIcon/>} title="Адреса" link="/dashboard/addresses"/>
            <MobileNavLink image={<TruckIcon/>} title="Рейсы" link="/dashboard/flights"/>
        </nav>
    );
}
