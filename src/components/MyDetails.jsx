import React from "react";

export default function MyDetails() {
    return(
        <div className="text-center text-white">
            <div className="mb-4" >
                <div className="container" style={{}}>
                    <div  style={{paddingRight:"23%",paddingLeft:"23%"}}>
                      <ul class="list-group ">
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Name</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Email</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Phone Number</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Street</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">City</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">State</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Country</div>
                            {}
                          </div>
                        </li>
                        <li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Pin Code :</div>
                            {}
                          </div>
                        </li>
                      </ul>
                  </div>
                </div>
              </div>
        </div>
    )
}