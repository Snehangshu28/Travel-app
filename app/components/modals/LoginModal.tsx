'use client';

import {signIn} from 'next-auth/react';
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useregisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../imputs/Input";
import { toast }  from 'react-hot-toast'
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from 'next/navigation';


const LoginModal = () =>{
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoding, setIsLoding] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors,
            
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoding(true);

        signIn('credentials',{
            ...data,
            redirect: false,
        })
        .then((callback) =>{
            setIsLoding(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome "
                subtitle="Login to your  account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoding}
                register={register}
                errors={errors}
                required
            />
             <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoding}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 " >
            <hr/>
            <Button
                outline
                label="continue with Google"
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button
                outline
                label="continue with GitHub"
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light

            "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={registerModal.onClose}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    >
                        login
                    </div>
                </div>
            </div>
        </div>
    )


    return(
        <Modal
            disabled={isLoding}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export  default LoginModal;