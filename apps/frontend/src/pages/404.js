import React from 'react';
import {ErrorLayout} from "@/components/Layouts/ErrorLayout";
import NavLink from "@/components/ui/NavLink";
import Link from "next/link";
import SecondaryButton from "@/components/ui/SecondaryButton";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowBigRightIcon from "@/components/icons/ArrowBigRightIcon";

const Custom404 = () => {
  return (
    <ErrorLayout>
      <div className="flex flex-col items-start gap-7 max-w-md p-3">
        {/*<div className="relative bottom-20 flex flex-row gap-1 items-center">*/}
        {/*  <img*/}
        {/*    src="/logo.png"*/}
        {/*    alt="logo"*/}
        {/*    className="w-24 hidden md:block "*/}
        {/*  />*/}
        {/*  <p className="text-3xl">fsg.post</p>*/}
        {/*</div>*/}
        <div className="flex flex-col gap-5 items-start">
          <h1 className="font-bold text-5xl">404. Страница не найдена</h1>
          <p>Возможно, она была перемещена, или вы просто неверно указали адрес страницы.</p>
          <Link href={'/'}>
            <button className="py-2 px-4 border-2 rounded-md flex items-center gap-1 border-brand-100 text-brand-100">
              Перейти на главную
              <div className="svg_icon_active svg_20">
                <ArrowBigRightIcon/>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </ErrorLayout>
  )
}

export default Custom404;
