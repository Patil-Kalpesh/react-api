import React, { useEffect, useState } from 'react'

export default function ApiTest() {
    const [apiData,setApiData]=useState([])
    const [filterdData,setFilterData]=useState(apiData)
    const [inputData,setInputData]=useState("")



    const filterdata=(id)=>{
      if(id){
        let newData=filterdData.filter((dt)=>dt.id!=id)
        setFilterData(newData)
      }else{
        setFilterData(apiData)
      }
    }

    const searchData=()=>{
        if(inputData){
        let newData=filterdData.filter((dt)=>dt.id==inputData)
        setFilterData(newData)
        }else{
            setFilterData(apiData)

        }
    }

    useEffect(()=>{
        const getApiData=async()=>{
            let response=await fetch("https://jsonplaceholder.typicode.com/users")
            let data=await response.json()
            setApiData(data)
            setFilterData(data)
        }
        getApiData()
    },[])

  return (
    <div>Api
        <input type="text" onKeyUp={(e)=>{
            setInputData(e.target.value);searchData()}} />
        <table>
            <tr>
                <th>name</th>
                <th>usernmae</th>
                <th>email</th>
                <th>city</th>
                <th>zipCode</th>
                <th>phone</th>
            </tr>
            {
                filterdData?.map((data,index)=>{
                    return(
                        <tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.address.city}</td>
                            <td>{data.address.zipcode}</td>
                            <td>{data.phone}</td>
                            <td><button onClick={()=>filterdata(data.id)}>delete</button></td>
                        </tr>
                    )
                })
            }
        </table>
        <button onClick={()=>filterdata()}>reset button</button>
    </div>
  )
}