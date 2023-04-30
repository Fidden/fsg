import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function Flights() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>
          Более 2000+ <br />
          успешных рейсов
        </Title>
        <Description>Последние 20 рейсов</Description>
      </div>
      <table className="w-1/2 max-md:w-full border-1 border-primary-8 divide-y divide-primary-8 bg-primary-2">
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
          <tr className="text-sm text-primary-100">
            <td className="py-2 font-medium h-10 pl-4">
              <div className="flex items-center lg:gap-2 gap-1">1 - 2</div>

              <dl className="font-normal lg:hidden">
                <dd className="mt-1 w-full truncate text-primary-100">123</dd>
              </dl>
            </td>
            <td className="hidden h-10 lg:table-cell">2343</td>
            <td className="hidden h-10 lg:table-cell">532</td>
            <td className="h-10 pr-4">yes</td>
          </tr>
          <tr className="text-sm text-primary-100">
            <td className="py-2 font-medium h-10 pl-4">
              <div className="flex items-center lg:gap-2 gap-1">1 - 2</div>

              <dl className="font-normal lg:hidden">
                <dd className="mt-1 w-full truncate text-primary-100">123</dd>
              </dl>
            </td>
            <td className="hidden h-10 lg:table-cell">2343</td>
            <td className="hidden h-10 lg:table-cell">532</td>
            <td className="h-10 pr-4">yes</td>
          </tr>
          <tr className="text-sm text-primary-100">
            <td className="py-2 font-medium h-10 pl-4">
              <div className="flex items-center lg:gap-2 gap-1">1 - 2</div>

              <dl className="font-normal lg:hidden">
                <dd className="mt-1 w-full truncate text-primary-100">123</dd>
              </dl>
            </td>
            <td className="hidden h-10 lg:table-cell">2343</td>
            <td className="hidden h-10 lg:table-cell">532</td>
            <td className="h-10 pr-4">yes</td>
          </tr>
        </tbody>
      </table>
      <Button>Контакты</Button>
    </div>
  );
}
