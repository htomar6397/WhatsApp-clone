import React, { useState } from 'react';
import { onSnapshot,query,collection } from 'firebase/firestore';
import { db } from '../firebase.config';

const Users = () => {
    const [users,setUsers]= useState([]);
        const q = query(collection(db, "users"));
    const xyz = async () => {
     
      onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data());
        });

        setUsers([...cities]);
      });
    };
   
  return { users,xyz}
  
}

export default Users