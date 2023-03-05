import React ,{useState}from 'react'; 

const Registre=(props)=> {
const [email,setEmail]=useState('');
const [pass,setPass]=useState('');
const [fname,setFname]=useState('');
const [lname,setLname]=useState('');

const handleSubmit =(e)=>
e.preventDefault();
console.log(email);



  return (
    <div className="auth-form-container">
   <form  className="register-form"onSubmit={handleSubmit}>

   <label htmlFor="fname">FirstName</label>
    <input value={fname} placeholder='firstname' id="firstname" type="fname" name ="firstname"> </input>

    <label htmlFor="Lname">LastName</label>
    <input value={lname} placeholder='lastname' id="lastname"  type="lname"name ="lastname"> </input>


    <label htmlFor="birthdate">Birthdate</label>
    <input value={birthdate}   type="birthdate" id="birthdate" name ="birthdate"> </input>

    <label htmlFor="phone">Phone</label>
    <input value={phone} placeholder='phone'  type="phone" id="phone" name ="phone"> </input>

    <label htmlFor="email">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="youremail@gmail.com" id="email"  name ="email"> </input>

    <label htmlFor="password">Password</label>
    <input value={pass}  onChange={(e)=>setPass(e.target.value)} type="password" placeholder="***********" id="password" name ="password"> </input>
    <button type ="submit">Registre</button>
   </form>
   <button onClick={props.onFormSwitch('login')}>Already have an account? Login here .</button>
   </div>
  )
}



