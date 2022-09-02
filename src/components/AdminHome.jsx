import React from "react";

export default function AdminHome() {
    return (
        <div >
            <div className='container text-dark' style={{ paddingTop: '4%', paddingRight: "25%", paddingLeft: "25%" ,paddingBottom:"25%"}}>
                <div className='container py-3 border' style={{
                    '--color-1': 'deepskyblue', '--color-2': 'gray',
                    background: `
                    linear-gradient(
                      120deg,
                      var(--color-1),
                      var(--color-2) 60%
                    )`
                }} >
                    <div className='text-center text-dark'>
                        <h4><b>Welocome Admin </b></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}