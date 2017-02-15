export const REQUEST_IN_PROGRESS = 'REQUEST_IN_PROGRESS';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const MOVIES_RECEIVED = 'MOVIES_RECEIVED';

const FETCH_URL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=72dd63e7f1a8c927ce73ad8949399f40&language=en-US&page=1';


function moviesReceived(movies) {
  return {
    type: MOVIES_RECEIVED,
    movies
  }
};

function requestInProgress() {
  return {
    type: REQUEST_IN_PROGRESS,
  };
};

function requestComplete(status) {
  return {
    type: REQUEST_COMPLETE,
    status
  };
};

function fetchMovies() {
  return dispatch => {
    dispatch(requestInProgress());

    return fetch(FETCH_URL)
      .then(response => {

        // If the response comes back with an HTTP status that indicates an error
        if (response.status >= 400) {
          dispatch(requestComplete('error'));
          return response.json().then(err => { throw err; });
        }

        // Otherwise...
        dispatch(requestComplete('success'));
        return response.json().then(result => dispatch(moviesReceived(result.movies)));
      });
  };
};

export default {
  fetchMovies
};




// const apiRequestMap = {
//   fetchAllRecipes() {
//     return {
//       url: `${BASE_API_URL}recipe/`,
//       settings: {
//         method: 'GET',
//       },
//       errorNotification: 'Error fetching recipes.',
//     };
//   },

//   fetchFilters() {
//     return {
//       url: `${BASE_API_URL}filters/`,
//       settings: {
//         method: 'GET',
//       },
//       errorNotification: 'Error fetching filter options.',
//     };
//   },

//   fetchFilteredRecipes(filterParams) {
//     return {
//       url: `${BASE_API_URL}recipe/?${filterParams}`,
//       settings: {
//         method: 'GET',
//       },
//       errorNotification: 'Error fetching filtered recipes.',
//     };
//   },

//   fetchSingleRecipe(recipeInfo) {
//     return {
//       url: `${BASE_API_URL}recipe/${recipeInfo.recipeId}/`,
//       settings: {
//         method: 'GET',
//       },
//       errorNotification: 'Error fetching recipe.',
//     };
//   },

//   fetchSingleRevision(recipeInfo) {
//     return {
//       url: `${BASE_API_URL}recipe_version/${recipeInfo.revisionId}/`,
//       settings: {
//         method: 'GET',
//       },
//       errorNotification: 'Error fetching recipe revision.',
//     };
//   },

//   fetchRecipeHistory(recipeInfo) {
//     return {
//       url: `${BASE_API_URL}recipe/${recipeInfo.recipeId}/history/`,
//       settings: {
//         method: 'GET',
//       },
//       errorNotification: 'Error fetching recipe history.',
//     };
//   },

//   addRecipe(recipeInfo) {
//     return {
//       url: `${BASE_API_URL}recipe/`,
//       settings: {
//         body: JSON.stringify(recipeInfo.recipe),
//         method: 'POST',
//       },
//     };
//   },

//   updateRecipe(recipeInfo) {
//     return {
//       url: `${BASE_API_URL}recipe/${recipeInfo.recipeId}/`,
//       settings: {
//         body: JSON.stringify(recipeInfo.recipe),
//         method: 'PATCH',
//       },
//     };
//   },

//   deleteRecipe(recipeInfo) {
//     return {
//       url: `${BASE_API_URL}recipe/${recipeInfo.recipeId}/`,
//       settings: {
//         method: 'DELETE',
//       },
//       successNotification: 'Recipe deleted.',
//       errorNotification: 'Error deleting recipe.',
//     };
//   },
// };


// function requestInProgress() {
//   return {
//     type: REQUEST_IN_PROGRESS,
//   };
// }

// function requestComplete(result) {
//   return dispatch => {
//     if (result.notification) {
//       dispatch(showNotification({ messageType: result.status, message: result.notification }));
//     }

//     dispatch({ type: REQUEST_COMPLETE, status: result.status });
//   };
// }

// function recipesReceived(recipes, cacheKey) {
//   return {
//     type: RECIPES_RECEIVED,
//     recipes,
//     key: cacheKey,
//   };
// }

// function filtersReceived(filters) {
//   return {
//     type: LOAD_FILTERS,
//     filters,
//   };
// }

// function recipesNeedFetch() {
//   return {
//     type: RECIPES_NEED_FETCH,
//   };
// }

// function singleRecipeReceived(recipe) {
//   return {
//     type: SINGLE_RECIPE_RECEIVED,
//     recipe,
//   };
// }

// function recipeAdded(recipe) {
//   return {
//     type: RECIPE_ADDED,
//     recipe,
//   };
// }

// function recipeUpdated(recipe) {
//   return {
//     type: RECIPE_UPDATED,
//     recipe,
//   };
// }

// function recipeDeleted(recipeId) {
//   return {
//     type: RECIPE_DELETED,
//     recipeId,
//   };
// }

// function setSelectedRecipe(recipeId) {
//   return {
//     type: SET_SELECTED_RECIPE,
//     recipeId,
//   };
// }

// function showNotification(notification) {
//   return dispatch => {
//     // Use time-based id and dismiss automatically after 10 seconds.
//     notification.id = notification.id || new Date().getTime();
//     setTimeout(() => {
//       dispatch(dismissNotification(notification.id));
//     }, 10000);

//     dispatch({
//       type: SHOW_NOTIFICATION,
//       notification,
//     });
//   };
// }

// function dismissNotification(notificationId) {
//   return {
//     type: DISMISS_NOTIFICATION,
//     notificationId,
//   };
// }

// function makeApiRequest(requestType, requestData) {
//   return dispatch => {
//     const apiRequestConfig = apiRequestMap[requestType](requestData);

//     dispatch(requestInProgress());

//     return fetch(apiRequestConfig.url, {
//       ...API_REQUEST_SETTINGS,
//       ...apiRequestConfig.settings,
//     })
//     .then(response => {
//       if (response.status >= 400) {
//         dispatch(requestComplete({
//           status: 'error',
//           notification: apiRequestConfig.errorNotification,
//         }));
//         return response.json().then(err => { throw err; });
//       }
//       dispatch(requestComplete({
//         status: 'success',
//         notification: apiRequestConfig.successNotification,
//       }));
//       return (response.status === 204) ? response.text : response.json();
//     });
//   };
// }