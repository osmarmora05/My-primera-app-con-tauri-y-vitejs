import '../../css/DragAndDrop.css'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { EyeOnIcon, TrashIcon } from '../ui/Icons';
import Modal from './Modal'

function DragAndDrop() {

    const [files, setFiles] = useState([]);
    const [previewVisibility, setPreviewVisibility] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
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
    });

    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name));
    };

    return (
        <div className="drag-and-drop">
            <div {...getRootProps()} className="drag-and-drop__drop-area">
                <input {...getInputProps()} />
                {isDragActive ?
                    <p className="drag-and-drop__drop-text">Drop the files here ...</p> :
                    <p className="drag-and-drop__drop-text">Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
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