import { BACKEND_URL } from "@/config";
import axios from "axios";

interface CardComponentInterface{
    title:string,
    desc:string;
    done:boolean;
    id:string;
}


export const CardComponent=(props:CardComponentInterface)=>{
    const deleteId=props.id;
    async function funDel()
    {
        const response=await axios({
            method:"delete",
            url:BACKEND_URL+"remove",
            data:{
                deleteId:deleteId
            },
            headers:{
                authorization:localStorage.getItem("token")
            }
        })
        console.log(response.data);
    }
    return(

        <div className="sm:w-[250px] w-full min-h-[250px] max-h-[250px] sm:min-h-[300px] sm:max-h-[300px] dark:bg-black bg-white  mx-8 my-4 border-2 border-gray-600 rounded-xl ">
            <div className="w-full border-b-2 border-gray-600 rounded-t-xl min-h-10 px-3 py-2 font-[poppins] text-gray-500 font-medium flex justify-between">
                <div className="font-[poppins]">
                    {props.title}
                </div>
                <i className="ri-delete-bin-line cursor-pointer" onClick={funDel}></i>
            </div>
            <div className="w-full  dark:bg-black bg-white max-h-[255px] rounded-b-xl overflow-y-auto font-[Montserrat] px-3 py-2 text-left no-scrollbar">
                {props.desc}
            </div>
        </div>
    )
}