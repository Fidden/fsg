import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function Offices() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>
          10 офисов
          <br />
          по всей Грузии
        </Title>
        <Description>На эти адреса мы привозим посылки</Description>
      </div>
      <div className="grid w-full grid-cols-3 max-md:grid-cols-1 gap-4">
        <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-brand-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Тбилиси</h2>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-accent_1-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Тбилиси</h2>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-accent_4-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Тбилиси</h2>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
            <p className="text-base text-primary-60">
              <span className="text-primary-100 font-medium">Адрес</span>
              <br />
              ул. Цабадзе. N5
            </p>
          </div>
        </div>
      </div>

      <Button>Начать использование</Button>
    </div>
  );
}
