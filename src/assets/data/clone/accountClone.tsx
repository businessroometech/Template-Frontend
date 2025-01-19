import { ConnectionRequest } from "@/layouts/ProfileLayout";
import { useAuthContext } from "@/context/useAuthContext";
import MyConnections from "./MyConnections";
import ConnectionsStatus from "./ConnectionsStatus";
import Followers from "@/app/(social)/feed/(container)/home/components/Followers";

const accountClone = () => {
  return (
    <>
     <MyConnections/>
   <ConnectionsStatus/>
     <ConnectionRequest/>
     <Followers/>
    </>
  )
}

export default accountClone;
