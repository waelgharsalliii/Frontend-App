import React ,{useState}from 'react'; 

const Login=(props)=> {
const [email,setEmail]=useState('');
const [pass,setPass]=useState('');


const handleSubmit =(e)=>
e.preventDefault();
console.log(email);

return(
     <div className="auth-form-container"></div>
    <form className="login-form"onSubmit={handleSubmit}>
         <label htmlFor="email">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="youremail@gmail.com" id="email"  name ="email"> </input>

    <label htmlFor="password">Password</label>
    <input value={pass}  onChange={(e)=>setPass(e.target.value)} type="password" placeholder="***********" id="password" name ="password"> </input>
    <button type ="submit">Login</button>
 </form>
    <button onClick={props.onFormSwitch('registre')}>Don't have an account .Registre here .</button>
    </div>
)
}
