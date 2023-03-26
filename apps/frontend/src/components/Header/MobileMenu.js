import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Burger from '@/components/icons/Burger';
import Close from '@/components/icons/Close';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import MobileNavItem from '@/components/Navigation/MobileNavItem';
import Alert from '@/components/icons/Alert';
import CalculatorIcon from '@/components/icons/CalculatorIcon';
import TruckIcon from '@/components/icons/TruckIcon';
import Calculator from '@/components/Calculator';

export default function MobileMenu() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="svg_icon svg_24 px-2 h-10 flex items-center w-10" onClick={openModal}>
        <Burger />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={openModal}>
          {/* The backdrop, rendered as a fixed sibling to the panel container */}

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300 bg-white"
                enterFrom="-translate-x-full"
                leave="ease-in duration-200 bg-white"
                leaveTo="-translate-x-full">
                <div className="fixed inset-0 px-4 overflow-y-auto">
                  <div className="flex min-h-full py-20 bg-white justify-center">
                    <Dialog.Panel className="w-96 z-50 max-w-full flex flex-col">
                      <div className="flex fixed inset-0 px-4 bg-reverse_primary-85 backdrop-blur-md justify-between h-20 items-center">
                        <div className="svg_icon svg_24 justify-center h-10 flex items-center w-10" onClick={closeModal}>
                          <Close />
                        </div>
                        <LocaleSwitcher className="lg:hidden" />
                      </div>
                      <h2 className="text-lg text-left mb-1 font-medium text-primary-100">Меню</h2>
                      <MobileNavItem description="Презентация FSG" img={<img width="24" height="24" src="/logo.png" alt="Logo" />}>
                        Главная
                      </MobileNavItem>
                      <Calculator>
                        <MobileNavItem description="Расчёт стоимости доставки" img={<CalculatorIcon />}>
                          Калькулятор
                        </MobileNavItem>
                      </Calculator>
                      <MobileNavItem description="Дополнительная услуга" img={<TruckIcon />}>
                        Доставка
                      </MobileNavItem>
                      <MobileNavItem description="Запрещённые предметы и не только" img={<Alert />}>
                        Правила
                      </MobileNavItem>
                    </Dialog.Panel>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
