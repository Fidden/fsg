import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function Hero() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>
          Заказывайте товары в Грузию
          <br /> из популярных магазинов мира,
          <br /> с помощью FSG
        </Title>
        <div className="w-1/2 max-md:w-full">
          <Description>
            Мы выделим вам ваш личный адрес в Италии, на который вы можете заказывать товары, а затем, мы доставим их в Грузию
          </Description>
        </div>
      </div>
      <div className="flex max-md:flex-col gap-4">
        <Button>Начать использование</Button>
        <a href="#" className="py-4 text-center max-md:text-base px-8 text-land_18 font-medium bg-primary-4 rounded-xl">
          Попробовать бесплатно
        </a>
      </div>
    </div>
  );
}
