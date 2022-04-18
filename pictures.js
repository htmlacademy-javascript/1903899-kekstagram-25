const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnails = (photos) => {
  const simularPictureFragment = document.createDocumentFragment();

  photos.forEach(({url, comments, likes, id}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').id = id;

    simularPictureFragment.appendChild(pictureElement);
  }) ;

  return simularPictureFragment;
};

export {createThumbnails};
// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
