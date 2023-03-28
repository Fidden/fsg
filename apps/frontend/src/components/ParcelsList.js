import React, {useState} from 'react';
import useSWR from 'swr';
import {defaultFetcher} from '@/lib/axios';
import Loading from './ui/Loading';
import LoadError from './ui/LoadError';
import ParcelsEmpty from './ui/ParcelsEmpty';
import AddParcel from './AddParcel';
import ParcelItem from './ParcelItem';
import Paginator from "@/components/Paginator";

const ParcelsList = (order) => {
    const [page, setPage] = useState(1);
    const {data: orders, isLoading, error, mutate} = useSWR(`/orders?page=${page}`, defaultFetcher);
    if (isLoading) {
        return <Loading>Загрузка...</Loading>;
    }

    if (error) {
        return <LoadError>Ошибка загрузки данных</LoadError>;
    }

    if (orders.data?.length < 1) {
        return <ParcelsEmpty button="Добавить посылку">У вас нет посылок</ParcelsEmpty>;
    }

    return (
        <div className="pb-40">
            <div
                className="flex flex-wrap justify-between items-center gap-3 border-1 border-primary-8 rounded-xl py-3 pl-4 pr-3">
                <div className="flex flex-col">
                    <h3 className="text-primary-100 text-base font-medium">Добавьте посылку</h3>
                    <p className="text-primary-60 text-sm">Если вы сделали заказ</p>
                </div>
                <AddParcel reloadList={mutate}>Добавить посылку</AddParcel>
            </div>
            <div className="border-1 border-primary-8 mt-2 p-6 rounded-xl flex flex-col gap-2">
                <h2 className="text-lg font-medium text-primary-100">Посылки</h2>
                <div className="flex flex-col">
                    {orders.data?.map((order) => (
                        <ParcelItem order={order} key={order.id}/>
                    ))}
                </div>
            </div>
            <Paginator
                onPageChange={setPage}
                meta={orders.meta}
            />
        </div>
    );
};

export default ParcelsList;
