import * as React from 'react';
import { Carousel } from 'easy-ui-mobile';

const dataSource = [
  {
    img: 'https://i.loli.net/2021/08/22/26PUDaBcXvdKRlT.jpg',
  },
  {
    img: 'https://i.loli.net/2021/08/22/YHzK4mUE2x9PiFg.jpg',
  },
  {
    img: 'https://i.loli.net/2021/08/22/QW5kCcuLMgAfKzl.jpg',
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
