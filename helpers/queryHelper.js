// returns only articles that match the page.
const queryHelper = (search, variable) => {
  if (!search || !variable) {
    return null;
  }
  const query = search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
};

export default queryHelper;
