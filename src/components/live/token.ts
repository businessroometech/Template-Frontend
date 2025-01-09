import { useAuthContext } from '@/context/useAuthContext';
import ZegoUIKitPrebuilt from '@zegocloud/zego-uikit-prebuilt';

const {} = useAuthContext();
 
const appID = "1338635336";
const serverSecret = "3b41a1afc92a95eadb2fc5fa7b68f44c";
const roomID = "123"
const userID = user?.id;
const userName = user?.firstName + " " + user?.lastName;

export const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);