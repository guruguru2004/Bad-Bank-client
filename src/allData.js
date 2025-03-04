import { useState ,useEffect} from 'react';
import axios from 'axios';
import { FaWindowClose } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { Button } from 'react-bootstrap';



export default function Alldata(){

    const [products, setProducts] = useState([]);    
    let [editId, setEditId] = useState(null);
    let [formData, setFormData] = useState({ userid : "" ,name: "", email: "", password: "", amount: "" });
    
useEffect(() => {

    async function axiosProd(){
        const response = await axios('https://bad-bank-server-y8hq.onrender.com/data');
        setProducts(response.data)
    };
    axiosProd();
}, []);

    const handleClick = (index)=>{
        const deleteItem = products[index];
        axios.delete(`https://bad-bank-server-y8hq.onrender.com/delete/${deleteItem._id}`).then(() => {
        const updatedData = [...products];
        updatedData.splice(index, 1);
        setProducts(updatedData);
    })
}

function handleEdit(item) {
    setEditId(item._id);
    setFormData({userid : item.userid, name: item.name, email: item.email, password: item.password, amount: item.amount });
}

    async function handleUpdate() {
        try {
        await axios.put(`https://bad-bank-server-y8hq.onrender.com/update/${editId}`, formData);
        setProducts(products.map((item) => (item._id === editId ? { ...item, ...formData } : item)));
        setEditId(null);
        alert("Updated successfully!");
        } catch (error) {
        console.error("Error updating:", error);
        }
    }


console.log(products)
    
    
    return(<>
    <title>Bad Bank | All data</title>

    <h1 style={{marginTop:'-3%'}}>All data</h1>


    <table class="table" style={{marginTop:'10%'}}>
    <thead>
        <tr>
        <th scope="col">User ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
        <th scope="col">Amount</th>
        </tr>
    </thead>
    <tbody>

    {products.map((item , index)=><tr>
        <td>{item.userid}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>{item.amount}

        </td>
        <button style={{border:"none" , fontSize:'30px' }}><FaUserEdit style={{marginRight:'.0003%', color:'#ba551a'}} title='Edit User' onClick={() => handleEdit(item)}/> <FaWindowClose style={{color:"red"}} onClick={ ()=>{handleClick(index) }} title='Delete User'/></button>
    </tr>
    )
    }

    {

    }

    
    </tbody>
</table>

    {editId && (
            <div>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            <Button onClick={handleUpdate}>Update</Button>
            </div>
        )}


    </>)
}
