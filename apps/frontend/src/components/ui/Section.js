export default function Section({ title = 'Заголовок', description = 'Описание' }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-medium text-primary-100">{title}</h2>
      <p className="text-md first-line:text-primary-60">{description}</p>
    </div>
  );
}
