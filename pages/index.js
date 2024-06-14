import React, { useState } from 'react'

const Index = ({ users }) => {

  const [credentials, setCredentials] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/adduser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email })
    });
    const result = await response.json();
    console.log(result);

    if (result.message == 'success') {
      alert("success")
    } else {
      alert("Failed");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={onChange} name='name' value={credentials.name} className='text-black m-5' placeholder='name'/>
          <input type="email" onChange={onChange} name='email' value={credentials.email} size="30" className='text-black m-5' placeholder='email' />
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div className='mt-10'>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  let res = await fetch('http://localhost:3000/api/getusers')
  let users = await res.json()

  return {
    props: {
      users
    }
  }
}

export default Index