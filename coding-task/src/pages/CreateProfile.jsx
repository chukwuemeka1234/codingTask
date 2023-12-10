import React, { useState, useEffect } from 'react';
import { options } from '../data';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { db } from '../firebase';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateProfile = () => {

  const location = useLocation();
  // const [input, setInput] = useState('');
  // const [agreeTerms, setAgreeTerms] = useState(false);
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    if (location.state && location.state.profile) {
      const { id, name, sectors, terms } = location.state.profile;
      setProfileId(id || '');
      setValue('name', name || ''); // Populate the name field using setValue from react-hook-form
      setSelectedOptions(sectors || []);
      setValue('terms', terms || false); // Populate the terms checkbox using setValue from react-hook-form
    }
  }, [location.state]);

  // const handleInputChange = (e) => {
  //   setInput(e.target.value);
  // };

  // const handleCheckboxChange = (e) => {
  //   setAgreeTerms(e.target.checked);
  // };
  
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors}, setValue } = useForm();

  const [selectedOptions, setSelectedOptions] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropDownShow = () => {
    setIsOpen(!isOpen);
  };
  const optionSelect = (event) => {
    const optionId = event.target.value;
  const choosen = event.target.checked;

  if (choosen) {
    setSelectedOptions( selectedOptions !== null ? [...selectedOptions, optionId] : [optionId] )
    } else {
      setSelectedOptions(
        selectedOptions.filter((id) => id !== optionId));
    }
  };

  const combinedSubmitHandler = async (formData) => {
    if (formData.name && selectedOptions && selectedOptions.length > 0) {
      try {
        if (profileId) {
          const profileDocRef = doc(db, 'profiles', profileId);
          await updateDoc(profileDocRef, {
            name: formData.name,
            sectors: selectedOptions,
            terms: formData.terms,
          });
        } else {
          const newDocRef = await addDoc(collection(db, 'profiles'), {
            name: formData.name,
            sectors: selectedOptions,
            terms: formData.terms,
          });
          setProfileId(newDocRef.id);
        }

      // setInput('');
      // console.log(setInput(''));
      setSelectedOptions([]);
      // setAgreeTerms(false);
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  };

  
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form className='row g-3 needs-validation' onSubmit={handleSubmit(combinedSubmitHandler)}>
          <h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
          <div className='mb-2'>
            <label className='form-label'>Name</label>
            <input type="text" placeholder='Enter Name' className='form-control' {...register('name', { required: true })}/>
            {errors.name && <p>Please enter your name</p>}
          </div>
          <div className='d-flex flex-column'>
            <label htmlFor="">Sectors</label>
            <div className='mb-2 w-'>
              <button
                className='dropdown-toggle btn btn-light border col-12'
                type="button"
                id="multiSelectDropdown"
                onClick={dropDownShow}
              >
                Select options from sectors
              </button>

              {isOpen && (
                <div
                  className={`dropdown-menu h-25 overflow-scroll col-4 ${isOpen ? 'show' : ''}`}
                  aria-labelledby='multiSelectDropdown'>
                  {options.map((option) => (
                    <Form.Check
                      className="checkbox overflow-y"
                      key={option.id}
                      type="checkbox"
                      id={`option_${option.id}`}
                      label={option.label}
                      checked={selectedOptions ? selectedOptions.includes(option.id) : null}
                      onChange={optionSelect}
                      value={option.id}
                    />
                  ))}
                </div>
              )}
              {selectedOptions ? null : <p>At least one sector must be selected</p>}
              
            </div>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type="checkbox" {...register('terms', {required: true})} />
            <label className='form-check-label mb-2'>Agree on terms</label>
            {errors.terms && <p>Please agree terms and conditions</p>}
          </div>
            <button className='btn btn-success' disabled={selectedOptions === null}type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile