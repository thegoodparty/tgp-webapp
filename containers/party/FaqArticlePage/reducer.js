import produce from 'immer';

const initialState = {
};

const faqArticleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    }
  });

export default faqArticleReducer;
