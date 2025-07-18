import { createRootRoute } from '@tanstack/react-router';

import { Application } from './application.js';

const applicationRoute = createRootRoute({
  component: Application,
});

export {
  applicationRoute,
};
