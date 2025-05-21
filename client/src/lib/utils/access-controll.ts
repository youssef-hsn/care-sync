import { useIdentityStore } from "@/lib/stores/identity.store";

export const userHasAnyOf = (roles?: string[]): boolean => {
  const userRoles = useIdentityStore.getState().roles;

  if (!roles) {
    return true;
  }

  for (const role of userRoles)
    if (role === "admin") return true
    else if (roles.includes(role)) return true;
  
  return false;
}