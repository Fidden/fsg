import Nav from '@/components/Nav';
import { useAuth } from '@/hooks/auth';
import Banner from '@/components/ui/Banner';
import MobileNav from '../MobileNav';
import MainLayout from "@/components/Layouts/MainLayout";
import {useRouter} from "next/router";
import LoadingLayout from "@/components/Layouts/LoadingLayout";
import React from "react";

const AppLayout = ({ children }) => {
  const {isClient, isUserLoading, whereToGo} = useAuth({ middleware: 'client' });
  const router = useRouter();

  if (isUserLoading) {
    return <LoadingLayout />;
  }

  if (!isClient) {
    if (whereToGo) {
      router.push(whereToGo);
    }

    // TODO: может быть текст убрать, чтобы не моргал. Но оставить лэйаут, чтобы шапка не моргала.
    return <MainLayout className="flex justify-center items-center mt-[20%]">Sorry, but you are not a client</MainLayout>;
  }

  return (
    <MainLayout>
      <div className="xl:container max-sm:px-4 max-sm:pt-0 px-8 pt-8 mx-auto">
        <div className="grid grid-cols-4 max-lg:grid-cols-6 max-md:grid-cols-4 gap-x-8 grid-flow-col gap-4">
          <Nav className="max-lg:col-start-1 max-lg:col-end-3 max-md:hidden" />
          <main className="col-start-2 col-end-4 max-lg:col-start-3 max-lg:col-end-7 max-md:col-start-1 max-md:col-end-5">{children}</main>
          <div className="flex max-lg:hidden flex-col gap-4">
            <Banner img="/banner/1.jpg" />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </MainLayout>
  );
};

export default AppLayout;
