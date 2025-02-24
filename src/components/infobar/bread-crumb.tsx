"use client";
import useSidebar from "@/hooks/use-sidebar";
import React from "react";
import { Loader } from "../loader";
import { Switch } from "../ui/switch";

type Props = {};

function showPageInfo(page: string | undefined) {
  switch (page) {
    case "settings":
      return "Manage you account settings, preferences and integrations";
    case "dashboard":
      return "A detailed overview of your metrics, usage, customers and more";
    case "appointment":
      return "View and edit all your appointments";
    case "email-marketing":
      return "Send bulk emails to your customers";
    case "integration":
      return "Connect third-party applications into MailDodo-AI";
    default:
      return "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.";
  }
}

const BreadCrumb = (props: Props) => {
  const { chatRoom, expand, loading, onActiveRealTime, onExpand, page, realtime } =
    useSidebar();
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page === "conversation" && chatRoom && <Loader loading={loading} className="p-0 inline">
          <Switch defaultChecked={realtime}
            onClick={(e) => onActiveRealTime(e)}
            className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
          />
          </Loader>}
        <p className="text-gray-500 text-sm">{showPageInfo(page)}</p>
      </div>
    </div>
  );
};

export default BreadCrumb;
