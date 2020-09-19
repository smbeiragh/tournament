import React, { FC } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import './ConfirmRemoveModal.css';
import { Tournament } from '../types';

type PropTypes = {
  open: boolean;
  onClose(): void;
  onRemove(tournament: Tournament): void;
  tournament?: Tournament | null;
};

export default function ConfirmRemoveModal(props: PropTypes) {
  const { open, onClose, onRemove, tournament } = props;

  const handleOnClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleOnRemove = () => {
    if (typeof onRemove === 'function' && tournament) {
      onRemove(tournament);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={handleOnClose}
      aria-labelledby="Remove favorite tournament"
    >
      <div className="bg-gray-200 p-4">
        <h2 className="mb-2 font-medium text-base">Remove Favorite Tournament</h2>
        <p className="mb-4 font-sm text-gray-700">
          Do you want to remove `{tournament?.title}` from Saved Tournaments?
        </p>
        <div className="c-confirmRemoveModal__actions">
          <Button className="c-confirmRemoveModal__action" variant="contained" color="primary" onClick={handleOnRemove}>
            Remove
          </Button>
          <Button className="c-confirmRemoveModal__action" variant="contained" color="default" onClick={handleOnClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
