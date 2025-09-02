import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

// The function is now renamed to useStoreUserEffect
export function useStoreUserEffect() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  // Store the user's database ID.
  const [userId, setUserId] = useState(null);

  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // If the user is not authenticated, we don't need to do anything.
    if (!isAuthenticated) {
      return;
    }

    // This async function will store the user in the database.
    async function createUser() {
      // The `storeUser` mutation gets user info from the session on the backend.
      const id = await storeUser();
      setUserId(id);
    }
    createUser();

    // Cleanup function to reset the user ID when the component unmounts.
    return () => setUserId(null);
  }, [isAuthenticated, storeUser, user?.id]);

  // The app is "loading" if Convex is loading OR if we are authenticated
  // but haven't stored the user in our database yet.
  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}