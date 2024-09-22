import React from 'react'
import { PiUserCircle } from "react-icons/pi";

// Avatar component accepts props for userId, name, imageUrl, width, and height
const Avatar = ({ userId, name, imageUrl, width, height }) => {

    let avatarName = ""

    if(name){
        const splitName = name?.split(" ")

        // If the name has multiple parts (e.g., first and last name), take the initials
        if(splitName.length >1){
            avatarName = splitName[0][0]+splitName[1][0]
        }else{
            avatarName = splitName[0][0]      // If only one part, take the first letter of the name
        }
    }

    // Background color options for initials-based avatar
    const bgColor =[
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-cyan-200',
        'bg-sky-200',
        'bg-blue-200'

    ]

     // Generate a random number to select a background color
    const randomNumber = Math.floor(Math.random()*9)
    return (
        <div className={`text-slate-800 overflow-hidden rounded-full font-bold `} style={{width: width +"px",height: height+"px"}}>
            {
                // Check if imageUrl exists, if yes, display the user's profile picture
                imageUrl ? (
                    <img
                        src={imageUrl}
                        width={width}
                        height={height}
                        alt={name}
                        className='overflow-hidden rounded-full'
                    />
                ) : (       // If no imageUrl, display initials if available
                    name ? (
                        <div style={{width: width +"px",height: height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (      // If no name or imageUrl, display a default user icon
                        <PiUserCircle
                            size={width}
                        />
                    )
                )
            }
        </div>
    )
}

export default Avatar
