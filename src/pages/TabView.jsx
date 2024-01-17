import React, { useState, useEffect } from 'react';
import api from "../api/api";
import axios from 'axios';

const TabView = () => {
  const [menuData, setMenuData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://menumap.fr.to/get-menu-data');
        const data = await response.json();

        const menuDataWithVisibility = data.menu_data.map(item => ({
          ...item,
          showImage: false,
          selectedImage: "",
        }));

        setMenuData(menuDataWithVisibility);
        setFilteredData(menuDataWithVisibility);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleImage = (index) => {
    setMenuData((prevMenuData) => {
      const updatedData = [...prevMenuData];
      updatedData[index].showImage = !updatedData[index].showImage;
      return updatedData;
    });
  };

  const loadImage = async (index) => {
    try {
      const response1 = await api.get(
        `/get-image-url?img_name=${menuData[index].menu_image_url}`
      );
      const awsresponse = await axios.get(response1.data.url);
      const base64String = awsresponse.data;

      setMenuData((prevMenuData) => {
        const updatedData = [...prevMenuData];
        updatedData[index].selectedImage = `data:image/jpeg;base64,${base64String}`;
        return updatedData;
      });
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const filterData = () => {
    const filteredData = menuData.filter(item =>
      item.mess_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='bg-gray-300 min-h-screen'>
      <div className="space-y-4 mt-3 max-w-screen-xl mx-auto">
        {/* Search Input */}
        <div className='max-w-md mx-auto'>
          <div className='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden'>
            <div className="grid place-items-center h-full w-12 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-gray-300"
              value={search}
              onChange={handleSearchChange}
              placeholder="Enter Mess Name"
              autoComplete='off'
            />
          </div>
        </div>

        {/* Display Menu Items */}
        {filteredData.map((item, index) => (
          <div key={index} className="bg-gray-200 p-4 flex flex-col items-center rounded-2xl shadow-lg">
            <div className="w-full h-full cursor-pointer" onClick={() => { toggleImage(index); loadImage(index); }}>
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-lg font-semibold">{item.mess_name}</p>
                <div className="mt-4">
                  {item.showImage && <img className="w-64 h-70" src={item.selectedImage} alt="" style={{ objectFit: 'contain' }} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabView;
