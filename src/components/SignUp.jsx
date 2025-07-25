import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
    const[form, setForm] = useState({username:'', email:'', password:''});
    const[msg, setMsg] = useState('');
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e =>
        setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setLoading(true)
        try {
            const res = await fetch(import.meta.env.VITE_API_BASE + 'signup/',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if(res.ok){
                setMsg('User created! Please log in.'); 
                setTimeout(() => navigate('/login'),1200);
            } else {
                setMsg(data.error || data.detail || 'SignUp failed!');
            }
        } catch {
            setMsg('Network Error!');
        }
        setLoading(false);
    };

    return(
        <form onSubmit={handleSubmit} style={{
            maxWidth:400, 
            margin:"2em auto",
            padding:24, 
            borderRadius:8

        }}>
            <h2>Sign Up</h2>
            <input 
            name="username"
            value= {form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            />
            <br />
            <input 
            name="email"
            value= {form.email}
            onChange={handleChange}
            placeholder="Email (optional)"
            />
            <br />
            <input 
            name="password"
            value= {form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            />
            <br />
            <button type="submit">Sign Up</button>
            <div style={{color:msg.startsWith("Login Successful") ? "green" : "red"}}>
                Already have an account? <Link to="/login">Log In</Link>
            </div>

        </form>
    );
}