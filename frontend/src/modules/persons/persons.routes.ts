import { createRoute } from '@tanstack/react-router';

import { applicationRoute } from '../application/application.routes.js';

import { Persons } from './persons.js';
import { PersonsCreate } from './persons-create.js';
import { PersonsUpdate } from './persons-update.js';

const personsRoute = createRoute({
  getParentRoute: () => applicationRoute,
  component: Persons,
  path: '/',
});

const personsCreateRoute = createRoute({
  getParentRoute: () => personsRoute,
  component: PersonsCreate,
  path: '/create',
});

const personsEditRoute = createRoute({
  getParentRoute: () => personsRoute,
  component: PersonsUpdate,
  path: '/edit/$id',
});

export {
  personsRoute,
  personsCreateRoute,
  personsEditRoute,
};
