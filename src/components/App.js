import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ImageGallery from './ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader';
import { fetchImages } from './fetchImages/fetchImages';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    async function fetchApiData() {
      if (!inputData) {
        return;
      }
      setStatus('pending');

      try {
        const { totalHits, hits } = await fetchImages(inputData, page);

        if (hits.length === 0) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setItems(prevItems => [...prevItems, ...hits]);
        setTotalHits(totalHits);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.error(error);
      }
    }

    fetchApiData();
  }, [inputData, page]);

  const handleSubmit = inputData => {
    if (!inputData) {
      return;
    }

    setInputData(inputData);
    setItems([]);
    setPage(1);
    setStatus('idle');
    setTotalHits(0);
  };

  const handleNextPage = () => setPage(prevPage => prevPage + 1);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {status === 'rejected' ? (
        <p>Something went wrong. Please try again later.</p>
      ) : (
        <>
          {status === 'pending' && <Loader />}
          {status === 'pending' && items.length > 0 && (
            <ImageGallery page={page} items={items} />
          )}
          {status === 'resolved' && <ImageGallery page={page} items={items} />}
          {status === 'resolved' && totalHits > items.length && (
            <Button onClick={handleNextPage} />
          )}
        </>
      )}
    </div>
  );
}

App.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default App;
