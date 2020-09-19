import React from 'react';
import classNames from 'classnames';
import { Container } from '../components/Layout';

interface PropTypes {
  children: JSX.Element[] | JSX.Element | string | false;
  className?: string;
  title?: string;
}

export default function Panel(props: PropTypes) {
  const { title, children, className } = props;

  return (
    <section className={classNames('bg-gray-300', className)}>
      <Container className="py-4">
        <h2 className="mb-6">{title}</h2>
        <div>{children}</div>
      </Container>
    </section>
  );
}
