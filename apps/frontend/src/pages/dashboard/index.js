import AppLayout from '@/components/Layouts/AppLayout';
import GuideItem from '@/components/GuideItem';

export default function Cabinet() {
  return (
    <AppLayout>
      <div className="border-1 border-primary-8 p-6 rounded-xl flex flex-col gap-2">
        <h2 className="text-lg font-medium text-primary-100">Инструкция</h2>
        <div className="flex flex-col">
          <GuideItem img="/guide1.png" href="/dashboard/addresses" description="Сначала посылка едет на адрес FSG, а затем едем к вам в Грузию.">
            Закажите товар на адрес FSG
          </GuideItem>
          <GuideItem img="/guide2.png" href="/dashboard/parcels" description="Сначала посылка едет на адрес FSG, а затем едем к вам в Грузию.">
            Закажите товар на адрес FSG
          </GuideItem>
          <GuideItem img="/guide3.png" href="/deposit" description="Сначала посылка едет на адрес FSG, а затем едем к вам в Грузию.">
            Закажите товар на адрес FSG
          </GuideItem>
          <GuideItem img="/guide4.png" href="/filiali" description="Сначала посылка едет на адрес FSG, а затем едем к вам в Грузию.">
            Закажите товар на адрес FSG
          </GuideItem>
        </div>
      </div>
    </AppLayout>
  );
}
