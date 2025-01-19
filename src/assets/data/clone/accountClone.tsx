import { ConnectionRequest } from "@/layouts/ProfileLayout";
import { useAuthContext } from "@/context/useAuthContext";
import MyConnections from "./MyConnections";
import ConnectionsStatus from "./ConnectionsStatus";
import Followers from "@/app/(social)/feed/(container)/home/components/Followers";
import SuggestedConnections from "./SuggestedConnections";

const accountClone = () => {
  return (
    <>
     <MyConnections/>
   <ConnectionsStatus/>
     <ConnectionRequest/>
     <SuggestedConnections/>

    </>
  )
}

export default accountClone;
