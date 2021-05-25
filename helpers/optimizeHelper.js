export const getExperiment = (name, experimentId, callback) => {
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: name,
      eventCallback: () => {
        const type =
          window.google_optimize && window.google_optimize.get(experimentId);
        // undefined - when experiment isn't running
        // 1,2,3 - when ant variant is running
        if (type) {
          callback(type);
        }
      },
    });
  }
};
