import {parseISO} from 'date-fns';
import Steering from '@/components/icons/Steering';
import Garage from './icons/Garage';
import InboxArchive from './icons/InboxArchive';
import CloseCircle from './icons/CloseCircle';
import ArrowBack from './icons/ArrowBack';
import {useIntl} from 'next-intl';

export default function FlightItem({flight}) {
    const intl = useIntl();
    const statusMap = {
        scheduled: <p className="bg-accent_5-10 inline text-accent_5-100 py-1 px-2 rounded-full">Ожидает</p>,
        active: <p className="bg-accent_4-10 inline text-accent_4-100 py-1 px-2 rounded-full">В пути</p>,
        arrived: <p className="bg-accent_1-10 inline text-accent_1-100 py-1 px-2 rounded-full">Прибыл</p>,
        canceled: <p className="bg-accent_2-10 inline text-accent_2-100 py-1 px-2 rounded-full">Отменён</p>,
        aborted: <p className="bg-accent_3-10 inline text-accent_3-100 py-1 px-2 rounded-full">Прерван</p>,
    };

    const statusMapIcon = {
        scheduled: (
            <div className="svg_icon_accent_5 svg_20">
                <InboxArchive/>
            </div>
        ),
        active: (
            <div className="svg_icon_accent_4 svg_20">
                <Steering/>
            </div>
        ),
        arrived: (
            <div className="svg_icon_accent_1 svg_20">
                <Garage/>
            </div>
        ),
        canceled: (
            <div className="svg_icon_accent_2 svg_20">
                <ArrowBack/>
            </div>
        ),
        aborted: (
            <div className="svg_icon_accent_3 svg_20">
                <CloseCircle/>
            </div>
        ),
    };

    return (
        <tr className="text-sm text-primary-100">
            <td className="py-2 font-medium h-10 pl-4">
                <div className="flex items-center lg:gap-2 gap-1">
                    {statusMapIcon[flight.status]}
                    {flight.storage.country.name} - {flight.branch.city.country.name}
                </div>

                <dl className="font-normal lg:hidden">
                    <dd className="mt-1 w-full truncate text-primary-100">
                        {intl.formatDateTime(parseISO(flight.departured_at), {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        })}{' '}
                        —{' '}
                        {intl.formatDateTime(parseISO(flight.arrived_at), {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        })}
                    </dd>
                </dl>
            </td>
            <td className="hidden h-10 lg:table-cell">
                {intl.formatDateTime(parseISO(flight.departured_at), {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}
            </td>
            <td className="hidden h-10 lg:table-cell">
                {intl.formatDateTime(parseISO(flight.arrived_at), {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}
            </td>
            <td className="h-10 pr-4">{statusMap[flight.status]}</td>
        </tr>
    );
}
