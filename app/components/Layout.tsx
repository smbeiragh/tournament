import React from 'react';
import classNames from 'classnames';

interface PropTypes {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
}

function Layout(props: PropTypes) {
  const { children, className } = props;

  return <div className={classNames(className)}>{children}</div>;
}

function Container(props: PropTypes) {
  const { children, className } = props;

  return <div className={classNames('container mx-auto px-4', className)}>{children}</div>;
}

export { Layout, Container };
