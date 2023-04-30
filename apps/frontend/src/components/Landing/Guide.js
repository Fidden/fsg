import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';
import Load from '@/components/Icons/Load.jsx';

export default function Guide() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>
          Три шага <br />к всемирному шопингу
        </Title>
        <Description>Очень легко и доступно</Description>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
        <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-brand-8">
          <div className="rounded-full items-center justify-center flex bg-white w-10 h-10">
            <Load />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Регистрируйтесь</h2>
            <p className="text-base text-primary-60">Получите ваш персональный адрес в другой стране, с помощью FSG</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-accent_4-8">
          <div className="rounded-full items-center justify-center flex bg-white w-10 h-10">
            <Load />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Регистрируйтесь</h2>
            <p className="text-base text-primary-60">Получите ваш персональный адрес в другой стране, с помощью FSG</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-accent_1-8">
          <div className="rounded-full items-center justify-center flex bg-white w-10 h-10">
            <Load />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Регистрируйтесь</h2>
            <p className="text-base text-primary-60">Получите ваш персональный адрес в другой стране, с помощью FSG</p>
          </div>
        </div>
      </div>

      <Button>Начать использование</Button>
    </div>
  );
}
