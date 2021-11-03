import { Generator } from '../index';

let pageNum = 1;

function createPagination(total_pages, makeSearch) {
  const generator = new Generator();
  const pagination = generator.createTree(`
    div className: 'pagination'
      button id: 'prev' innerText: 'prev'
      button id: 'next' innerText: 'next'
  end`)
 
  if (pageNum === 1 || total_pages <= 1) {
    pagination.deleteById('prev');
  }

  if (pageNum === total_pages || !total_pages) {
    pagination.deleteById('next');
  }

  for(let i = 1; i < pagination.elements.length; i++) {
    pagination.elements[i].addEventListener('click', async (e) => {
      if(e.target.id === 'prev') {
        pageNum--
      } else if (e.target.id === 'next') {
        pageNum++
      }
      
      makeSearch('', pageNum);
    })
  }
  

  return pagination;
}

export default createPagination;