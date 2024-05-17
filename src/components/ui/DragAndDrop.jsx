import '../../css/DragAndDrop.css'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { EyeOnIcon, TrashIcon } from '../ui/Icons';
import Modal from './Modal'

/**
 * Referencias
 * https://www.youtube.com/watch?v=eGVC8UUqCBE
 * https://github.com/HamedBahram/dropzone/blob/main/components/Dropzone.jsx
 * https://cloudinary.com/blog/guest_post/add-drag-and-drop-for-media-files-with-react-12
 * 
 * Para habilitar la API de drag and drop en tauri
 * https://stackoverflow.com/questions/77327020/tauri-angular-16-drag-and-drop
 */

function DragAndDrop() {
    // Se encarga de almacenar todas las imagenes de la zona de drag and drop
    const [files, setFiles] = useState([]);
    // Se encarga de mostrar el modal
    const [previewVisibility, setPreviewVisibility] = useState(false)
    // Se encarga de almacenar la imagen que se quiere ver en el modal
    const [selectedImage, setSelectedImage] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        // Agregamos nuevas imagenes sin sobreescribir los anterires
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        // maxSize: 1024 * 1000
    });

    // Elimina las imagenes de la zona drag and drop
    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name));
    };

    return (
        <div className="drag-and-drop">
            {/* React dropzone */}
            <div {...getRootProps()} className="drag-and-drop__drop-area">
                <input {...getInputProps()} />
                {isDragActive ?
                    <p className="drag-and-drop__drop-text">Drop the files here ...</p> :
                    <p className="drag-and-drop__drop-text">Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            {/* Caja que almacena las imagenes arrastradas */}
            <ul className="drag-and-drop__preview-list">
                {files.map(file => (
                    <li key={file.name} className="drag-and-drop__preview-item">
                        <div className="drag-and-drop__preview-image-container">
                            <div className="drag-and-drop__preview-menu">
                                <span className="drag-and-drop__preview-menu-icon" onClick={() => {
                                    setPreviewVisibility(true)
                                    setSelectedImage(file)
                                }}><EyeOnIcon /></span>
                                <span className="drag-and-drop__preview-menu-icon" onClick={() => removeFile(file.name)}><TrashIcon /></span>
                            </div>
                            <img src={file.preview} alt={file.name} className="drag-and-drop__preview-image" />
                        </div>
                    </li>
                ))}
            </ul>
            {/* Modal */}
            {previewVisibility && (
                <Modal
                    title={selectedImage.name}
                    previewImage={selectedImage.preview}
                    setIsOpen={setPreviewVisibility}
                />
            )}
        </div>
    );
}

export default DragAndDrop;