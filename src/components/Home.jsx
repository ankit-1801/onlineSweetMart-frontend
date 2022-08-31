import React, { useState, useEffect } from "react";
import PostHeader from "./PostHeader";

export default function Home() {
    return(
        <div className="text-center text-white">
        <PostHeader/>
        <h1 >SweetItems LiSt</h1>
        </div>
    );
}