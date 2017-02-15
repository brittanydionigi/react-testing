// Tests for unwrapped components should NOT be heavily dependent on
// the DOM elements or content that's being rendered. Many examples
// out there show the simple tests of making sure elements and text
// are being rendered correctly, but if we're testing the existence
// of text within a component, any time we change that language, we're
// going to have to rewrite our tests. Good use-cases for testing what's
// being rendered are when you have conditional elements/copy based on
// the current state/props of the component. e.g. if you are not logged
// in and a user tries to do something only an authenticated user can
// do, assert that "You can't do that" is rendered.

import React from 'react'
import { shallow, mount  } from 'enzyme'
import { Provider } from 'react-redux'
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import MovieList from '../../components/MovieList';
import { MovieCard } from '../../components/MovieCard';


describe('MovieList component', () => {

  // Mock some user data that we can pass in as a prop to
  // test the component when there is a logged in user
  const mockUser = {
    name: 'Bob Loblaw',
    id: 1,
    email: 'foo@bar.com'
  };

  // Mock some movie data that we can pass in as a prop
  const mockMovieDb = {
    movies: [{"poster_path":"\/rXMWOZiCt6eMX22jWuTOSdQ98bY.jpg","adult":false,"overview":"Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct three teenage girls led by the willful, observant Casey, Kevin reaches a war for survival among all of those contained within him—as well as everyone around him—as the walls between his compartments shatter apart.","release_date":"2017-01-19","genre_ids":[18,27,53],"id":381288,"original_title":"Split","original_language":"en","title":"Split","backdrop_path":"\/4G6FNNLSIVrwSRZyFs91hQ3lZtD.jpg","popularity":64.013401,"vote_count":596,"video":false,"vote_average":6.5},{"poster_path":"\/yNsdyNbQqaKN0TQxkHMws2KLTJ6.jpg","adult":false,"overview":"Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora's Box. Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly conspiracy that points to collusion at the highest levels of world governments.","release_date":"2017-01-13","genre_ids":[28,12,80,53],"id":47971,"original_title":"xXx: Return of Xander Cage","original_language":"en","title":"xXx: Return of Xander Cage","backdrop_path":"\/6AewnVY9zBgVQEuCufLvsufeRcH.jpg","popularity":44.164493,"vote_count":388,"video":false,"vote_average":5.5},{"poster_path":"\/ylXCdC106IKiarftHkcacasaAcb.jpg","adult":false,"overview":"Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.","release_date":"2016-12-01","genre_ids":[35,10402,10749,18],"id":313369,"original_title":"La La Land","original_language":"en","title":"La La Land","backdrop_path":"\/fp6X6yhgcxzxCpmM0EVC6V9B8XB.jpg","popularity":43.08764,"vote_count":1209,"video":false,"vote_average":8}],
    isCurrentlyFetching: false
  };

  // Shallow rendering with our mock props passed in. If `movieDb.isCurrentlyFetching`
  // is false, it should automatically render our list of mock movies (there are 3 of
  // them), and it should not render a loading message
  it('renders list of movies if a fetch is not in progress', () => {
    let MovieListComponent = shallow(<MovieList user={mockUser} movieDb={mockMovieDb} />);
    expect(MovieListComponent.find(MovieCard).length).toEqual(3);
    expect(MovieListComponent.find('.loading').length).toEqual(0);
  });

  // Performing a new shallow render, this time pretending that movies *are* currently
  // being fetched, and the movies array is empty. This should render our loading message
  // and should not render any MovieCard components
  it('renders a loading message if currently fetching movies', () => {
    let MovieListComponent = shallow(<MovieList user={mockUser} movieDb={{movies: [], isCurrentlyFetching: true }} />);
    expect(MovieListComponent.find('.loading').length).toEqual(1);
    expect(MovieListComponent.find(MovieCard).length).toEqual(0);
  });


  // Testing the movie component when we do not have a user logged in. We are
  // doing a full mount in these tests, passing in an empty user object rather than
  // a mockUser. We have to do a full mount here instead of a shallow render because
  // we want to verify that an error appears when an unauthenticated user clicks on a
  // MovieCard to favorite it. We cannot simulate this click event with a shallow render
  describe('MovieList Component - Not Logged In', () => {
    let MovieListComponent = mount(<MovieList user={{}} fetchMovies={() => Promise.resolve()} movieDb={mockMovieDb} />);

    it('displays a login link', () => {
      expect(MovieListComponent.find('.login').length).toEqual(1);
      expect(MovieListComponent.find('.signout').length).toEqual(0);
    });
  
    it('does not allow for favoriting movies', () => {
      let firstMovieCard = MovieListComponent.find(MovieCard).first();
      firstMovieCard.simulate('click');

      let notification = MovieListComponent.find('.notification');
      expect(notification.length).toEqual(1);
      expect(notification.text()).toEqual('You must be logged in to save a favorite.');
    });

  });

  describe('MovieList Component - Logged In', () => {
    let MovieListComponent = mount(<MovieList 
      user={mockUser}
      fetchMovies={() => Promise.resolve()}
      addFavorite={() => {}}
      movieDb={mockMovieDb}
    />);

    it('displays a signout link', () => {
      expect(MovieListComponent.find('.login').length).toEqual(0);
      expect(MovieListComponent.find('.signout').length).toEqual(1);
    });

    it('allows an authenticated user to favorite a movie', () => {
      fetchMock.post('api/users/favorites/new', { status: 200, body: { id: 234523 }});

      let firstMovieCard = MovieListComponent.find(MovieCard).first();
      firstMovieCard.simulate('click');

      expect(fetchMock.calls().matched.length).toEqual(1);
    });
  
  });

});

