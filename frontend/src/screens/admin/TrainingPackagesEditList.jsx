import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

function TrainingPackagesEditList() {
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

  const deleteHandler= async (id)=>{
   try{
    const {deleteData}=await axios.delete(`/api/trainingPackages/${id}`);
    toast.success("Deleted Succesfully");
    const { data } = await axios.get("/api/trainingPackages");
    setTrainingPackages(data);

   }catch(err){
    toast.error(err?.data?.message || err.error);
   }

  }

  return (
    <>
    <Container>
    <Row className='align-items-center'>
    <Col>
      <h1>Training Packages</h1>
    </Col>
    <Col className="text-end">
    <LinkContainer to="/admin/editPackage">
    <Button className='btn-sm m-3'>
      <FaEdit/> Create Training Package
    </Button>
    </LinkContainer>
   
    </Col>
    </Row>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> 
      : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>DURATION</th>
                <th>ACTION</th>
               
              </tr>
            </thead>
            <tbody>
              {trainingPackages.map((trainingPackage)=>(
                <tr key={trainingPackage._id}>
                  <td>{trainingPackage._id}</td>
                  <td>{trainingPackage.name}</td>
                  <td>{trainingPackage.price}</td>
                  <td>{trainingPackage.duration}</td>
                  <td>
                    <LinkContainer to={`/admin/editPackage/${trainingPackage._id}`}>
                      <Button variant='light' className='btn-sm mx-2'> 
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button variant='danger' className='btn-sm'
                    onClick={()=> deleteHandler(trainingPackage._id) }
                    >
                        <FaTrash style={{color:"white"}} />
                    </Button>

                  </td>

                </tr>
              )

              )}

            </tbody>
          </Table>


        </>
      )}

    </Container>
 
    
    
    </>
  )
}

export default TrainingPackagesEditList;