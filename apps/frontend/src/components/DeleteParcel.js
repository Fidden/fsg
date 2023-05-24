import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import FormHead from './ui/FormHead';
import PrimaryButton from './ui/PrimaryButton';
import {useForm} from 'react-hook-form';
import axios, {handleException} from '@/lib/axios';
import OutlinedButton from "@/components/ui/OutlinedButton";

const currencies = ['USD', 'EUR', 'GEL'];

export default function EditParcel({order, reloadList}) {
    const [errors, setErrors] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

    const {register, handleSubmit} = useForm({
        values: {
            name: order.package.name,
            tracking_number: order.package.tracking_number,
            worth_amount: order.package.worth_amount,
            shop: order.package.shop.url
        }
    });

    const onSubmmit = (data) => {
        setErrors([]);

        return axios
            .delete(`/orders/${order.id}`)
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
            <OutlinedButton onClick={openModal}>
                Удалить
            </OutlinedButton>
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
                                                <FormHead>Удаление посылки</FormHead>
                                                <div className="flex flex-col gap-4 text-left">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                                        distinctio dolores eius, illum in incidunt iure iusto, magnam
                                                        natus nostrum quas, tenetur vel vitae. Autem cupiditate dolorem
                                                        ipsa quae soluta!
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <PrimaryButton>Удалить</PrimaryButton>
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
