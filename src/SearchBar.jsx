
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SearchBar.css";

function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ads?searchTerm=${searchTerm}`,{
          headers: {"Access-Control-Allow-Origin": "*"},
        });
        console.log(response)
        setAds(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAds();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


    return(
        <>
        <div>
        <h1>Search Ads</h1>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <div className="grid">
        {ads.map(ad => (
          
          <div key={ad._id} className="grid-item">
            <img src={`data:image/jpeg;base64,${ad.imageUrl}`} alt={ad.company} />
            
            <h2>{ad.company_Name}</h2>
            <p><span>Primary Text : </span>{ad.primaryText}</p>
           <p> <span>Headline : </span> {ad.headline}</p>
           <p> <span>Description :</span> {ad.description}</p>
            <a href={ad.Company_link}><button style={{color:"black"}} >{ad.CTA}</button></a>
          </div>
        ))}
      </div>
        </div>
        </>
    )
}

export default SearchBar;

