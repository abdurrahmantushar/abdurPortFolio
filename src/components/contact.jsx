import { HiOutlineMail } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

export const Contact=()=>{
    return(
        <div className="h-[305px] bg-black text-white font-mono">
            <h1 className="lg:ml-10 ml-5 text-xs mt-10">Contact Deatils:</h1>
            <div>
                <p className="mt-10 flex gap-1 justify-start md:justify-center lg:justify-center px-4"> 
                <HiOutlineMail className="mt-1"/>
                E-mail: abdurrahmantushar0@gmail.com </p>
                <div className="flex justify-center gap-4 mt-4">
      <a href="https://github.com/abdurrahmantushar" className="hover:text-gray-300 flex gap-1">
      <FaGithubSquare className=" mt-1" />
      GitHub</a>
      <a href="https://www.linkedin.com/in/abdur-rahman-tushar-x/"
       className="hover:text-gray-300 flex gap-1">
      <CiLinkedin className=" mt-1"/>
      LinkedIn</a>
      <a href="https://www.instagram.com/abdur_rahman_tushar_/" className="hover:text-gray-300 flex gap-1">
      <FaInstagram className="mt-1"/>
      Instgram</a>
    </div>
    <p className="  flex ml-10 lg:justify-center lg:items-center">Number: +880 187 073 3450</p>
            </div>
           <div className="flex justify-end items-end p-5 pt-25 ">
  <p className="text-sm text-gray-500">
    © 2025 Abdur Rahman Tushar — All Rights Reserved.
  </p>
</div>

        </div>
    )
}