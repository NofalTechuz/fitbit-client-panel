import React, { useEffect, useState } from 'react'
import Container from '../../Layouts/Container'
import { NavLink } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance';
import Loading from '../../Utils/Loading';


const DietPlan = () => {
  
  const [dietPlan, setDietPlan] = useState([]);
const [loading, setLoading] = useState(true);


  const fetchDietPlan = async () => {
    try {
      const response = await axiosInstance.get('/dietplan');
      setDietPlan(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  useEffect(() => {
    fetchDietPlan();
  }, []);

  if (loading) {
    return <Container><Loading /></Container>;
  }


  return (
    <Container>
          <div className="header">
                <div className="left">
                    <h1>Diet Plan</h1>
                    <ul className="breadcrumb">
                          <NavLink to="/dashboard">
                        <li>
                                Dashboard
                            </li>
                            </NavLink>
                        /
                        <li><NavLink to="#" className="active">Deit Plan</NavLink></li>
                    </ul>
                </div>
             
            </div>

   
            <div className="bottom-data" style={{marginTop:"50px"}}>
                <div className="orders">
                   
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Nutrition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dietPlan.length > 0 ? (
                                    dietPlan.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.dietName}</td>
                                            <td>{item.dietDescription}</td>
                                            <td><span className="status process">{item.nutrition}</span></td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan={4}>No data found</td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>


            </div>
    </Container>
  )
}

export default DietPlan