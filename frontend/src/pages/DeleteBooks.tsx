import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setloading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setloading(false);
        enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setloading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3-xl my-4">Delete book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you'd like to delete this book?</h3>

        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
          Yes, delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook