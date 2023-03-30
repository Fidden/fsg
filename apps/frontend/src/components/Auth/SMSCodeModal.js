import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import FormHead from '@/components/ui/FormHead';
import Input from '@/components/ui/Input';
import {flushSync} from 'react-dom';
import PrimaryButton from '@/components/ui/PrimaryButton';
import InputError from '@/components/ui/InputError';
import useTranslation from 'next-translate/useTranslation';
import {useRecipient} from "@/api/recipients";

const numRegexp = /[0-9]/;

const SMSCodeModal = ({phone, resendCode, visible, setVisible, codeData}) => {
    const {t} = useTranslation('auth');
    const input = useRef(null);

    const {confirmPhone} = useRecipient();

    const [activeInput, setActiveInput] = useState(0);
    const [code, setCode] = useState('');

    const [seconds, setSeconds] = useState(-1);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        confirmPhone({phone: codeData.phone, code}, setErrors)
    };

    const onKeyPress = (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            setCode((prevState) => prevState.substring(0, prevState.length - 1));

            if (event.target.value && input.current?.value) {
                input.current.value = '';
                return;
            }

            if (activeInput > 0) {
                flushSync(() => {
                    setActiveInput((prevState) => prevState - 1);
                });
                input.current.value = '';
                return;
            }
        }

        if (numRegexp.test(event.key) && code.length < 4) {
            setCode((prevState) => prevState + event.key);
            setActiveInput((prevState) => prevState + 1);
        }
    };

    const onPaste = (e) => {
        const value = e.clipboardData.getData('Text');
        if (value.length === 4 && numRegexp.test(value)) {
            setCode(value);
            setActiveInput(3);
        }
    };

    useEffect(() => {
        if (!input.current || activeInput === 4) return;

        input.current?.focus();
    }, [activeInput]);

    useEffect(() => {
        setErrors([])
    }, [code]);

    // timestamp of code expiration
    const timeExpireAt = useMemo(() => {
        if (!codeData?.expire_at) return;

        return new Date(codeData.expire_at).getTime();
    }, [codeData]);

    // update seconds left
    useEffect(() => {
        if (!timeExpireAt) return;

        if (timeExpireAt < new Date().getTime()) {
            setSeconds(0);
            return;
        }

        const interval = setInterval(() => {
            const diffInSeconds = Math.round((new Date().getTime() - timeExpireAt) / 1000);

            setSeconds(Math.abs(diffInSeconds));

            if (diffInSeconds >= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeExpireAt]);

    return (
        <Transition appear show={visible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <form onSubmit={handleSubmit}
                          className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel
                                className="w-96  transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    <FormHead>{t('phoneForm.title')}</FormHead>
                                </Dialog.Title>

                                {seconds !== -1 && (
                                    <div className="mt-2 text-center">
                                        <p className="text-md first-line:text-primary-60">{t('phoneForm.weSent', {
                                            phone,
                                            seconds
                                        })}</p>
                                        {/*<p className="text-md font-bold first-line:text-primary-100">{phone}</p>*/}
                                    </div>
                                )}

                                <div className="mt-8">
                                    <div className="grid grid-cols-4 gap-3 justify-between">
                                        {Array(4)
                                            .fill('_')
                                            .map((_, index) => (
                                                <Input
                                                    maxLength={1}
                                                    key={index}
                                                    className="text-center py-3 !px-2 text-xl h-auto focus:border-brand-100 focus:bg-brand-4"
                                                    onKeyDown={onKeyPress}
                                                    onFocus={() => setActiveInput(index)}
                                                    onPaste={onPaste}
                                                    onChange={(e) => {
                                                        if (!numRegexp.test(e.nativeEvent.data) && code.length < 4) {
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                    value={code[index] || ''}
                                                    ref={activeInput === index ? input : null}
                                                />
                                            ))}
                                        <InputError className="w-max" messages={errors.code}/>
                                    </div>

                                    {seconds === 0 && (
                                        <button className="text-center text-md font-semibold w-full mt-8"
                                                onClick={resendCode}>
                                            {t('phoneForm.resendCode')}
                                        </button>
                                    )}

                                    <PrimaryButton className="w-full mt-8" disabled={!(code.length === 4)}>
                                        {t('phoneForm.submitCode')}
                                    </PrimaryButton>
                                    <PrimaryButton className="w-full !bg-primary-4 !text-primary-100 mt-2"
                                                   onClick={() => setVisible(false)} type="button">
                                        {t('common:cancel')}
                                    </PrimaryButton>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </form>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SMSCodeModal;
