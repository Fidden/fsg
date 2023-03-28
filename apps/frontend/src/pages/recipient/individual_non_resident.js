import React, {useState} from 'react';
import FormHead from '@/components/ui/FormHead';
import MainLayout from '@/components/Layouts/MainLayout';
import useTranslation from 'next-translate/useTranslation';
import Input from '@/components/ui/Input';
import PrimaryButton from '@/components/ui/PrimaryButton';
import {useForm} from 'react-hook-form';
import InputGroup from '@/components/ui/InputGroup';
import Link from 'next/link';
import {useRecipient} from '@/api/recipients';
import SelectBranch from "@/components/SelectBranch";

export default function IndividualNonResident() {
    const {t} = useTranslation('auth');
    const {register, handleSubmit} = useForm();

    const [errors, setErrors] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const {createRecipient} = useRecipient();


    return (
        <MainLayout>
            <div className="flex flex-col mt-44 max-sm:mt-28 gap-8 w-80 pb-40 mx-auto">
                <FormHead>{t('accountTypes.individual_non_resident')}</FormHead>

                <div className="flex gap-8 flex-col">
                    <form
                        onSubmit={handleSubmit((data) => {
                            data['type'] = 'individual_non_resident';
                            data['branch_id'] = selectedBranchId;

                            createRecipient(data, setErrors);
                        })}>
                        <div className="flex flex-col gap-4">
                            <InputGroup label={t(`signUpPersonalDataForm.first_name_en`)} id="first_name_en"
                                        errors={errors.first_name_en}>
                                <Input autoFocus required type="text" id="first_name_en" {...register('first_name_en')}
                                       placeholder="John"/>
                            </InputGroup>

                            <InputGroup label={t(`signUpPersonalDataForm.last_name_en`)} id="last_name_en"
                                        errors={errors.last_name_en}>
                                <Input required type="text" id="last_name_en" {...register('last_name_en')}
                                       placeholder="Doe"/>
                            </InputGroup>

                            <InputGroup label={t(`signUpPersonalDataForm.document_number`)} id="document_number"
                                        errors={errors.document_number}>
                                <Input required type="text" id="document_number" {...register('document_number')}
                                       placeholder="12AB63008"/>
                            </InputGroup>

                            <InputGroup
                                label={t(`signUpPersonalDataForm.phone`)} id="phone"
                                errors={errors.phone}
                            >
                                <Input
                                    required
                                    type="text"
                                    id="document_number" {...register('phone')}
                                    placeholder="(+995) 32 555-1234"
                                />
                            </InputGroup>

                            <SelectBranch selectedBranchId={selectedBranchId} setSelectedBranchId={setSelectedBranchId}
                                          errors={errors.branch_id}/>
                        </div>

                        <div className="flex flex-col gap-6 mt-6">
                            <div className="flex flex-col gap-2">
                                <PrimaryButton>{t('signUpPersonalDataForm.submit')}</PrimaryButton>
                                <Link
                                    href="/sign-up/type"
                                    className="text-primary-100 w-full text-center flex items-center justify-center text-md hover:bg-primary-8 font-medium h-10 rounded-xl px-4 bg-primary-4">
                                    {t('common:back')}
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
