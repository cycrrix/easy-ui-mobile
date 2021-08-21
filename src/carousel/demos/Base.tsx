import * as React from 'react';
import { Carousel } from 'easy-ui-mobile';

const dataSource = [
  {
    img: 'https://raw.githubusercontent.com/cycrrix/picture-bed/master/banner1.jpeg',
  },
  {
    img: 'https://raw.githubusercontent.com/cycrrix/picture-bed/master/banner2.webp',
  },
  {
    img: 'https://raw.githubusercontent.com/cycrrix/picture-bed/master/banner3.jpeg',
  },
];

export default () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Carousel dataSource={dataSource} autoplay={1500}>
        Carousel内容
      </Carousel>
    </div>
  );
};
