import { Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import deps from './register.jpg'
import axios from 'axios';
import { FaBuildingColumns } from "react-icons/fa6";


export default function Register(){

    const [products, setProducts] = useState([]);    
    const [userId , setUserid] = useState('');
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [result , setResult] = useState(0);
    const [flag , setFlag] = useState(0)

const handleSubmit=(e)=>{
    e.preventDefault();

    
    for(let i = 0 ;i< products.length ; i++){
        
        if(products[i].userid === Number(userId) || products[i].email === email || products[i].password === password){
            setFlag(1)
            document.getElementById('display').style.display = "block";
            setResult(` Your Account already created...`);
            return
        }else{
            setFlag(0);            
        }
    }
    if(flag === 0){
        let item = {userid:userId,name:name,email:email,password:password,amount:1000};
        axios.post('http://localhost:3002/create' , item);
        setResult(`Your Account create in Successfully....`);
        document.getElementById('display').style.display = "block";
    }
}
useEffect(() => {
    
    async function axiosProd(){
        const response = await axios('http://localhost:3002/data');
        setProducts(response.data)
    };
    axiosProd();
}, []);


    return(<>
        <title>Bad Bank | Register</title>

    <div className='depImg' style={{marginTop:'-7%'}}>
        <img src={deps} alt=""/>
    </div>
    <div className="display" id="display">
        { result } <br />
    {(result === "Your Account create in Successfully....")?<div className="display-inner-span-two">y</div> : <div className="display-inner-span">y</div>}
    </div>
    
    <h1 style={{marginTop:'-8%' ,marginLeft:'5%'}}>Register</h1>
    <form  onSubmit={ handleSubmit} style={{marginTop:'-30%',marginLeft:'55%'}} className='card-outer'>
        <label htmlFor="">User Id :</label> <br />
        <input type="text" onChange={(e)=>setUserid(e.target.value)}/> <br /><br />
        <label htmlFor="">Enter Name :</label> <br />
        <input type="text" onChange={(e)=>setName(e.target.value)}/> <br /><br />
        <label htmlFor="">Enter Email :</label><br />
        <input type="email" onChange={(e)=>setEmail(e.target.value)} /> <br /><br />
        <label htmlFor="">Enter Password :</label><br />
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
        
        <Button type='submit' >Submit</Button>
    </form>

    <p className='inizial-amount'><FaBuildingColumns style={{marginRight:'2%'}}/>You are pay inizial amount is 1000</p>
    </>)
}
