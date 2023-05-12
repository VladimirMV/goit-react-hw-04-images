import React from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';
import { useForm } from 'react-hook-form';

export function Searchbar({ onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = ({ inputData }) => {
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }
    onSubmit(inputData.toLowerCase());
    setValue('inputData', '');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          className="SearchForm-input"
          {...register('inputData', { required: true })}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search photos"
        />
        <button type="submit" className="SearchForm-button">
          <ImSearch size={25} />
        </button>
      </form>
      {errors.inputData && <p>You cannot search by empty field, try again.</p>}
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
