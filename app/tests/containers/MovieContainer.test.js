// Container components are fairly simple: they are usually just
// passing through state and actions as props. All we need to test here
// is if the correct props end up on our wrapped components. We can 
// get into more serious integration tests here but let's not for now

import React from 'react'
import { mount  } from 'enzyme' // testing container components requires a full mount, not a shallow
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

// import both the container and the component we want to wrap
import MoviesContainer from '../../containers/MoviesContainer'
import MovieList from '../../components/MovieList'

// We technically don't *need* configureMockStore, because we're not
// applying any middleware (e.g. redux-thunk) in this example. We could
// mock out a simpler one ourselves, but using it doesn't do any harm
// and it gives us a lot of testing features for free.
const mockStore = configureMockStore()({
  user: { // mocking out an initial user state so we can test if it gets passed down accurately
    name: 'Bob Loblaw',
    id: 1,
    email: 'foo@bar.com'
  },
  movieDb: {
    movies: [{"poster_path":"\/rXMWOZiCt6eMX22jWuTOSdQ98bY.jpg","adult":false,"overview":"Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct three teenage girls led by the willful, observant Casey, Kevin reaches a war for survival among all of those contained within him—as well as everyone around him—as the walls between his compartments shatter apart.","release_date":"2017-01-19","genre_ids":[18,27,53],"id":381288,"original_title":"Split","original_language":"en","title":"Split","backdrop_path":"\/4G6FNNLSIVrwSRZyFs91hQ3lZtD.jpg","popularity":64.013401,"vote_count":596,"video":false,"vote_average":6.5},{"poster_path":"\/yNsdyNbQqaKN0TQxkHMws2KLTJ6.jpg","adult":false,"overview":"Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora's Box. Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly conspiracy that points to collusion at the highest levels of world governments.","release_date":"2017-01-13","genre_ids":[28,12,80,53],"id":47971,"original_title":"xXx: Return of Xander Cage","original_language":"en","title":"xXx: Return of Xander Cage","backdrop_path":"\/6AewnVY9zBgVQEuCufLvsufeRcH.jpg","popularity":44.164493,"vote_count":388,"video":false,"vote_average":5.5},{"poster_path":"\/ylXCdC106IKiarftHkcacasaAcb.jpg","adult":false,"overview":"Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.","release_date":"2016-12-01","genre_ids":[35,10402,10749,18],"id":313369,"original_title":"La La Land","original_language":"en","title":"La La Land","backdrop_path":"\/fp6X6yhgcxzxCpmM0EVC6V9B8XB.jpg","popularity":43.08764,"vote_count":1209,"video":false,"vote_average":8}],
    isCurrentlyFetching: false
  }
});

const setup = () => {
  // Mount our container component *within* a Provider that has our new mockStore as a prop
  const Container = mount(<Provider store={mockStore}><MoviesContainer /></Provider>);

  // Find the component we're wrapping so we can check its props later
  const Component = Container.find(MovieList);

  return {
    Container,
    Component
  }
}

describe('MoviesContainer', () => {
  // Grab our container and component from the setup method we wrote
  const { Container, Component } = setup();

  // Verify that our initial state was passed down as props
  it('should pass the appropriate props from state', () => {
    expect(Component.props().user).toEqual({
      name: 'Bob Loblaw',
      id: 1,
      email: 'foo@bar.com'
    });

    expect(Component.props().movieDb).toEqual({
      movies: [{"poster_path":"\/rXMWOZiCt6eMX22jWuTOSdQ98bY.jpg","adult":false,"overview":"Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct three teenage girls led by the willful, observant Casey, Kevin reaches a war for survival among all of those contained within him—as well as everyone around him—as the walls between his compartments shatter apart.","release_date":"2017-01-19","genre_ids":[18,27,53],"id":381288,"original_title":"Split","original_language":"en","title":"Split","backdrop_path":"\/4G6FNNLSIVrwSRZyFs91hQ3lZtD.jpg","popularity":64.013401,"vote_count":596,"video":false,"vote_average":6.5},{"poster_path":"\/yNsdyNbQqaKN0TQxkHMws2KLTJ6.jpg","adult":false,"overview":"Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora's Box. Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly conspiracy that points to collusion at the highest levels of world governments.","release_date":"2017-01-13","genre_ids":[28,12,80,53],"id":47971,"original_title":"xXx: Return of Xander Cage","original_language":"en","title":"xXx: Return of Xander Cage","backdrop_path":"\/6AewnVY9zBgVQEuCufLvsufeRcH.jpg","popularity":44.164493,"vote_count":388,"video":false,"vote_average":5.5},{"poster_path":"\/ylXCdC106IKiarftHkcacasaAcb.jpg","adult":false,"overview":"Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.","release_date":"2016-12-01","genre_ids":[35,10402,10749,18],"id":313369,"original_title":"La La Land","original_language":"en","title":"La La Land","backdrop_path":"\/fp6X6yhgcxzxCpmM0EVC6V9B8XB.jpg","popularity":43.08764,"vote_count":1209,"video":false,"vote_average":8}],
      isCurrentlyFetching: false
    });
  });

  // Verify the container correctly bound our action creators as props
  it('should pass down the correct action creators', () => {
    expect(Object.keys(Component.props())).toContain('fetchMovies', 'signOut', 'addFavorite');
  });
});