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
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import MovieList from '../../components/MovieList';
import { MovieCard } from '../../components/MovieCard';


// const setup = () => {
  
//   // mock out a store
//   const mockStore = configureMockStore()({ 
//     user: {
//       id: null,
//       name: null,
//       email: null
//     }
//   });

//   // mock out some pretend user data to work with
//   // we'll use this as our pretend response from 
//   // our API call
//   const mockUser = {
//     data: {
//       name: 'Bob Loblaw',
//       id: 1,
//       email: 'foo'
//     }
//   };

//   const Wrapper = mount(<Provider store={mockStore}><Login /></Provider>);
//   const Component = Wrapper.find(Login);


//   return {
//     mockStore,
//     mockUser,
//     Component
//   }
// }

describe('MovieList component', () => {
  // mock out some pretend user data to work with
  // we'll use this as our pretend response from 
  // our API call
  const mockUser = {
    data: {
      name: 'Bob Loblaw',
      id: 1,
      email: 'foo@bar.com'
    }
  };

  const mockMovies = [{"poster_path":"\/rXMWOZiCt6eMX22jWuTOSdQ98bY.jpg","adult":false,"overview":"Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct three teenage girls led by the willful, observant Casey, Kevin reaches a war for survival among all of those contained within him—as well as everyone around him—as the walls between his compartments shatter apart.","release_date":"2017-01-19","genre_ids":[18,27,53],"id":381288,"original_title":"Split","original_language":"en","title":"Split","backdrop_path":"\/4G6FNNLSIVrwSRZyFs91hQ3lZtD.jpg","popularity":64.013401,"vote_count":596,"video":false,"vote_average":6.5},{"poster_path":"\/yNsdyNbQqaKN0TQxkHMws2KLTJ6.jpg","adult":false,"overview":"Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora's Box. Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly conspiracy that points to collusion at the highest levels of world governments.","release_date":"2017-01-13","genre_ids":[28,12,80,53],"id":47971,"original_title":"xXx: Return of Xander Cage","original_language":"en","title":"xXx: Return of Xander Cage","backdrop_path":"\/6AewnVY9zBgVQEuCufLvsufeRcH.jpg","popularity":44.164493,"vote_count":388,"video":false,"vote_average":5.5},{"poster_path":"\/ylXCdC106IKiarftHkcacasaAcb.jpg","adult":false,"overview":"Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.","release_date":"2016-12-01","genre_ids":[35,10402,10749,18],"id":313369,"original_title":"La La Land","original_language":"en","title":"La La Land","backdrop_path":"\/fp6X6yhgcxzxCpmM0EVC6V9B8XB.jpg","popularity":43.08764,"vote_count":1209,"video":false,"vote_average":8}];

  fetchMock.get(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=72dd63e7f1a8c927ce73ad8949399f40&language=en-US&page=1',
    { status: 200 }
  );

  const MovieListComponent = shallow(<MovieList user={mockUser.data} movies={mockMovies} />);
  // const MountedLoginComponent = mount(<Login user={mockUser.data} />);

  beforeEach(() => {


    // const { Component, mockStore, mockUser } = setup();
    // intercept our POST request to /api/users, and automatically
    // return a successful status of 201 with our mockUser data
    // fetchMock.post('/api/users', { status: 201, body: mockUser });
  });

  afterEach(() => {

    // assert that all API calls have been intercepted
    // and handled appropriately. If there is anything
    // remaining in this array, we done messed up
    expect(fetchMock.calls().unmatched).toEqual([]);

    // our mocked-out store keeps a log of all the actions
    // that have been dispatched so we can check that the
    // appropriate ones are being called. after each test
    // we want to clear this out so we can start fresh
    // store.clearActions();

    // start fresh with fetchMock after each test so that we're
    // not intercepting API calls that no longer need to be tested
    fetchMock.restore();
  });

  it('renders list of movies', () => {
    expect(MovieListComponent.find(MovieCard).length).toEqual(3);
  });

  it('displays an error if an unauthenticated user attempts to favorite a movie');
  it('allows an authenticated user to favorite a movie');
});

