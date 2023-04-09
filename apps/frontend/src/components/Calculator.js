import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useEffect, useState} from 'react';
import FormHead from './ui/FormHead';
import InputGroup from './ui/InputGroup';
import Input from './ui/Input';
import NavItem from './Navigation/NavItem';

export default function Calculator({children}) {
    let [isOpen, setIsOpen] = useState(false);
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [volumetric, setVolumetric] = useState(0);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        setVolumetric((height * width * length) / 6000);
    }, [height, length, weight, width]);

    useEffect(() => {
        setTotal(Math.max(volumetric, weight) * 4);
    }, [volumetric, weight])

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="max-lg:hidden">
                <NavItem href="" onClick={openModal}>
                    {children}
                </NavItem>
            </div>

            <div className="lg:hidden" onClick={openModal}>
                {children}
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={openModal}>
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-primary-85 backdrop-blur-lg" aria-hidden="true"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95">
                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center py-8">
                                        <Dialog.Panel className="w-96 gap-8 flex flex-col p-8 rounded-xl bg-white">
                                            <FormHead>Калькулятор</FormHead>
                                            <div className="flex flex-col gap-4 text-left">
                                                <div className="flex gap-3">
                                                    <InputGroup label="Длина (см)">
                                                        <Input
                                                            onInput={e => setLength(e.target.value)}
                                                            autoFocus type="number" placeholder="10"
                                                        />
                                                    </InputGroup>
                                                    <InputGroup label="Ширина (см)">
                                                        <Input
                                                            onInput={e => setWidth(e.target.value)}
                                                            type="number" placeholder="20"
                                                        />
                                                    </InputGroup>
                                                    <InputGroup label="Высота (см)">
                                                        <Input
                                                            onInput={e => setHeight(e.target.value)}
                                                            type="number" placeholder="30"
                                                        />
                                                    </InputGroup>
                                                </div>
                                                <InputGroup label="Вес (кг)">
                                                    <Input
                                                        onInput={e => setWeight(e.target.value)}
                                                        type="number" placeholder="5"
                                                    />
                                                </InputGroup>
                                                <table
                                                    className="min-w-full mb-2 table-auto rounded-xl text-primary-100 text-md divide-y divide-primary-8 bg-primary-2">
                                                    <tbody className="divide-y divide-primary-8 ">
                                                    <tr className="h-12">
                                                        <td className="px-4 text-primary-60">Вес</td>
                                                        <td className="font-medium text-right px-4">{weight} Кг</td>
                                                    </tr>
                                                    <tr className="h-12">
                                                        <td className="px-4 text-primary-60">Объёмный вес</td>
                                                        <td className="font-medium text-right px-4">{volumetric} Кг</td>
                                                    </tr>
                                                    <tr className="h-12">
                                                        <td className="px-4 text-primary-60">Оплачиваемый вес</td>
                                                        <td className="font-medium text-right px-4">{weight} Кг</td>
                                                    </tr>
                                                    <tr className="h-12">
                                                        <td className="px-4 font-medium text-primary-100">Итого</td>
                                                        <td className="font-medium text-right text-accent_1-100 px-4">{total}
                                                            ₾
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="text-primary-100 w-full text-md hover:bg-primary-8 font-medium h-10 rounded-xl px-4 bg-primary-4">
                                                    Отмена
                                                </button>
                                            </div>
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
