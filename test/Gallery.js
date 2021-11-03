import { Generator, Group, Element, root } from '../index'

async function createGallery(dataPromise) {
  const imageBuild = `
  div className: 'gallery__image'
    p innerText: '{{title}}'
    img srcset: '{{url}}'
  end`
  
  const images = [];
  const generator = new Generator();
  const data = await dataPromise;
  data.forEach(imageInfo => {
    const image = generator.createTree(imageBuild);
    image.setProps({ title: imageInfo.artist, url: imageInfo.url });
    images.push(image);
  })
  
  const wrapper = new Element('section', root, { className: 'gallery-wrapper' });
  const gallery = new Group(images, wrapper);
  return gallery;
}

export default createGallery