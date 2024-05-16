// import { Upload } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import useFilePreview from '../../hooks/useFilePreview';

// const { Dragger } = Upload;

// const DragAndDrop = ({ addFile, removeFile }) => {
//   const [handlePreview, previewContent] = useFilePreview();

//   const beforeUploadHandler = (file) => {
//     addFile(file);
//     return false;
//   };

//   return (
//     <>
//       <Dragger
//         multiple={true}
//         onRemove={removeFile}
//         showUploadList={true}
//         listType="picture-card"
//         beforeUpload={beforeUploadHandler}
//         onPreview={handlePreview}
//         accept="image/*"
//       >
//         <p className="ant-upload-drag-icon">
//           <PlusOutlined />
//         </p>
//         <p className="ant-upload-text">
//           Click this area or drag files to upload
//         </p>
//       </Dragger>
//       {previewContent}
//     </>
//   );
// };

// export default DragAndDrop;

import { useDropzone } from 'react-dropzone'
import { useState, useCallback } from 'react'
import { CloseIcon, EyeOnIcon, TrashIcon } from './Icons'

// https://www.youtube.com/watch?v=eGVC8UUqCBE
// https://github.com/HamedBahram/dropzone/blob/main/components/Dropzone.jsx
// https://cloudinary.com/blog/guest_post/add-drag-and-drop-for-media-files-with-react-12


/*
    Para habiltar la API de arrastrar y soltar archivos
    https://stackoverflow.com/questions/77327020/tauri-angular-16-drag-and-drop
*/

function DragAndDrop() {

    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        // Accediendo a la primera imagen
        // console.log(acceptedFiles[0])

        // Agregamos nuevas imagenes sin sobreescribir los anterires
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }




    }, [])
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop, accept: {
            'image/*': [],
        },
        // maxSize: 1024 * 1000
    })

    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name))
    }
    return (

        <div style={{
            width: "50%",
            border: "1px solid #f0f0f0",
            padding: "20px",
            boxSizing: "border-box",
            // backgroundColor: "red"
        }}>
            <div>
                {/* React dropzone */}
                <div {...getRootProps()} style={{
                    // backgroundColor: "#e3e3e3",
                    border: "3px dashed #d9d9d9",
                    height: "160px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                {/* React dropzone */}

                {/* Vista previa uwu */}
                <ul style={{
                    display: 'flex',
                    flexWrap: "wrap",
                    gap: "5px",
                    justifyContent: "flex-start",
                    backgroundColor: "yellow",
                    padding: "0px"
                }}>
                    {files.map(file => (
                        <li key={file.name} style={{ listStyleType: "none" }}>
                            <div style={{
                                height: "104px",
                                width: "104px",
                                position: "relative",
                                padding: "8px",
                                border: "1px solid #d9d9d9",
                                borderRadius: "2px"
                            }}>
                                {/* Menu oscuro, cuando se hace hover */}
                                <div style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: "0",
                                    left: "0",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "red"
                                }}>

                                    <span style={{
                                        cursor: "pointer"
                                    }}><EyeOnIcon /></span>
                                    <span style={{
                                        cursor: "pointer"
                                    }}><TrashIcon /></span>
                                </div>
                                <img src={file.preview} alt={file.name} style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%"
                                }} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div >

    )
}

export default DragAndDrop