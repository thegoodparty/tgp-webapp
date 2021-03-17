// returns only articles that match the page.
const queryHelper = (search, variable) => {
  if (!search || !variable) {
    return null;
  }
  const query = search.substring(1);
  console.log('Search:', query);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    // console.log('Search:', pair[0], decodeURIComponent(pair[0]));

    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
};

export default queryHelper;
