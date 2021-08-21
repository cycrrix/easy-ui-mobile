import * as React from 'react';
import classNames from 'classnames';

import { useInterval } from '@/_hooks';

interface CarouselItem {
  img: string;
  onClick?: Function;
}

interface ICarouselProps {
  /**
   * @description 数据源
   */
  dataSource: CarouselItem[];
  /**
   * @description 是否自动播放
   */
  autoplay?: number;
  /**
   * @description className属性透传
   */
  className?: string;
  /**
   * @description 曝光回调
   */
  onExpose?: Function;
}

interface ICarouselStatus {
  /**
   * @description 是否正在触摸
   */
  touching: boolean;
  /**
   * @description 是否正在触摸
   */
  startX: number;
  /**
   * @description 是否正在触摸
   */
  startY: number;
  /**
   * @description 是否正在触摸
   */
  startTime: number;
}

const Carousel: React.FunctionComponent<ICarouselProps> = ({
  dataSource = [],
  autoplay,
  className,
  onExpose,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null); // 容器元素引用
  const [currentIndex, setCurrentIndex] = React.useState<number>(0); // 当前展示图片索引
  const [moveDistance, setMoveDistance] = React.useState<number>(0); // 触摸滑动距离（视口宽百分比）
  // 存储组件一些实时变量，因变量较多所以不用useRef，并且模块级变量一会一直占用内存
  const [statusData] = React.useState<ICarouselStatus>({
    touching: false,
    startX: 0,
    startY: 0,
    startTime: 0,
  });

  React.useEffect(() => {
    // touchmove事件 passive默认值为true
    wrapperRef.current &&
      wrapperRef.current.addEventListener('touchmove', onTouchMove, {
        passive: false,
      });
  }, []);

  useInterval(
    () => {
      if (!statusData.touching && autoplay) {
        stepTo(currentIndex < count - 1 ? currentIndex + 1 : 0);
      }
    },
    typeof autoplay === 'number' ? autoplay : null,
  );

  const onTouchStart = React.useCallback((e) => {
    // 记录坐标、操作时间，设置触摸标识
    statusData.startX = e.changedTouches[0].screenX;
    statusData.startY = e.changedTouches[0].screenY;
    statusData.startTime = new Date().getTime();
    statusData.touching = true;
  }, []);

  const onTouchMove = React.useCallback((e) => {
    // 如果X方向上的位移大于Y方向，则认为是左右滑动
    if (
      Math.abs(e.changedTouches[0].screenX - statusData.startX) >
      Math.abs(e.changedTouches[0].screenY - statusData.startY)
    ) {
      setMoveDistance(
        ((e.changedTouches[0].screenX - statusData.startX) /
          window.innerWidth) *
          100,
      );
      e.preventDefault();
    }
  }, []);

  const onTouchEnd = React.useCallback(() => {
    let boundary = 50;
    // 滑动速度大于 10%屏幕宽度/秒，则认为是快速滑动，直接切换
    // 滑动距离大于50%
    if (
      Math.abs(
        moveDistance / ((new Date().getTime() - statusData.startTime) / 1000),
      ) > 10 ||
      moveDistance > boundary ||
      moveDistance < -boundary
    ) {
      stepTo(moveDistance > 0 ? currentIndex - 1 : currentIndex + 1);
    }

    // 滑动距离重置为0
    setMoveDistance(0);
    statusData.touching = false;
  }, [moveDistance, currentIndex]);

  const count = dataSource.length;

  /**
   * 跳转至某张图
   * @step 索引
   */
  const stepTo = React.useCallback(
    (step) => {
      let stepIndex = step > count - 1 ? count - 1 : step < 0 ? 0 : step;
      setCurrentIndex(stepIndex);
      onExpose && onExpose(stepIndex);
    },
    [count, onExpose],
  );

  // 根据滑动距离设置 图片列表的样式
  const translateX = moveDistance
    ? `${-currentIndex * 100 + moveDistance}%`
    : `${-currentIndex * 100}%`;
  const transition = moveDistance ? 'none' : '.4s all';
  const listStyle = {
    transition: transition,
    transform: `translate3d(${translateX},0,0)`,
  };

  return (
    <div
      className={classNames('easy-ui-carousel-wrapper', className)}
      ref={wrapperRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="easy-ui-carousel-list" style={{ ...listStyle }}>
        {dataSource.map((t, i) => (
          <div
            className="easy-ui-carousel-item"
            key={i}
            onClick={() => t.onClick && t.onClick()}
          >
            <img className="easy-ui-carousel-img" src={t.img} alt="" />
          </div>
        ))}
      </div>
      {count > 1 ? (
        <div className="easy-ui-carousel-dots">
          {dataSource.map((v, i) => (
            <span
              key={i}
              className={`easy-ui-carousel-dot ${
                i === currentIndex ? 'active' : ''
              }`}
            ></span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
