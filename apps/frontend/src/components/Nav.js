import NavLink from './ui/NavLink';
import HomeIcon from '@/components/icons/HomeIcon';
import PinIcon from '@/components/icons/PinIcon';
import TruckIcon from '@/components/icons/TruckIcon';
import BarcodeBoxIcon from '@/components/icons/BarcodeBoxIcon';

export default function Nav(props) {
    return (
        <nav {...props}>
            <NavLink image={<HomeIcon/>} title="Главная" description="Основная информация" link="/dashboard"/>
            <NavLink image={<BarcodeBoxIcon/>} title="Посылки" description="Заказы и расписание"
                     link="/dashboard/parcels"/>
            <NavLink image={<PinIcon/>} title="Адреса" description="Адресат для магазинов" link="/dashboard/addresses"/>
            <NavLink image={<TruckIcon/>} title="Рейсы" description="Даты поставок" link="/dashboard/flights"/>
        </nav>
    );
}
