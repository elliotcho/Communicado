export const handleSocketEvents = (io, colorNavbar) =>{
    io.on('FRIEND_REQUEST', data =>{
        alert(data.msg);
        if(data.msg !== "Request already has been sent."){
           colorNavbar();
        }
     });
    //  
    io.on("ACCEPT_REQUEST", data =>{
        alert(data.msg);
    });
}