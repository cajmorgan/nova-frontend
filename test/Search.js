import { Generator, root, Element } from '../index';
import createGallery from './Gallery'

const fetchData = async (input) => {
  const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${input}`, { headers: { Authorization: "Client-ID gHo75RTRrKxBFHgmuKFJfkTQJDI8YfoszFyse8ovX9s" } });
    const searchData = await res.json();
    const imageResults = searchData.results.map((image) => {
      return {
        artist: image.user.name,
        description: image.description,
        url: image.urls.small
      }
    });
  
  return imageResults;
}

let gallery = '';

const generator = new Generator()
const search = generator.createTree(`
  section className: 'search-container'
    form className: 'search-form'
      label
        input type: 'text' className: 'search-form__input'
      input type: 'submit' className: 'search-form__submit' id: 'submit-btn'
  end`)

search.retrieve('#submit-btn')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    const input = search.retrieve('.search-form__input')[0].value
    const data = fetchData(input);
    if (gallery) gallery.unrender();
    gallery = await createGallery(data);
    gallery.render();
  })

export default search;