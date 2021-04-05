import express from 'express';

import UsersControllerCreate from '../controllers/UsersControllers/create';
import UsersControllerShow from '../controllers/UsersControllers/show';
import UsersControllerIndex from '../controllers/UsersControllers/index';
import UsersControllerUpdate from '../controllers/UsersControllers/update';

import AuthControllerLogin from '../controllers/AuthControllers/login';
import AuthControllerValidateToken from '../controllers/AuthControllers/validateToken';

import ProfilesControllerCreate from '../controllers/ProfilesControllers/create';
import ProfilesControllerUpdate from '../controllers/ProfilesControllers/update';
import ProfilesControllerShow from '../controllers/ProfilesControllers/show';

import TasksControllerCreate from '../controllers/TasksControllers/create';
import TasksControllerIndex from '../controllers/TasksControllers/index';
import TasksControllerDelete from '../controllers/TasksControllers/delete';
import TasksControllerUpdate from '../controllers/TasksControllers/update';

import passportToAppp from './passport';

const routes = express.Router();

// métodos pra registrar e logar na aplicação
routes.post('/register', UsersControllerCreate);
routes.post('/login', AuthControllerLogin);

// pegar os dados de um user
routes.get('/users/:id', passportToAppp().authenticate(), UsersControllerShow);
routes.get('/users', passportToAppp().authenticate(), UsersControllerIndex);

routes.put('/users/:id', passportToAppp().authenticate(), UsersControllerUpdate);

// validar token do usuário
routes.get('/auth/validate', AuthControllerValidateToken);

routes.post('/profiles/:id', passportToAppp().authenticate(), ProfilesControllerCreate);
routes.put('/profiles/:id', passportToAppp().authenticate(), ProfilesControllerUpdate);
routes.get('/profiles/:id', passportToAppp().authenticate(), ProfilesControllerShow);

routes.get('/tasks/:id', passportToAppp().authenticate(), TasksControllerIndex);
routes.post('/tasks/:id', passportToAppp().authenticate(), TasksControllerCreate);
routes.delete('/tasks/:id', passportToAppp().authenticate(), TasksControllerDelete);
routes.put('/tasks/:id', passportToAppp().authenticate(), TasksControllerUpdate);

export default routes;