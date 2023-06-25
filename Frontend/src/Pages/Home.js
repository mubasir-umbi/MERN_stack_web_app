import React, { useEffect } from 'react'
import Homev from '../components/Home/Home'
import axios from 'axios'

function Home() {

    // const fetchData = async () => {
    //     const data = await axios.get('/api/notes')
    //     console.log(data , 'helooooooooooooo');
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])


  return (
    <div>
        <Homev/>
    </div>
  )
}

export default Home