import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function Address() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-16 h-16">
          <img src="/logo.png"></img>
        </div>
        <Title>
          Личный адрес <br />в Италии
        </Title>

        <div className="w-3/4">
          <Description>Получите личный адрес в Италии бесплатно, после регистрации в сервисе FSG</Description>
        </div>
      </div>
      <div className="w-1/2 max-md:w-full flex flex-col gap-4 p-6 rounded-xl bg-brand-8">
        <div className="rounded-full items-center justify-center flex bg-white w-10 h-10"></div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">$4 за 1кг</h2>
          <p className="text-base text-primary-60">Рейсы из Италии в Грузию раз в неделю</p>
        </div>
      </div>
      <Button>Получить адрес в Италии</Button>
    </div>
  );
}
