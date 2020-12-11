import ReactGA from 'react-ga';
import ENV from 'api/ENV';

class AnalyticsService {
  static sendEvent(category, action = 'click', label, value) {
    if (ENV !== 'prod') {
      return;
    }
    if (category && action && label && value) {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
    } else if (category && action && label) {
      ReactGA.event({
        category,
        action,
        label,
      });
    } else {
      ReactGA.event({
        category,
        action,
      });
    }
  }
}

export default AnalyticsService;
