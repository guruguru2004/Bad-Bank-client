import {Button } from "react-bootstrap";
import deps from './cash.jpg';
import { useState , useEffect} from 'react'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Load from "./BadMoney";

export default function Cashback(){
 
    const [dep,setDep]=useState(0)
    const [userId,setUserId]=useState();
    const [data,setData]=useState([])
    const [password,setPassword]=useState([])
    const [result , setResult] = useState();
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);
    
    
        useEffect(()=>{
        const fetchdata=async()=>{
            await axios.get('https://bad-bank-server-y8hq.onrender.com/data').then((item)=>{setData(item.data)})
        };fetchdata()
        },[]);
    
        function handleSubmit(e) {
            e.preventDefault();
            const user = data.find(item => item.userid === Number(userId) && item.password === password);
            if (user) {
                const updatedAmount = Number(user.amount) - Number(dep);
                axios.put(`https://bad-bank-server-y8hq.onrender.com/update/${user._id}`, { amount: updatedAmount })
                    .then(() => {
                    setResult(`Rs.${dep} Amount Credited to Your Account`);
                    });
                } else {
                setResult("User or password not found with the provided ID.");
                }
                document.getElementById('display').style.display = "block";

            }


    return(<>
    <title>Bad Bank | Cash back</title>

    {isLoading ? (<div
                        style={{
                            width: "100px",
                            margin: "auto",
                        }}
                    >
                        <Load />
                    </div>) : (<>
                    
    <div className='depImg' style={{marginTop:'-6%'}}>
        <img src={deps} alt=""/>
    </div>
    <div className="display" id="display">
        { result } <br />
        {(!data.find(item => item.userid === Number(userId) && item.password === password)) ? <div className="display-inner-span">y</div> : <div className="display-inner-span-two">y</div>}
    </div>
    <h1 style={{marginTop:'-2%' ,marginLeft:'5%'}}>Cashback</h1>

    <div className='containers'>
        <Form noValidate    className='card-outer-cash' onSubmit={handleSubmit} id='form'>
        <Row className="mb-3">
            <Form.Group as={Col} md="13" controlId="validationCustom01">
            <Form.Label>User Id</Form.Label>
            <Form.Control
                required
                type="number"
                placeholder="Enter your user id"
                onChange={(e)=>setUserId(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group> 
            </Row>

        <Row className="mb-3">
            <Form.Group as={Col} md="13" controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
                required
                type="password"
                placeholder="Enter your Password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group> 
            </Row>
        <Row className="mb-3">

            <Form.Group as={Col} md="13" controlId="validationCustom02">
            <Form.Label>Enter your Amount</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Enter your amount"
                onChange={(e)=>setDep(e.target.value)}

            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Button type="submit"   className='btn'>Enter</Button>
        </Form>
        </div>
                    
                    
                    </>)}

    </>)
} 
