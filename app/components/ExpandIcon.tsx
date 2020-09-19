import React from 'react';
import classNames from 'classnames';

interface PropTypes {
  containerClassName?: string;
  className?: string;
}

export default function ExpandIcon(props: PropTypes) {
  const { containerClassName, className } = props;

  return (
    <div className={containerClassName}>
      <svg
        className={classNames('fill-current', className)}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 768 768"
      >
        <path d="M531 274.5l45 45-192 192-192-192 45-45 147 147z"></path>
      </svg>
    </div>
  );
}
