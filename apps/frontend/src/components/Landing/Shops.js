import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function Shops() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>
          Работаем с 10.000+ <br />
          популярными магазинами
        </Title>
        <div className="w-3/4">
          <Description>Заказывайте с любого магазина мира в Грузию через сервис FSG</Description>
        </div>
      </div>
      <div>Guide</div>
      <Button>Начать использование</Button>
    </div>
  );
}
