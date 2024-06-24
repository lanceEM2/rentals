import React from "react";
// import { IconHeart } from '@tabler/icons-react';
import FindProperty from "../pages/FindProperty";

function PropertyPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
      // Fetch data from the API
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch('/properties')
        .then((response) => response.json())
        .then((jsonData) => {
          console.log('Fetched data:', jsonData);
          setData(jsonData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <>

            <FindProperty/>

            <h1>Houses To Rent In Nairobi</h1>
            
            {/* <div class="card d-flex flex-column">
                <div class="row row-0 flex-fill">
                    <div class="col-md-3">
                        <a href="#">
                            <img src="..." class="w-100 h-100 object-cover" alt="Card side image" />
                        </a>
                    </div>
                    <div class="col">
                        <div class="card-body">
                            <h3 class="card-title"><a href="#">Shut up!</a></h3>
                            <div class="text-secondary">Burn her! How do you know she is a witch? You don't frighten us, English pig-dogs! Go and boil yo...</div>
                            <div class="d-flex align-items-center pt-4 mt-auto">
                                <span class="avatar" style="background-image: url(...)"></span>
                                <div class="ms-3">
                                    <a href="#" class="text-body">Egan Poetz</a>
                                    <div class="text-secondary">3 days ago</div>
                                </div>
                                <div class="ms-auto">
                                    <a href="#" class="icon d-none d-md-inline-block ms-3 text-red">
                                    <IconHeart/>
                                    <svg>...</svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>

      );
  }
  
export default PropertyPage;