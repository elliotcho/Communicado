import React from 'react';
import {toast} from 'react-toastify';
import ToastMsg from '../Partials/ToastMsg';
import 'react-toastify/dist/ReactToastify.css';

// R: -- ELLIOT/GUGSA
export const handleSocketEvents = 
    (
        io, 
        colorNavbar, 
        updateOnlineFriends, 
        getRecipients,
        loadChats,
        handleNewMessage,
        handleIsTyping
    ) =>{
    
    io.on('FRIEND_REQUEST', data =>{
        const {toastId} = data;

        colorNavbar();

        toast.info(<ToastMsg toastId = {toastId} msg ={'sent you a friend request!'}/>,{
            draggable: false,
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });
    
    io.on("ACCEPT_REQUEST", data =>{
        const {toastId} = data;

        colorNavbar();

        toast.success(<ToastMsg toastId={toastId} msg={'accepted your friend request!'}/>, {
            draggable: false,
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });

    io.on('GET_ONLINE_FRIENDS', data =>{
        updateOnlineFriends(data.friends);
    });

    io.on('GET_RECIPIENTS', data =>{
        getRecipients(data.queryResult);
    });

    io.on('CHAT_CREATED', data =>{
        loadChats(data.uid);
    });

    io.on('NEW_MESSAGE', data =>{
        const {newMessage, chatId} = data;

        handleNewMessage(newMessage, chatId);
    });

    io.on('IS_TYPING', data =>{
        const {uid, chatId} = data;

        handleIsTyping(uid,chatId);
    })
}