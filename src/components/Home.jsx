import React, { useState, useEffect } from "react";
import PostHeader from "./PostHeader";
import ItemService from '../services/ItemService';
import FoodItems from "./FoodItems";
import AdminHome from "./AdminHome";

export default function Home() {
    const [foodItems ,setFoodItems]  = useState([]);

  
    useEffect(()=>{
      ItemService.getAllSweetItem().then(response=>{
          setFoodItems(response.data);
      }).catch(error => {
        console.log(error);
      })
    },[]);
    return(

        <div>

        {(localStorage.getItem('role')!='ROLE_ADMIN') &&
         (<div className="bg-dark">
        <PostHeader/>
        <FoodItems data = {foodItems}/>
        </div>)
        }
        { (localStorage.getItem('role')=='ROLE_ADMIN') &&
          <AdminHome/>
        }

        </div>
    );
}