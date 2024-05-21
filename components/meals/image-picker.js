"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css"
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const imageInputRef = useRef();
    const [pickImage, setPickImage] = useState()

    function handleImagePick(){
        imageInputRef.current.click();
    }

    function handleImageChange(e){
        const file = e.target.files[0]
        if(!file){
            setPickImage(null)
            return;
        }
        const fileReader = new FileReader();
        
        fileReader.onload = () => {
            setPickImage(fileReader.result)
        }
        
        fileReader.readAsDataURL(file)
    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickImage && <p>No image picked yet.</p>}
                {pickImage && <Image src={pickImage} alt="Image selected by user" fill />}
            </div>
            <input 
                className={classes.input}
                type="file" 
                id="image" 
                accept="image/png, image/jpeg" 
                name={name}
                ref={imageInputRef} 
                required
                onChange={handleImageChange} />
            <button className={classes.button} type="button" onClick={handleImagePick}>Pick an image</button>
        </div>
       
    </div>
}