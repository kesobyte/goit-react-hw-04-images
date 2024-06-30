import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import css from './App.module.css';
import { getAPI } from '../pixabay-api';
import toast, { Toaster } from 'react-hot-toast';

// Refactored code for useState
export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (search === '') return;

    // Called immediately (IIFE)
    (async () => {
      await fetchImages(search, page);
    })();
    // Clean function like -> componentWillUnmount() * This is optional
    // return () => {};

    // If dependency array is empty, useEffect hook will be called on initial mount, componentDidMount() equivalent.
    // If dependency arrat has values, useEffect hook will called if the states are changed in it, componentDidUpdate() equivalent.
    // If we omit the dependency array, useEffect hook will be called every render, bad practice! (App may crash).
  }, [search, page]);

  // Refactored code for useState
  // This takes query and fetch images
  const fetchImages = async (search, page) => {
    try {
      // this.setState({ isLoading: true });
      setIsLoading(true);

      // this.setState({ isEnd: false });
      setIsEnd(false);

      // fetch data from API
      const fetchedImages = await getAPI(search, page);
      const { hits, totalHits } = fetchedImages;

      // If no search match, display an error.
      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      // Success message search
      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }

      // Display a message if page is already at the end of data
      if (page * 12 >= totalHits) {
        // this.setState({ isEnd: true });
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '👋',
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      // Update the state with the new images
      // this.setState(prevState => ({
      //   images: [...prevState.images, ...hits],
      // }));
      setImages(prevState => [...prevState, ...hits]);
    } catch {
      // this.setState({ isError: true });
      setIsError(true);
    } finally {
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newSearch = e.target.search.value.trim().toLowerCase();

    // Check if the search query is empty
    if (newSearch === '') {
      toast.error('Please enter a search query.');
      return;
    }

    // If new search string is different from the current search string saved in state
    if (newSearch !== search) {
      // this.setState({ search: newSearch, page: 1, images: [] });
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };

  const handleClick = () => {
    // this.setState(prevState => ({ page: prevState.page + 1 }));
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {/* Image Rendering */}
      {images.length >= 1 && <ImageGallery photos={images} />}

      {/* Load more button */}
      {images.length >= 1 && !isEnd && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
      {isError && toast.error('Oops, something went wrong! Reload this page!')}
      <Toaster position="top-right" />
    </div>
  );
};
