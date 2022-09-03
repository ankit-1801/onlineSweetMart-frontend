import React from 'react';
import Itemcard from "./Itemcard";
import 'bootstrap/dist/css/bootstrap.min.css';
const FoodItems = (props) => {
    return (
        <>
            <h1 className="text-center mt-3 text-white">All Items</h1>
            <section className="py-4 container">
                <div className="row justify-content-center">

                    {props.data.map((item, index) => {
                        return (
                            <>  
                                <Itemcard
                                    key={index}
                                    img={"http://localhost:9191/item/images/" + item.image}
                                    id={item.sweetItemId}
                                    title={item.name}
                                    desc={item.description}
                                    price={item.price}
                                    quantity={item.quantity}
                                    item={item}
                                />
                            </>
                        )
                    })}
                </div>

            </section>
        </>
    );
};


export default FoodItems;
