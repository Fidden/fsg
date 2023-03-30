import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import UserIcon from '@/components/icons/UserIcon';
import BankCard from '@/components/icons/BankCard';
import UserInfo from '@/components/icons/UserInfo';
import Settings from '@/components/icons/Settings';
import Logout from '@/components/icons/Logout';
import {Fragment, useMemo} from 'react';
import useTranslation from 'next-translate/useTranslation';
import {Menu, Transition} from '@headlessui/react';
import {useAuth} from '@/hooks/auth';
import {useIntl} from 'next-intl';
import Link from 'next/link';

export default function AccountMenu({user}) {
    const {t} = useTranslation('auth');
    const intl = useIntl();

    const userName = useMemo(() => {
        const recipient = user?.recipient;

        if (!recipient) {
            return 'Пользователь';
        }

        if (recipient.type === 'business') {
            return recipient.company_name_en;
        }

        return `${recipient.first_name_en} ${recipient.last_name_en}`;
    }, [user]);

    const {logout} = useAuth();

    const {isClient, isUserLoading} = useAuth();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="relative h-16 max-sm:h-10 max-sm:w-10 max-sm:gap-0 max-sm:px-2 max-sm:hover:bg-white px-4 gap-3 flex items-center hover:bg-primary-2 transition ease-in-out-out rounded-xl text-left">
                <div className="svg_icon svg_24">
                    <UserIcon/>
                </div>
                <div className="flex flex-col">
                    <p className="text-primary-100 text-base font-medium max-sm:hidden">{userName}</p>
                    <p className="text-primary-60 text-sm max-sm:hidden">
                        <span>{t('balance')}:</span>{' '}
                        <span className="font-medium text-accent_1-100">{intl.formatNumber(user?.balance || -1, {
                            style: 'currency',
                            currency: 'GEL'
                        })}</span>
                    </p>
                </div>
                <div className="svg_icon svg_16 max-sm:hidden svg_c_60">
                    <ArrowDownIcon/>
                </div>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100  outline-none max-h-80 overflow-auto rounded-xl bg-white border-1 border-primary-8 text-md shadow-xl">
                    {(() => {
                        if (isClient === null) {
                            return (
                                <>
                                    <div className="py-1.5">
                                        <Menu.Item>
                                            {({active}) => (
                                                <div className="py-1 px-4">
                                                    <p className="text-sm text-primary-60">Email</p>
                                                    <p className="font-medium text-md truncate">{user?.email}</p>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="py-1.5">
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    onClick={logout}
                                                    className={`${
                                                        active ? 'bg-primary-4' : 'text-primary-100'
                                                    } w-full text-left relative flex gap-2 truncate cursor-pointer select-none py-1 pl-3 pr-4`}>
                                                    <div className="svg_icon svg_20">
                                                        <Logout/>
                                                    </div>
                                                    Выйти
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </>
                            );
                        }
                    })()}

                    {(() => {
                        if (isClient != null) {
                            return (
                                <>
                                    <div className="py-1.5">
                                        <Menu.Item>
                                            {({active}) => (
                                                <div className="py-1 px-4">
                                                    <p className="text-sm text-primary-60">Номер кабинета</p>
                                                    <p className="font-medium text-md ">FSG{user.recipient.id}</p>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="py-1.5">
                                        <Menu.Item>
                                            {({active}) => (
                                                <Link
                                                    href="/dashboard"
                                                    className={`${
                                                        active ? 'bg-primary-4' : 'text-primary-100'
                                                    } relative flex gap-2 truncate cursor-pointer select-none py-1 pl-3 pr-4`}>
                                                    <div className="svg_icon svg_20">
                                                        <UserIcon/>
                                                    </div>
                                                    Личный кабинет
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <Link
                                                    href="/deposit"
                                                    className={`${
                                                        active ? 'bg-primary-4' : 'text-primary-100'
                                                    } relative flex gap-2 truncate cursor-pointer select-none  py-1 pl-3 pr-4`}>
                                                    <div className="svg_icon svg_20">
                                                        <BankCard/>
                                                    </div>
                                                    Пополнить баланс
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="py-1.5">
                                        <Menu.Item>
                                            {({active}) => (
                                                <Link
                                                    href="/profile"
                                                    className={`${
                                                        active ? 'bg-primary-4' : 'text-primary-100'
                                                    } relative flex gap-2 truncate cursor-pointer select-none py-1 pl-3 pr-4`}>
                                                    <div className="svg_icon svg_20">
                                                        <UserInfo/>
                                                    </div>
                                                    Личная информация
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="py-1.5">
                                        <Menu.Item>
                                            {({active}) => (
                                                <Link
                                                    href="/settings"
                                                    className={`${
                                                        active ? 'bg-primary-4' : 'text-primary-100'
                                                    } relative flex gap-2 truncate cursor-pointer select-none py-1 pl-3 pr-4`}>
                                                    <div className="svg_icon svg_20">
                                                        <Settings/>
                                                    </div>
                                                    Настройки
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    onClick={logout}
                                                    className={`${
                                                        active ? 'bg-primary-4' : 'text-primary-100'
                                                    } w-full text-left relative flex gap-2 truncate cursor-pointer select-none py-1 pl-3 pr-4`}>
                                                    <div className="svg_icon svg_20">
                                                        <Logout/>
                                                    </div>
                                                    Выйти
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </>
                            );
                        }
                    })()}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
