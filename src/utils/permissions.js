export const ROLES = {
  ADMIN: "ADMIN",
  DIRECTOR: "DIRECTOR",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER",
};

export function isAdmin(user) {
  return user?.role === ROLES.ADMIN;
}

export function isDirector(user) {
  return user?.role === ROLES.DIRECTOR;
}

export function isManager(user) {
  return user?.role === ROLES.MANAGER;
}