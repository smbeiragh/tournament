import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import createApi from '../services/api';
import Tournament from './Tournament';
import { Tournament as ITournament } from '../types';

const api = createApi();

type PropTypes = {
  onSelect?(tournament: ITournament | null): void;
};

export default function TournamentAutoComplete(props: PropTypes) {
  const { onSelect } = props;
  const [open, setOpen] = React.useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTournaments = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.searchTournament({ query });
      if (response.status === 200) {
        const body = await response.json();
        setTournaments((body[0]?.documents || []).slice(0, 10));
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const debouncedFetchTournaments = useCallback(debounce(fetchTournaments, 100, { trailing: true }), []);

  const handleInputChange = (e: any) => {
    const q = e?.target?.value as string;
    if (q && q.length >= 2) {
      debouncedFetchTournaments(q);
    }
  };

  const handleChange = (e: any, value: ITournament | null) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <Autocomplete
      value={null}
      onChange={(e, value) => handleChange(e, value)}
      style={{ width: 300 }}
      getOptionSelected={() => false}
      getOptionLabel={(option) => (option as ITournament).title}
      options={tournaments}
      filterOptions={(x) => x}
      clearOnBlur={true}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      renderOption={(option) => <Tournament className="max-w-full" data={option} />}
      noOptionsText="Begin typing for suggestions"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Tournament"
          variant="outlined"
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
