import axios from 'axios'
import { useState } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import './App.css'

const fetchUsers = async () => {
  const users = await axios({
    url: 'http://localhost:4000/api/users',
    method: 'GET',
  })
  return users.data
}

const createUser = async (data) => {
  const users = await axios({
    url: 'http://localhost:4000/api/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

const updateUser = async (data) => {
  const users = await axios({
    url: `http://localhost:4000/api/users/61c3680e3c55bd0a337f5a98`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

function App() {
  const [username, SetUsername] = useState('')
  const [age, SetAge] = useState(Number)
  const [password, Setpassword] = useState('')
  const [email, SetEmail] = useState('')

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery('users', fetchUsers)
  console.log(data)

  const {
    mutate,
    error: mutationError,
    isError,
  } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const { mutate: updateMutation } = useMutation(updateUser)

  if (isError) return <div>{mutationError}</div>

  const handleSubmit = (event) => {
    event.preventDefault()
    // mutate(
    //   {
    //     username,
    //     password,
    //     email,
    //     age,
    //   },
    //   { onError: (e) => console.log(e) }
    // )
    updateMutation({
      username,
      password,
      email,
      age,
    })
  }

  if (error) return <div>{error}</div>

  if (isLoading) return <p>Loading...</p>
  else
    return (
      <div>
        {data.data.map((user) => (
          <div>{user.username}</div>
        ))}

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type='text'
              name='username'
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            />
            Email
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            Age
            <input
              type='number'
              name='age'
              value={age}
              onChange={(e) => SetAge(e.target.value)}
            />
            Password
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
            />
          </label>
          <input type='submit' value='Submit' onSubmit={handleSubmit} />
        </form>
      </div>
    )
}

export default App
