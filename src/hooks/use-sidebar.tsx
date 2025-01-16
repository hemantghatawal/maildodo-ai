"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { useChatContext } from "@/context/user-chat-context";
import {
  onGetConversationMode,
  onToggleRealtime,
} from "@/actions/conversation";
import { useClerk } from "@clerk/nextjs";


const useSidebar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatRoom } = useChatContext();

  const onActiveRealTime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );

      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast({
          title: "Success",
          description: realtime.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();
  const { signOut } = useClerk();

  const onSignOut = () => signOut(() => router.push("/"));

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut, 
    realtime,
    onActiveRealTime,
    chatRoom,
    loading,
  };
};

export default useSidebar;
