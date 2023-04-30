export default function About() {
  return (
    <div className="py-32 grid gap-8 grid-cols-2 max-md:grid-cols-1">
      <div>
        <img src="/about.png" className="w-max"></img>
      </div>
      <div className="flex text-left justify-center flex-col gap-8">
        <div className="flex flex-col text-left gap-4">
          <h1 className="text-land_h1 max-md:text-land_h1md font-semibold text-left">О нас</h1>
          <p className="text-land_p  max-md:text-land_18">
            Почтовая компания "FSG GROUP" перевозит личные посылки и коммерческие грузы из Европы в Грузию и наоборот.
            <br />
            <br />
            Наш многолетний опыт гарантирует быструю и безопасную перевозку вашего груза. <br />
            <br />С целью упрощения обслуживания FSG постепенно открывает новые офисы в разных странах. <br />
            <br />
            Компания полностью покрывает все регионы Грузии через свои филиалы и почтовых агентов.
          </p>
        </div>
      </div>
    </div>
  );
}
