import useSWR from 'swr';
import axios, {handleException} from '@/lib/axios';
import {useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';
import toast from 'react-hot-toast';
import useTranslation from "next-translate/useTranslation";

const middlewares = {
    guest: 0,
    auth: 1,
    'has-recipient': 2,
    'has-verified-email': 3,
    client: 4,
};

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {
    const router = useRouter();
    const {t} = useTranslation('auth');

    const {
        data: user,
        error,
        mutate,
        isLoading: isUserLoading,
    } = useSWR('/users/me', () => {
        return axios
            .get('/users/me')
            .then((res) => res.data)
            .catch(async (error) => {
                if (error.response?.status === 401) {
                    return;
                }

                handleException(error);
            });
    });

    const register = async ({setErrors, ...props}) => {
        setErrors([]);

        axios
            .post('/register', props)
            .then(() => mutate())
            .then(() => router.push('/sign-up/type'))
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);

                    return;
                }

                handleException(error);
            });
    };

    const redirectAfterLogin = () => {
        if (!hasRecipient) {
            router.push('/sign-up/type');
        } else if (!hasVerifiedEmail) {
            router.push('/verify-email');
        } else {
            router.push('/dashboard');
        }
    };

    const login = async ({setErrors, setStatus, ...props}) => {
        setErrors([]);
        setStatus(null);

        axios
            .post('/login', props)
            .then(() => mutate())
            .then(redirectAfterLogin)
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);

                    return;
                }

                handleException(error);
            });
    };

    const forgotPassword = async ({setErrors, setStatus, email}) => {
        setErrors([]);
        setStatus(null);

        axios
            .post('/forgot-password', {email})
            .then((response) => setStatus(response.data.status))
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);

                    return;
                }

                handleException(error);
            });
    };

    const resetPassword = async ({setErrors, setStatus, ...props}) => {
        setErrors([]);
        setStatus(null);

        axios
            .post('/reset-password', {token: router.query.token, ...props})
            .then((response) => router.push('/sign-in?reset=' + btoa(response.data.status)))
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);

                    return;
                }

                handleException(error);
            });
    };

    const resendEmailVerification = ({setStatus}) => {
        axios.post('/email/verification-notification').then((response) => {
            setStatus(response.data.status)

            toast.success(t('common:success'))
        });
    };

    const logout = async () => {
        if (!error) {
            await axios
                .post('/logout')
                .then(() => {
                    mutate(null);

                    router.push('/sign-in');
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        return;
                    }

                    handleException(error);
                });
        }

        // await router.push('/sign-in');
    };

    const isAuth = useMemo(() => {
        return user && !error;
    }, [error, user]);

    const hasRecipient = useMemo(() => {
        return isAuth && user.recipient;
    }, [isAuth, user]);

    const hasVerifiedEmail = useMemo(() => {
        return isAuth && user.email_verified_at;
    }, [isAuth, user]);

    const isClient = useMemo(() => {
        return hasRecipient && hasVerifiedEmail;
    }, [hasRecipient, hasVerifiedEmail]);

    const whereToGo = useMemo(() => {
        if (isUserLoading) {
            return;
        }

        if (isClient) {
            return '/dashboard';
        }

        if (middlewares[middleware] >= middlewares['auth'] && !isAuth) {
            logout();

            return '/sign-in';
        }

        if (middlewares[middleware] >= middlewares['has-recipient'] && !hasRecipient) {
            return '/sign-up/type';
        }

        if (hasRecipient && !hasVerifiedEmail && router.pathname !== '/verify-email') {
            return '/verify-email';
        }

        if (middlewares[middleware] >= middlewares['has-verified-email'] && !hasVerifiedEmail) {
            return '/verify-email';
        }

        if (middleware === 'guest' && isAuth && redirectIfAuthenticated) {
            return redirectIfAuthenticated;
        }

        if (middleware === 'client' && !isClient) {
            toast.error('You are not a client. Please contact the administrator.'); // не должен никогда выполниться
        }
    }, [isUserLoading, middleware, isAuth, hasRecipient, hasVerifiedEmail, router.pathname, redirectIfAuthenticated, isClient]);

    useEffect(() => {
        if (
            window.location.pathname === '/verify-email' &&
            hasVerifiedEmail
        ) {
            router.push('/dashboard');
        }
    }, [user, error])

    const verifyEmail = async (code) => {
        try {
            const response = await axios.post('/verify-email', {
                code
            });

            if (response.status === 200) {
                router.push('/dashboard');
            }
        } catch (e) {
            console.log('verify email log', e)
        }
    }

    // useEffect(() => {
    //   if (isUserLoading) {
    //     return;
    //   }
    //
    //   if (middlewares[middleware] >= middlewares['auth'] && !isAuth) {
    //     logout();
    //
    //     return;
    //   }
    //
    //   if (middlewares[middleware] >= middlewares['has-recipient'] && !hasRecipient) {
    //     router.push('/sign-up/type');
    //
    //     return;
    //   }
    //
    //   if (hasRecipient && !hasVerifiedPhone && router.pathname !== '/sign-up/phone/verify') {
    //     router.push('/sign-up/phone/verify');
    //
    //     return;
    //   }
    //
    //   if (middlewares[middleware] >= middlewares['has-verified-phone'] && !hasVerifiedPhone) {
    //     router.push('/sign-up/phone/verify');
    //
    //     return;
    //   }
    //
    //   if (middleware === 'guest' && isAuth && redirectIfAuthenticated) {
    //     router.push(redirectIfAuthenticated);
    //   }
    //
    //   if (middleware === 'client' && !isClient) {
    //     toast.error('You are not a client. Please contact the administrator.'); // не должен никогда выполниться
    //   }
    // }, [isUserLoading]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isUserLoading,
        isAuth,
        isClient,
        hasRecipient,
        hasVerifiedEmail,
        whereToGo,
        verifyEmail
    };
};
