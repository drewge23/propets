import React from "react";
import {FileUploader} from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

function DragDrop({setFile, children}) {
    const handleChange = (files) => {
        console.log(files[0])
        setFile(files[0]);
    };
    return (
        <FileUploader multiple={true} handleChange={handleChange}
                      name="file" types={fileTypes} classes={'dropZone'}>
            {children}
        </FileUploader>
    );
}

export default DragDrop;