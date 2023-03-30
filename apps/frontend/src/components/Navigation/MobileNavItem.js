import React from 'react';
import Link from 'next/link';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

const NavItem = ({children, description, link = '', img}) => (
    <Link href={link} className="flex h-14 flex-col text-left">
        <div
            className="flex items-center gap-3 px-2 max-sm:hover:bg-white py-3 hover:bg-primary-2 cursor-pointer rounded-xl">
            <div className="svg_24 svg_primary-100">{img}</div>
            <div className="flex gap-3 items-center grow truncate max-sm:flex-wrap max-sm:gap-1">
                <div className="flex gap-3 grow min-w-0 items-center">
                    <div className="flex flex-col truncate">
                        <h3 className="text-base font-medium text-primary-100 truncate">{children}</h3>
                        <p className="text-sm text-primary-60 truncate">{description}</p>
                    </div>
                </div>
            </div>
            <div className="svg_24">
                <ArrowRightIcon/>
            </div>
        </div>
    </Link>
);

export default NavItem;
