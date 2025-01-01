import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"


export const useFetchContent=()=>{
    const [content,setContent]=useState([])

    async function FetchData()
    {
        const response=await axios({
            method:"get",
            url:BACKEND_URL+"content",
            headers:{
                authorization:localStorage.getItem("token")
            }
        })
        // console.log("response"+response.data[0][0]);
        setContent(response.data);
        console.log("Data Fetched");
    }

    useEffect(()=>{
        const timer=setInterval(()=>{
            FetchData();
        },10000)

        return ()=> clearInterval(timer)
    })

    return {content,FetchData};
}