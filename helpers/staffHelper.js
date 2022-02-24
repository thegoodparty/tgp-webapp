export const ACCESS_ENUM = {
  NO_ACCESS: 0,
  STAFF: 10,
  MANAGER: 20,
  OWNER: 30,
};

export const accessLevel = (role) => {
  if (!role) {
    return ACCESS_ENUM.NO_ACCESS;
  }
  if (role === 'staff') {
    return ACCESS_ENUM.STAFF;
  }
  if (role === 'manager') {
    return ACCESS_ENUM.MANAGER;
  }
  if (role === 'owner' || role === 'admin') {
    return ACCESS_ENUM.OWNER;
  }
};
