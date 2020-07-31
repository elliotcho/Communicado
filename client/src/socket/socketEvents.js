import React from 'react';
import {toast} from 'react-toastify';
import ToastMsg from '../Partials/ToastMsg';
import 'react-toastify/dist/ReactToastify.css';

export const handleSocketEvents = (io, colorNavbar) =>{
    io.on('FRIEND_REQUEST', data =>{
        const {toastId} = data;

        colorNavbar();

        toast.info(<ToastMsg toastId = {toastId} msg ={'sent you a friend request!'}/>,{
            draggable: false,
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });
    //  
    io.on("ACCEPT_REQUEST", data =>{
        const {toastId} = data;

        colorNavbar();

        toast.success(<ToastMsg toastId={toastId} msg={'accepted your friend request!'}/>, {
            draggable: false,
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });
}