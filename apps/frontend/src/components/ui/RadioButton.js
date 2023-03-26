export default function RadioButton({ title = 'Заголовок', img, id }) {
  return (
    <div className="flex flex-col">
      <input type="radio" required className="peer hidden" name="type" value={id} id={id} />
      <label
        className="radio peer-checked:svg-icon-active peer-checked:border-brand-100 peer-checked:bg-brand-4 peer-checked:text-brand-100 text-center text-md text-primary-100 font-medium cursor-pointer py-8 px-4 border-1 border-primary-16 rounded-xl"
        htmlFor={id}>
        <div className="flex flex-col gap-2 items-center">
          {img}
          <p>{title}</p>
        </div>
      </label>
    </div>
  );
}
