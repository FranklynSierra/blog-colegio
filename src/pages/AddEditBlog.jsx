import React, { useState, useEffect } from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css'
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp ,doc,updateDoc, getDoc} from 'firebase/firestore';
import { useNavigate,useParams } from 'react-router-dom';
import {toast }from 'react-toastify'
const initialState = {
    title: '',
    tags: [],
    trending: 'no',
    category: '',
    description: '',
  
}
const categoryOption = [

    "Castellano",
    "Matemática",
    'Premilitar',
    'Proyecto Endogeno',
    'Geografía',
    'Biología',
    'Física',
    'Química',
    'Orientación y convivencia'
]


const AddEditBlog = ({user,setActive}) => {

    const [form, setForm] = useState(initialState);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);

const navigate=useNavigate()
 const {id}=useParams()


    const { title, tags, category, trending, description } = form;
    useEffect(() => {
        const uploadFile = () => {
          const storageRef = ref(storage, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setProgress(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                toast.info('Se guardo la imagen correctamente')
                setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
              });
            }
          );
        };
    
        file && uploadFile();
      }, [file]);
    
      useEffect(() => {
        id && getBlogDetail();
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id]);
    
      const getBlogDetail = async () => {
        const docRef = doc(db, "blogs", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setForm({ ...snapshot.data() });
        }
        setActive(null);
      };
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleTags = (tags) => {
        setForm({ ...form, tags });
      };
    
      const handleTrending = (e) => {
        setForm({ ...form, trending: e.target.value });
      };
    
      const onCategoryChange = (e) => {
        setForm({ ...form, category: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (category && tags && title && description && trending) {
          if (!id) {
            try {
              await addDoc(collection(db, "blogs"), {
                ...form,
                timestamp: serverTimestamp(),
                author: user.displayName,
                userId: user.uid,
              });
              toast.success("El Blog se Publico correctamente");
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              await updateDoc(doc(db, "blogs", id), {
                ...form,
                timestamp: serverTimestamp(),
                author: user.displayName,
                userId: user.uid,
              });
              toast.success("El Blog se Actualizo correctamente");
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          return toast.error("Necesitas llenar todos los campos");
        }
    
        navigate("/");
      };
    return (
        <div className='container-fluid mb-4'>
            <div className='container'>

                <div className='col-12 text-center'>

                    <div className='text-center heading py-2'>
                       {id?'Actualizar Blog':'Crear Blog'}

                    </div>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <div className='col-10 col-md-8 col-lg-6'>
                            <form onSubmit={handleSubmit} className='row blog-form'>
                                <div className='col-12 py-3'>
                                    <input onChange={handleChange} value={title} type='text' className='form-control input-text-box' placeholder='Titulo' name='title' />
                                </div>
                                <div className='col-12 py-3'>
                                    <ReactTagInput tags={tags} placeholder='Categorias' onChange={handleTags} />
                                </div>
                             <div className='col-12 py-3'>
                                    <p className='trending'>¿Quieres publicar este blog?</p>
                                    <div className='form-check-inline mx-2'>
                                        <input onChange={handleTrending} checked={trending === 'yes'} type='radio' className='form-check-input' value='yes' name='radioOption' />
                                        <label htmlFor='radioOption' className='form-check-label'>Si </label>
                                        <input onChange={handleTrending} checked={trending === 'no'} type='radio' className='form-check-input' value='no' name='radioOption' />
                                        <label htmlFor='radioOption' className='form-check-label'>No </label>

                                    </div>

                             </div>
                                <div className='col-12 py-3'>
                                    <select value={category} onChange={onCategoryChange} className='catg-dropdown'>
                                        <option >Porfa elija una materia</option>
                                        {categoryOption.map((option, index) => (
                                            <option value={option || ''} key={index}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-12 py-3'>
                                    <textarea className='form-control description-box' placeholder='descripción' value={description} onChange={handleChange} name='description'></textarea>

                                </div>
                                <div className="mb-3">
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                              </div>

                              {progress<100&&file!=null?(<h2>Esperar a que la imagen carga</h2>):(<></>)}
                                
                              <div className='col-12 py-3 text-center'>
                                <button className="btn btn-add"
                                type="submit"
                                disabled={progress !== null && progress < 100}>
                                
                                {id?'Actualizar':'Enviar'}
                                </button>
                                
                                </div>


                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddEditBlog;
