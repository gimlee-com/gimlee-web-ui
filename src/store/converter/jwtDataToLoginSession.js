import { user } from '../../model';

export default (data) => {
  const expires = new Date(null);
  expires.setTime(data.exp * 1000);

  return {
    user: { ...user,
      username: data.username,
      roles: data.roles,
    },
    expires,
  };
};
