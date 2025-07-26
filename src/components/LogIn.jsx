import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LogIn({ onLogin }){
    const[creds,setCreds]= useState({username:'',password:''});
    const[msg,setMsg]= useState('');
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleChange = e =>
        setCreds({...creds, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setLoading(true);
        try{
            const res = await fetch(import.meta.env.VITE_API_BASE + 'token/',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(creds),
            });
            const data = await res.json();
            if(res.ok && data.access){
                localStorage.setItem('jwt',data.access);
                setMsg('Login successful!')
                if (onLogin) onLogin(data.access);
                setTimeout(() => navigate('/chat'),500);
            } else {
                setMsg(data.detail || 'Login Failed!');
            }
        } catch {
            setMsg('Netwrok error!')
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <h2>Log In</h2>
            <br />
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={creds.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <br />
                <input
                    name="password"
                    type="password"
                    value={creds.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <br />
                <button type="submit" disabled={loading}>Log In</button>
                <div className="auth-message" style={{color:msg.startsWith("Login Successful") ? "green" : "red"}}></div>
                <div className="auth-footer">Create an account? <Link to="/signup">Sign up</Link></div>
                
            </form>
        </div>
    )
}