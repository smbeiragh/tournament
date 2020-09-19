import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Tournament as ITournament } from '../types';
import './Tournament.css';

type PropTypes = {
  data: ITournament;
  className?: string;
  onRemove?(tournament: ITournament): void | null;
};

export default function Tournament(props: PropTypes) {
  const { data, className, onRemove } = props;

  const imgPath = data?.images?.square?.filePath || data?.images?.default?.filePath;

  return (
    <div className={classNames('c-tournament', className)}>
      {onRemove && (
        <IconButton size="small" className="c-tournament__removeBtn" aria-label="delete" onClick={() => onRemove(data)}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
      {imgPath && <img className="c-tournament__image" src={`${process.env.CDN_BASE_URL}${imgPath}`} />}
      <div className="c-tournament__info">
        <header className="c-tournament__title">{data.title}</header>
        <p className="c-tournament__desc">{data.description}</p>
      </div>
    </div>
  );
}
