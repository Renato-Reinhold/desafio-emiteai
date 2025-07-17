import { applicationRoute } from './modules/application/application.routes.js';
import { personsCreateRoute, personsEditRoute, personsRoute } from './modules/persons/persons.routes.js';

const routeTree = applicationRoute.addChildren([
  personsRoute.addChildren([
    personsCreateRoute,
    personsEditRoute,
  ])
]);

export {
  routeTree,
};
