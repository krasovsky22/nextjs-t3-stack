import { useSession } from "next-auth/react";

export default function ProtectedPage() {
  const { data: sessionData } = useSession();
//   if(sessionData) {
//     signOut();
//   }
  // If no session exists, display access denied message
  if (!sessionData) {
    return <div>Access Denied</div>;
  }

  // If session exists, display content
  return <div>Protected Page</div>;
}
