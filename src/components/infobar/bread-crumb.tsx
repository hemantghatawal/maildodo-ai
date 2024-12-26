"use client";
import React from "react";

type Props = {};

function showPageInfo(page: string) {
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
      return "Connect third-party applications into Maildodo-AI";
    default:
      return "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.";
  }
}

const BreadCrumb = (props: Props) => {
  // WIP: Set up use sidebar hook for real time chat and chatbot stuff
//   WIP: setup the description and switch component
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">Title</h2>
        <p className="text-gray-500 text-sm">{showPageInfo("")}</p>
      </div>
    </div>
  );
};

export default BreadCrumb;
