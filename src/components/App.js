import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ImageGallery from './ImageGallery';
import './App.css';
import { fetchImages } from './fetchImages/fetchImages';
import Searchbar from './Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader';

class App extends Component {
  state = {
    inputData: '',
    items: [],
    status: 'idle',
    totalHits: 0,
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { inputData, page } = this.state;

    if (
      this.state.inputData !== prevState.inputData ||
      page !== prevState.page
    ) {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        this.setState(prevState => ({
          items: [...prevState.items, ...hits],
          totalHits: totalHits,
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleSubmit = inputData => {
    if (this.state.inputData === inputData) {
      return;
    }
    this.setState({
      inputData: inputData,
      items: [],
      status: 'idle',
      totalHits: 0,
      page: 1,
    });
  };

  onNextPage = () => this.setState(({ page }) => ({ page: page + 1 }));

  render() {
    const { status, items, totalHits, page } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'rejected' && <p>Something wrong, try later</p>}
        {status === 'pending' && <Loader />}
        {status === 'pending' && items.length > 0 && (
          <ImageGallery page={page} items={items} />
        )}
        {status === 'resolved' && <ImageGallery page={page} items={items} />}
        {status === 'resolved' && totalHits > items.length && (
          <Button onClick={this.onNextPage} />
        )}
      </div>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default App;
// Цей код експортує компонент App, який використовує компоненти Searchbar, Loader, Button та ImageGallery.
// Компонент App відображає ці компоненти в залежності від статусу пошуку, який визначається за змінами в inputData і page.
// Коли користувач вводить запит, компонент Searchbar передає його пошуковому обробнику handleSubmit.
// Потім handleSubmit встановлює значення inputData в стані компонента App і скидає список зображень items,
// скидає статус у "idle" і встановлює page в 1.
// Компонент componentDidUpdate запускається при кожній зміні стану App.Якщо новий inputData або page відрізняється від попереднього стану,
// він перевіряє, що inputData не порожній, і, якщо це так, встановлює стан status в "pending".
// Потім він виконує пошук за допомогою функції fetchImages, використовуючи inputData і page.
// Якщо є хоча б один збіг, він додає результати пошуку до списку items і встановлює стан status "resolved".
// Якщо результати не знайдені, він виводить повідомлення про помилку, встановлює стан "idle".
// Якщо при виконанні сталася помилка, він встановлює стан "rejected".
// Потім компонент ImageGallery відображає знайдені зображення залежно від status та кількості знайдених зображень.
// Якщо отримано менше зображень, ніж totalHits, відображається компонент Button,
//   який дозволяє завантажити наступну сторінку результатів пошуку.
