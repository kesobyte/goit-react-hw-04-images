import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos }) => {
  return (
    <ul className={css.imageGallery}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }, index) => (
        <ImageGalleryItem
          key={`${id}-${index}`} // Ensures uniqueness with a combination of id and index
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
