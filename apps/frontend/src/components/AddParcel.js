import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import FormHead from './ui/FormHead';
import PrimaryButton from './ui/PrimaryButton';
import InputGroup from './ui/InputGroup';
import Input from './ui/Input';
import {useForm} from 'react-hook-form';
import axios, {handleException} from '@/lib/axios';
import InputDescription from '@/components/ui/InputDescription';
import FormSelect from '@/components/ui/FormSelect';
import Invoice from '@/components/icons/Invoice';

const currencies = ['USD', 'EUR', 'GEL'];

export default function AddParcel({children, reloadList}) {
    const [errors, setErrors] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

    const {register, handleSubmit} = useForm();

    const onSubmmit = (data) => {
        setErrors([]);

        return axios
            .post('/orders', {
                ...data,
                worth_currency: selectedCurrency,
            })
            .then(() => {
                if (reloadList)
                    reloadList();
                closeModal();
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);

                    return;
                }

                console.log(error)

                handleException(error);
            });
    };

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="text-primary-100 max-sm:w-full text-md hover:bg-primary-8 font-medium h-10 rounded-xl px-4 bg-primary-4">
                {children}
            </button>
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
                                        <Dialog.Panel>
                                            <form onSubmit={handleSubmit(onSubmmit)}
                                                  className="w-96 gap-8 flex flex-col p-8 rounded-xl bg-white">
                                                <FormHead>Добавление посылки</FormHead>
                                                <div className="flex flex-col gap-4 text-left">
                                                    <InputGroup label="Название посылки" errors={errors.name}>
                                                        <Input maxLength="20" {...register('name')}
                                                               placeholder="Любое название"/>
                                                        <InputDescription>Это поможет вам определить
                                                            посылку</InputDescription>
                                                    </InputGroup>
                                                    <InputGroup label="Номер отслеживания (трекинг)"
                                                                errors={errors.tracking_number}>
                                                        <Input {...register('tracking_number')}
                                                               placeholder="1Z602AW60283834284"/>
                                                        <InputDescription>Укажите трекинг с сайта, с которого сделан
                                                            заказ</InputDescription>
                                                    </InputGroup>
                                                    <InputGroup label="Веб-сайт" errors={errors.shop}>
                                                        <Input {...register('shop')} placeholder="amazon.com"/>
                                                        <InputDescription>Сайт, с которого сделан
                                                            заказ</InputDescription>
                                                    </InputGroup>

                                                    <InputGroup label="Стоимость посылки" errors={errors.worth_amount}>
                                                        <div className="flex gap-2">
                                                            <Input type="number" {...register('worth_amount')}
                                                                   placeholder="10.25"/>
                                                            <FormSelect selectedCurrency={selectedCurrency}
                                                                        setSelectedCurrency={setSelectedCurrency}
                                                                        availableCurrencies={currencies}/>
                                                        </div>

                                                        <InputDescription>Укажите, за какую цену был приобретён
                                                            товар</InputDescription>
                                                    </InputGroup>
                                                    <div className="p-4 bg-primary-2 gap-3 flex flex-col rounded-md">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="svg_24">
                                                                <Invoice/>
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <h6 className="font-medium text-md text-primary-100">Загрузка
                                                                    Invoice (чек)</h6>
                                                                <p className="text-md text-primary-60">
                                                                    Если стоимость посылки превышает 300 ₾, то вы
                                                                    обязательно должны загрузить Invoice. Если меньше
                                                                    300 ₾, то
                                                                    необязательно, но по желанию.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <label className="block">
                                                            <input
                                                                type="file"
                                                                {...register('invoice')}
                                                                className="block w-full file:hover:cursor-pointer hover:file:bg-primary-8 text-md text-primary-60 file:h-10 file:mr-3 file:px-3 file:bg-primary-4 file:text-md file:rounded-md file:border-0"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <PrimaryButton>Добавить</PrimaryButton>
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="text-primary-100 w-full text-md hover:bg-primary-8 font-medium h-10 rounded-xl px-4 bg-primary-4">
                                                        Отмена
                                                    </button>
                                                </div>
                                            </form>
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
