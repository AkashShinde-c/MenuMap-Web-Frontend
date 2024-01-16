import React, { useState, useEffect } from 'react';
import api from "../api/api";
import axios from 'axios';
import Loader from "../components/Loader";

const TabView = () => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

    // Add a delay of 300 milliseconds before triggering the filter
    
  };

  return (
    <div className="space-y-4">
      <input
    type="search"
    class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-black dark:focus:border-primary"
    value={search}
    onChange={handleSearchChange}
    placeholder="Enter Mess Name" 
    autoComplete='off'
    />


      {filteredData.map((item, index) => (
        <div key={index} className="bg-gray-300 p-4 flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-lg font-semibold">{item.mess_name}</p>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => { toggleImage(index); loadImage(index); }}
              >
                {item.showImage ? 'Hide Image' : 'Show Menu'}
              </button>
            </div>
          </div>
          {isLoading ? <Loader /> : item.showImage && <img className="w-64 h-64 mt-4" src={item.selectedImage} alt="" />}
        </div>
      ))}
    </div>
  );
};

export default TabView;
