import React, { useEffect } from 'react';
import { useState } from 'react';
import NavBar from "../NavBarConponent";
import { useForm } from 'react-hook-form';
import { AuthService } from '../../servise/authServise';
import Loading from '../Loading';
import { Util } from '../../utils/util';
import { Link, useNavigate } from "react-router-dom";
import SnackbarComponent from '../SnackbarComponent';

interface Form {
    name: string;
    email: string;
    password: string;
};

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);


    const navigate = useNavigate();
    useEffect(() => {

    }, []);

    async function onSubmit(dataSet: Form) {
        setIsLoading(true);
        await AuthService.register({
            url: `${Util.local}api/register`,
            param: dataSet,
            success(message) {
                console.log(message);
                setIsLoading(false);
                navigate("/home");
            }, failure(error) {
                setErrorMessage(error);
                setSnackbarOpen(true);
                console.log(error);
                setIsLoading(false);
            },
        });
    }
    const handleCloseSnackbar = (): void => {
        setSnackbarOpen(false);
    };
    return (
        <Loading
            isLoading={isLoading}
            loadingtext='新規作成中'
        >
            <div className="SignUp">
                <div className="flex flex-col items-center justify-center h-screen">
                    <form className="w-96 p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="mb-4 text-2xl font-medium text-grey-700">新規登録</h1>
                        <div className='mb-4'>
                            <label className="justify-start flex text-sm font-medium text-grey-600">名前</label>
                            <input
                                {...register("name", {
                                    required: "名前は必須です",
                                    maxLength: {
                                        value: 8,
                                        message: "名前は8文字以内でお願いします。",
                                    },
                                })}
                                type="text"
                                placeholder="mail@myservice.com"
                                className="w-full p-2 mt-1 border-2 rounded-md"
                            />
                            {errors.name && (
                                <span className="justify-start flex text-sm text-red-600">※{errors.name.message}</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="justify-start flex text-sm font-medium text-grey-600">メールアドレス</label>
                            <input
                                {...register("email", {
                                    required: "メールアドレスは必須です",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                                        message: "このメールアドレスは無効です。",
                                    },
                                })}
                                type="email"
                                placeholder="mail@myservice.com"
                                className="w-full p-2 mt-1 border-2 rounded-md"
                            />
                            {errors.email && (
                                <span className="justify-start flex text-sm text-red-600">※{errors.email.message}</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="justify-start flex text-sm font-medium text-grey-600">パスワード</label>
                            <input
                                {...register("password", {
                                    required: "パスワードは必須です",
                                    minLength: {
                                        value: 8,
                                        message: "パスワードは8文字以上でなくてはなりません",
                                    },
                                })}
                                type="password"
                                className="w-full p-2 mt-1 border-2 rounded-md"
                            />
                            {errors.password && (
                                <span className="justify-start flex text-sm text-red-600">※{errors.password.message}</span>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                新規登録
                            </button>
                        </div>
                    </form>
                </div>
                <SnackbarComponent
                    message={errorMessage}
                    open={snackbarOpen}
                    onClose={handleCloseSnackbar}
                />
            </div>
        </Loading>
    );
}

export default SignUp;