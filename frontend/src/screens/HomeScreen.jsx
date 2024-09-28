import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from 'react-bootstrap';
import TrainingPackage from '../components/TrainingPackage';
import ProductCarousel from "../components/ProductCarousel";
import axios from "axios";
import FormContainer from "../components/FormContainer";

export default function HomeScreen() {
  const [trainingPackages,setTrainingPackages]=useState([]);
  const  [isLoading,setIsLoading]=useState(true);
  const  [error,setError]=useState();
  useEffect(()=>{
    
      const fetchPorducts=async ()=>{
        try{
          const {data}= await axios.get("/api/trainingPackages/latest");
          setTrainingPackages(data);
          setIsLoading(false);
        }
        catch(error){
          setIsLoading(false);
            setError({data:{message:"Error while calling API"}});
        }
       
      }
      fetchPorducts();
  },[])



  return (
    <>
      <div className="background-container">
        <div className="overlay"></div>
        <div className="content">
          <h1>Welcome to Driving School App</h1>
          <p>
            <Link className="nav-link active" aria-current="page" to="/enroll">
              <button type="button" className="btn btn-light enrollbutton">
                Enroll Now
              </button>
            </Link>
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* <div style={{maxWidth:"60%"}}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                Card subtitle
              </h6>
              <p class="card-text">
                Welcome to [Driving School Name], your gateway to safe and
                confident driving! Whether you're gearing up for your first
                lesson or aiming to polish your skills, our driving school is
                here to guide you every step of the way. Explore our
                comprehensive range of packages tailored to suit your needs and
                schedule. From beginner basics to advanced techniques, we've got
                you covered. Enrolling is easy! Simply navigate through our
                user-friendly interface to select your preferred lesson timings
                and package options. Our experienced instructors are dedicated
                to providing personalized instruction to ensure you become a
                skilled and responsible driver. Join us today and embark on your
                journey towards mastering the art of driving with confidence and
                competence. Let's hit the road together!
              </p>
              <a href="#" class="card-link">
                Card link
              </a>
              <a href="#" class="card-link">
                Another link
              </a>
            </div>
          </div>
        </div> */}

<Container className="my-5">
      <Card className="text-center">
      
        <Card.Body>
          <Card.Title>Welcome to [Driving School Name]!</Card.Title>
          <Card.Text>
            At [Driving School Name], we are dedicated to shaping confident and skilled drivers for a safer tomorrow. Our comprehensive training packages cater to all levels, whether you’re just starting out or looking to enhance your driving skills. With experienced instructors, modern vehicles, and a commitment to excellence, we provide personalized learning experiences that make driving enjoyable and stress-free.
          </Card.Text>
          <FormContainer size={8}> 
          <ProductCarousel products={trainingPackages} />
          </FormContainer>
  
          <Button variant="primary" href="/packages">Explore Our Packages</Button>
        </Card.Body>
      </Card>
    </Container>
      </div>
    </>
  );
}
