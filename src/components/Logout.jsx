import React from "react";
export default function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.open("/", "_self");
    return(
        <>
        </>
    )
}