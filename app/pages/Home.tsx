import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { listFavoriteTournament, addFavoriteTournament, removeFavoriteTournament } from '../redux/tournament.actions';
import { Layout, Container } from '../components/Layout';
import TournamentAutocomplete from '../components/TournamentAutocomplete';
import Panel from '../components/Panel';
import Tournament from '../components/Tournament';
import ConfirmModal from '../components/ConfirmRemoveModal';
import './Home.css';
import { TournamentState, Tournament as ITournament } from '../types';

const mapStateToProps = (state: { tournament: TournamentState }) => {
  const { result: favorites } = state.tournament.favorites;
  return {
    favorites,
  };
};

function Home(props: any) {
  const { dispatch, favorites } = props;

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<ITournament | null>(null);

  useEffect(() => {
    dispatch(listFavoriteTournament());
  }, []);

  const handleAddToFavorites = (tournament: ITournament) => {
    dispatch(addFavoriteTournament({ tournament }));
  };

  const handleRemove = (tournament: ITournament) => {
    setSelectedTournament(tournament);
    setConfirmModalOpen(true);
  };

  return (
    <Layout className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Container className="flex flex-col items-center p-2">
          <p className="pb-1 font-medium text-gray-700 text-base">Search & Save your favorite tournaments</p>
          <TournamentAutocomplete onSelect={handleAddToFavorites} />
        </Container>
      </main>

      <Panel className="" title="Your Saved Tournaments">
        <>
          {favorites && favorites.length > 0 && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <TransitionGroup component={React.Fragment}>
                {favorites &&
                  favorites.map((item: ITournament) => (
                    <CSSTransition key={item.id} classNames="favTransition" timeout={{ enter: 300, exit: 300 }}>
                      <Tournament className="bg-white" data={item} onRemove={handleRemove} />
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </div>
          )}
          {(!favorites || favorites.length === 0) && (
            <div className="text-sm text-gray-700">{"You haven't saved any tournament yet."}</div>
          )}
        </>
      </Panel>

      <ConfirmModal
        tournament={selectedTournament}
        open={isConfirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
        }}
        onRemove={(tournament: ITournament) => {
          dispatch(removeFavoriteTournament({ id: tournament.id })).then(() => {
            setSelectedTournament(null);
            setConfirmModalOpen(false);
          });
        }}
      />
    </Layout>
  );
}

export default connect(mapStateToProps, null)(Home);
