import * as React from 'react';
import classNames from 'classnames';

interface IDrawerProps {
  /**
   * @description 是否可见
   * @default true
   */
  visible: boolean;
  /**
   * @description 点击非子元素触发回调
   */
  onClose?: Function;
  /**
   * @description 透传className到容器
   */
  className?: string;
  /**
   * @description 透传style到容器
   */
  style?: React.CSSProperties;
}

const Drawer: React.FC<IDrawerProps> = ({
  visible = false,
  onClose,
  className,
  style,
  children,
}) => {
  const [hidden, setHidden] = React.useState<boolean>(true); // 配合visible延迟隐藏，达到动画效果
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (visible) {
      setHidden(false);
    } else {
      setTimeout(() => {
        setHidden(true);
      }, 290);
    }
  }, [visible]);

  React.useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('touchmove', preventEvent);
      wrapperRef.current.addEventListener('mousewheel', preventEvent);
    }
  }, [hidden]);

  const preventEvent = React.useCallback((e) => {
    e.preventDefault();
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        'easy-ui-drawer-wrapper',
        visible ? '' : 'closing',
        className,
      )}
      style={style}
      onClick={() => {
        onClose && onClose();
      }}
    >
      {visible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Drawer;
