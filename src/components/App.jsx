import { Vortex } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button.jsx";
import { fechServisSearchImg } from "./API";
import { Container } from './Container/Container.styled';
import { ContainerLoader } from './ContainerLoader/ContainerLoader';


export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);


const uppdateSearchbar = (searchName)=> {
  setSearchValue(searchName);
  setGallery([]);
  setPage(1);
  setLoadMore(false); 
    };
  
const handlerButton = ()=> {
  setPage(prevState =>  prevState + 1 );
  }

  useEffect(() => {
    if (searchValue === '') {
      return
    }
    async function fechImg() {
      try {
        setIsLoading(true);
        setError(false);
        const searchImg = await fechServisSearchImg(searchValue, page);
        toast.success("Images found successfully!")
        setGallery(prevState => page === 1 ? searchImg.hits : [...prevState, ...searchImg.hits])
        setLoadMore(page < Math.ceil(searchImg.totalHits / 12));
      }
    
      catch (error) {
        setError(true);
      }
      finally {
        setIsLoading(false);
      }
    }
    fechImg();
  }, [searchValue, page]);


    return <Container>
     <Searchbar onSubmit={uppdateSearchbar} />
     {gallery.length > 0 && <ImageGallery galleryImages = {gallery} />}

     {isLoading && <ContainerLoader>
       <Vortex
         visible={true}
         height="80"
         width="80"
         ariaLabel="vortex-loading"
         wrapperStyle={{}}
         wrapperClass="vortex-wrapper"
         colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
       />
     </ContainerLoader>}
   {loadMore &&  <Button onClickButton ={handlerButton}/> } 

  {error && <span>Whoops... Error! Please, reload this page!</span>}
  <Toaster  position="top-right" /> 
  </Container>
  } 
