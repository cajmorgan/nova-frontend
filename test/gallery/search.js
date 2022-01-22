import { Generator, root, Element, Group } from '../../index';
import { createGallery } from './gallery'
import { createPagination } from './pagination';

const fetchData = async (input, pageNum) => {
  const res = await fetch(`https://api.unsplash.com/search/photos?page=${pageNum}&query=${input}`, { headers: { Authorization: "Client-ID gHo75RTRrKxBFHgmuKFJfkTQJDI8YfoszFyse8ovX9s" } });
    const searchData = await res.json();
    const imageResults = searchData.results.map((image) => {
      return {
        artist: image.user.name,
        description: image.description,
        url: image.urls.small,
      }
    });

  return [imageResults, searchData.total_pages];
}

const state = {};

const generator = new Generator()
const search = generator.createTree(`
  section className: 'search-container'
    form className: 'search-form'
      label
        input type: 'text' className: 'search-form__input' id: 'form-input'
      input type: 'submit' className: 'search-form__submit' id: 'submit-btn'
  end`)


async function makeSearch(e, pageNum = 1) {
  if (e) e.preventDefault();
  
  const input = search.retrieve('#form-input').value
  const [data, totalPages] = await fetchData(input, pageNum);
  if (state.gallery) { 
    state.gallery.unrender();
    state.pagination.unrender();
  }

  state.gallery = await createGallery(data);
  state.pagination = await createPagination(totalPages, makeSearch);

  new Group([state.pagination, state.gallery]).render();
}

search.retrieve('#submit-btn').addEventListener('click', makeSearch)

export { search, makeSearch };