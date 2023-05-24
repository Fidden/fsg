import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import Check from '@/components/icons/Check';
import Time from '@/components/icons/Time';
import Walk from '@/components/icons/Walk';
import TruckIcon from '@/components/icons/TruckIcon';
import {Disclosure} from '@headlessui/react';
import ParcelStroke from '@/components/ui/ParcelStroke';
import EditParcel from "@/components/EditParcel";
import DeleteParcel from "@/components/DeleteParcel";

export default function ParcelItem({order, reloadList}) {
    // {`https://www.google.com/s2/favicons?domain=${order.package.shop.url}&sz=128`}
    const iconMap = {
        pending: <img className="w-6 rounded-full h-6" src="/logo.png"></img>,
        processing: (
            <div className="svg_24 svg_icon_accent_2">
                <Time/>
            </div>
        ),
        shipped: (
            <div className="svg_24 svg_icon_accent_4">
                <TruckIcon/>
            </div>
        ),
        arrived: (
            <div className="svg_24 svg_icon_accent_1">
                <Check/>
            </div>
        ),
        completed: (
            <div className="svg_24 svg_c_60">
                <Walk/>
            </div>
        ),
    };

    const statusMap = {
        pending: <p className="text-sm text-primary-60 truncate">FSG ожидает вашу посылку</p>,
        processing: <p className="text-sm text-accent_2-100 truncate">Прибыла на склад
            в {order.package?.storage?.country?.name}</p>,
        shipped: <p className="text-sm text-accent_4-100 truncate">Едет в {order.branch.city.key}</p>,
        arrived: <p className="text-sm text-accent_1-100 truncate">Ожидает получения</p>,
        completed: <p className="text-sm text-primary-60 truncate">Посылка получена</p>,
    };

    const infoMap = {
        pending: 'Трекинг: ' + order.package.tracking_number,
        processing: 'Отправление: ?',
        shipped: 'Прибытие: ?',
        arrived: 'Адрес: ' + order.branch.address.street,
        completed: '?',
    };

    const progressMap = {
        pending: (
            <div className="h-6 flex items-center justify-end max-sm:hidden">
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
            </div>
        ),
        processing: (
            <div className="h-6 flex items-center justify-end max-sm:hidden">
                <div className="w-2.5 h-2.5 bg-accent_2-100 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
            </div>
        ),
        shipped: (
            <div className="h-6 flex items-center justify-end max-sm:hidden">
                <div className="w-2.5 h-2.5 bg-accent_4-100 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-accent_4-100"></div>
                <div className="w-2.5 h-2.5 bg-accent_4-100 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
            </div>
        ),
        arrived: (
            <div className="h-6 flex items-center justify-end max-sm:hidden">
                <div className="w-2.5 h-2.5 bg-accent_1-100 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-accent_1-100"></div>
                <div className="w-2.5 h-2.5 bg-accent_1-100 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-accent_1-100"></div>
                <div className="w-2.5 h-2.5 bg-accent_1-100 rounded-full border-1 border-white"></div>
                <div className="w-1.5 h-px bg-primary-8"></div>
                <div className="w-2.5 h-2.5 bg-primary-8 rounded-full border-1 border-white"></div>
            </div>
        ),
        completed: <p className="text-sm font-medium">Дата получения</p>,
    };

    return (
        <Disclosure>
            <Disclosure.Button className="w-full">
                <div
                    className="flex items-center gap-3 px-4 max-sm:px-0 max-sm:hover:bg-white py-3 hover:bg-primary-2 cursor-pointer rounded-xl">
                    {iconMap[order.status]}
                    <div className="flex gap-3 items-center grow truncate max-sm:flex-wrap max-sm:gap-1">
                        <div className="flex gap-3 grow min-w-0 items-center">
                            <div className="flex flex-col truncate text-left">
                                <h3 className="text-base font-medium text-primary-100 truncate">
                                    {order.package.name || order.package.shop.url || 'Посылка #' + order.id}
                                </h3>
                                {statusMap[order.status]}
                            </div>
                        </div>
                        <div
                            className="flex flex-col text-right basis-2/4 max-sm:basis-full max-sm:text-left whitespace-nowrap min-w-0 max-sm:whitespace-normal truncate">
                            {progressMap[order.status]}
                            <p className="text-sm text-primary-60 truncate max-sm:whitespace-normal">{infoMap[order.status]}</p>
                        </div>
                    </div>
                    <div className="svg_24">
                        <ArrowRightIcon/>
                    </div>
                </div>
            </Disclosure.Button>
            <Disclosure.Panel className="pt-1 pb-4 px-4 max-sm:px-0 flex flex-col gap-2">
                <table
                    className="min-w-full table-auto rounded-xl text-primary-100 text-md divide-y divide-primary-8 bg-primary-2">
                    <tbody className="divide-y divide-primary-8 ">
                    <ParcelStroke name="Название" data={order.package.name}/>
                    <ParcelStroke name="Магазин" data={order.package.shop.name}/>
                    <ParcelStroke name="Склад"
                                  data={
                                      `${order.package.storage.address.city} ${order.package.storage.address.street}`
                                  }/>
                    <ParcelStroke name="Трек номер" data={order.package.tracking_number}/>
                    <ParcelStroke name="Статус" data={order.status}/>
                    </tbody>
                </table>
                {order.status === 'pending' &&
                    <>
                        <EditParcel
                            reloadList={reloadList}
                            order={order}
                        />
                        <DeleteParcel
                            reloadList={reloadList}
                            order={order}
                        />
                    </>
                }
            </Disclosure.Panel>
        </Disclosure>
    );
}
