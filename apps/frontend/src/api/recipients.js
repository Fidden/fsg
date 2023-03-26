import axios, {handleException} from "@/lib/axios";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

export const useRecipient = () => {
  const router = useRouter();
  const { t } = useTranslation('auth');

  const createRecipient = (data, setErrors) => {
    setErrors([]);

    return axios.post('/recipients', data)
      .then(() => {
        toast.success(t('common:success'))

        router.push('/verify-email')
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);

          return;
        }

        handleException(error);
      });
  }

  return { createRecipient }
}


