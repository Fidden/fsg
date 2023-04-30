import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function CTA() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>FSG</Title>
        <div className="w-3/4">
          <Description>Заказывайте товары с любой точки мира и мы доставим их в Грузию</Description>
        </div>
      </div>
      <Button>Начать использование</Button>
    </div>
  );
}
