'use client';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { CustomUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import { Fragment, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import UserAvatar from '../UserAvatar';
import MenuItem from './MenuItem';

interface UserMenuProps {

    currentUser?: CustomUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const toggle = useCallback(() => {
        setIsOpen(isOpen => !isOpen);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();

        rentModal.onOpen();
    }, [loginModal, currentUser, rentModal]);

    return (
        <article className="relative">
            <article className="flex flex-row items-center gap-3" >
                <article
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </article>
                <article
                    onClick={toggle}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <article className="hidden md:block">
                        <UserAvatar src={currentUser?.image} />
                    </article>
                </article>
            </article>
            {
                isOpen &&
                <article className="absolute right-0 top-12 text-sm rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden " >
                    <article className="flex flex-col cursor-pointer" >
                        {
                            currentUser ?
                                (
                                    <Fragment>
                                        <MenuItem label="My trips" onClick={() => { }} />
                                        <MenuItem label="Favourites" onClick={() => { }} />
                                        <MenuItem label="Reservations" onClick={() => { }} />
                                        <MenuItem label="Properties" onClick={() => { }} />
                                        <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />
                                        <hr />
                                        <MenuItem label="Logout" onClick={() => signOut()} />
                                    </Fragment>
                                ) :

                                (
                                    <Fragment>
                                        <MenuItem label="LogIn" onClick={loginModal.onOpen} />
                                        <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
                                    </Fragment>
                                )
                        }

                    </article>
                </article>
            }
        </article >
    )
}

export default UserMenu;