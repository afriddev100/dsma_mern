import React from 'react'
import { useState, useEffect ,CSSProperties} from 'react';



export default function EnrollmentScreen() {
    const [enrollData, setPostData] = useState({});
    let [color, setColor] = useState("#ffffff");

    const sendPostData = async () => {
        try {


            enrollData.firstName = document.getElementById('firstName').value;
            enrollData.lastName = document.getElementById('lastName').value;
            enrollData.middleName = document.getElementById('middleName').value;
            enrollData.gender = document.getElementById('inputGender').value;

            enrollData.email = document.getElementById('email').value;
            enrollData.contanctNo = document.getElementById('contanctNo').value;
            enrollData.address = document.getElementById('inputAddress').value;

            const response = await fetch('http://localhost:5100/enroll',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(enrollData)
                }
            );
            console.log(response.body);
            alert('Enrollment successful');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Error Occured');
        }

    };



    useEffect(() => {



    }, []);


    return (
        <>
       
            <div
                style={{
                    display: "flex", flexDirection: 'row',
                    justifyContent: "center", alignItems: "center"
                }}>

                <div className="card " style={{ maxWidth: "40rem" }}>
                    <h1 className="display-6">Enrollment Information</h1>
                    <div className="card-body">
                        <div className="row g-3" >
                            <div className="col-md-6">
                                <label for="firstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstName" />
                            </div>

                            <div className="col-md-6">
                                <label for="middleName" className="form-label">Middle Name</label>
                                <input type="text" className="form-control" id="middleName" />
                            </div>
                            <div className="col-md-6">
                                <label for="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputGender" className="form-label">Gender</label>
                                <select id="inputGender" className="form-select">
                                    <option selected>Choose</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label for="email" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" />
                            </div>

                            <div className="col-md-6">
                                <label for="contanctNo" className="form-label">Contact No.</label>
                                <input type="number" className="form-control" id="contanctNo" />
                            </div>

                            <div className="col-12">
                                <label for="inputAddress" className="form-label">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            </div>


                            <div className="col-12 d-flex flex-row justify-content-center">
                                <button type="submit" onClick={sendPostData} className="btn btn-success"> Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </>
    )
}
