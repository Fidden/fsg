import Title from './ui/Title';
import Description from './ui/Description';
import Button from './ui/Button';

export default function FAQ() {
  return (
    <div className="py-32 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Title>Ответы на вопросы</Title>
        <Description>Здесь находятся часто-задаваемые вопросы</Description>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="grid grid-cols-3 max-md:grid-cols-1 w-full gap-4">
          <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-primary-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Вопрос</h2>
              <p className="text-base text-primary-60">Какой то ответ</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-primary-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Вопрос</h2>
              <p className="text-base text-primary-60">Какой то ответ</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-primary-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Вопрос</h2>
              <p className="text-base text-primary-60">Какой то ответ</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 w-full gap-4">
          <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-primary-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Вопрос</h2>
              <p className="text-base text-primary-60">Какой то ответ</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 p-6 rounded-xl bg-primary-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium">Вопрос</h2>
              <p className="text-base text-primary-60">Какой то ответ</p>
            </div>
          </div>
        </div>
      </div>

      <Button>Начать использование</Button>
    </div>
  );
}
