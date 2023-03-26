import FlightItem from './FlightItem';
import useSWR from 'swr';
import { defaultFetcher } from '@/lib/axios';
import Loading from './ui/Loading';
import LoadError from './ui/LoadError';
import DataEmpty from './ui/DataEmpty';
import Paginator from '@/components/Paginator';

export default function FlightsTable() {
  const { data: response, isLoading, error } = useSWR('/flights', defaultFetcher);

  if (isLoading) {
    return <Loading>Загрузка...</Loading>;
  }

  if (error) {
    return <LoadError>Ошибка загрузки данных</LoadError>;
  }

  const flights = response.data;

  if (flights?.length < 1) {
    return <DataEmpty>Список рейсов пуст</DataEmpty>;
  }

  return (
    <div className="pb-40">
      <div className="flex gap-6 flex-col">
        <div className="overflow-hidden border-1 border-primary-8 rounded-xl">
          <table className="w-full divide-y divide-primary-8 bg-primary-2">
            <thead className="h-10">
              <tr>
                <th scope="col" className="text-sm text-left font-semibold px-4">
                  Рейс
                </th>
                <th scope="col" className="hidden text-sm text-left font-semibold pr-4 lg:table-cell">
                  Отправление
                </th>
                <th scope="col" className="hidden text-sm text-left font-semibold pr-4 lg:table-cell">
                  Прибытие
                </th>
                <th scope="col" className="text-sm text-left pr-4 font-semibold">
                  Статус
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-primary-8 bg-white">
              {flights?.map((flight) => (
                <FlightItem flight={flight} key={flight.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Paginator />
    </div>
  );
}
