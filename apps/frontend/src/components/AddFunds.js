import FormHead from './ui/FormHead';
import PrimaryButton from './ui/PrimaryButton';
import InputGroup from './ui/InputGroup';
import Input from './ui/Input';
import InputDescription from './ui/InputDescription';
import Bog from './icons/BOG';
import Tbc from './icons/TBC';
import GelCurrency from './icons/GelCurrency';

export default function AddFunds({ children }) {
  return (
    <form className="flex flex-col mt-44 gap-8 w-80 pb-40 mx-auto">
      <FormHead>Пополнение баланса</FormHead>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col w-full">
            <input type="radio" defaultChecked required className="peer hidden" name="type" value="bog" id="bog" />
            <label
              className="radio peer-checked:border-brand-100 peer-checked:bg-brand-4 peer-checked:text-brand-100 text-center text-md text-primary-100 font-medium cursor-pointer py-6 px-4 border-1 border-primary-16 rounded-xl"
              htmlFor="bog">
              <div className="flex flex-col gap-3 items-center">
                <div className="svg_32">
                  <Bog />
                </div>
                <p>Bank of Georgia</p>
              </div>
            </label>
          </div>

          <div className="flex flex-col w-full">
            <input type="radio" required className="peer hidden" name="type" value="tbc" id="tbc" />
            <label
              className="radio peer-checked:border-brand-100 peer-checked:bg-brand-4 peer-checked:text-brand-100 text-center text-md text-primary-100 font-medium cursor-pointer py-6 px-4 border-1 border-primary-16 rounded-xl"
              htmlFor="tbc">
              <div className="flex flex-col gap-3 items-center">
                <div className="svg_32">
                  <Tbc />
                </div>
                <p>TBC Bank</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-left">
          <InputGroup label="Сумма">
            <Input autoFocus type="number" min="1" required placeholder="100">
              <div className="svg_icon svg_16 pl-3 py-2 bg-white">
                <GelCurrency />
              </div>
            </Input>
            <InputDescription>Ваш баланс изменится, после оплаты</InputDescription>
          </InputGroup>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <PrimaryButton>Пополнить баланс</PrimaryButton>
      </div>
    </form>
  );
}
