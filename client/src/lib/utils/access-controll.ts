import { useAuth } from "@/lib/hooks/use-auth";

export const userHasAnyOf = (roles?: Set<string>): boolean => {
  const { roles: userRoles } = useAuth();

  if (!roles) {
    return true;
  }

  for (const role of userRoles)
    if (role === "admin") return true
    else if (roles.has(role)) return true;
  
  return false;
}