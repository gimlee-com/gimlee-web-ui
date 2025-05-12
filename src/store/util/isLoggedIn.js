import isEqual from 'lodash.isequal';
import { user } from '../../model/index';

export default loginSession => loginSession.expires > Date.now()
 && !isEqual(loginSession.user, user);
