import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from "axios";




interface Inputs {
    email: string;
    password: string;
};

function onSubmit(dataSet: Inputs) {

}

// export const submitForm = async (dataSet: FormType) => {
//     const res = await axios.post();
//     const detail = await res.json();
//     return detail
// }

function Login() {
    const componentName = "Home";
    useEffect(() => {

    }, []);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    return (
        <div className="Login">
            <div className="flex flex-col items-center justify-center h-screen">
                <form className="w-96 p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mb-4 text-2xl font-medium text-grey-700">ログイン</h1>
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
                            ログイン
                        </button>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-grey-600">初めてのご利用の方は</span>
                        <Link to="/signup" className="ml-1 text-sm font-bold text-blue-500 hover:text-blue-700">
                            こちら
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
