import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { Table } from 'react-bootstrap';
import '../index.css';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilesRef = collection(db, 'profiles');
        const snapshot = await getDocs(profilesRef);
        const profileData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProfiles(profileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = (profile) => {
    navigateToCreateProfile(profile);
  };

  const navigateToCreateProfile = (profile) => {
    navigate('/create', {state: { profile } });
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'profiles', id));
      const updatedProfiles = profiles.filter((profile) => profile.id !== id);
      setProfiles(updatedProfiles);
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-3 h-75 overflow-scroll'>
        <Link to="/create" className='btn btn-success'>Add +</Link>
        <Table striped bordered hover className='table'>
          <thead >
            <tr>
              <th>Name</th>
              <th>Sectors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.sectors && profile.sectors.join(', ')}</td>
                <td className='d-flex flex-row'>
                  <button className='btn btn-primary' onClick={() => handleUpdateClick(profile)}>Update</button>
                  <button className='btn btn-danger ms-2' onClick={() => handleDelete(profile.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Profile