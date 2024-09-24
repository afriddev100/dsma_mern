import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
// import trainingPackages from '../trainingPackages';
import TrainingPackage from "../components/TrainingPackage";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";

function TrainingPackageList() {
  const [trainingPackages, setTrainingPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchPorducts = async () => {
      try {
        const { data } = await axios.get("/api/trainingPackages");
        setTrainingPackages(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({ data: { message: "Error while calling API" } });
      }
    };
    fetchPorducts();
  }, []);

  return (
    <>
      <h1 className="mt-2">Training Packages</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {trainingPackages.map((traningPackage) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <TrainingPackage trainingPackage={traningPackage} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default TrainingPackageList;
