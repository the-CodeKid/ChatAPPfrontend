import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/chatroom.css"

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
        <div className="auth-container">
            <h2>Sign Up</h2>
            <br />
            <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
                <input className="input-username"
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
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                />
                <br />
                <button type="submit" disabled={loading}>Sign Up</button>
                <div className="auth-message" style={{color:msg.startsWith("Login Successful") ? "green" : "red"}}></div>
                <div className="auth-footer">Already have an account? <Link to="/login">Log In</Link></div>

            </form>
        </div>
    );
}