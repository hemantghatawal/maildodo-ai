import CalIcon from "@/assets/icons/cal-icon";
import ChatIcon from "@/assets/icons/chat-icon";
import DashboardIcon from "@/assets/icons/dashboard-icon";
import EmailIcon from "@/assets/icons/email-icon";
import HelpDeskIcon from "@/assets/icons/help-desk-icon";
import IntegrationsIcon from "@/assets/icons/integrations-icon";
import SettingsIcon from "@/assets/icons/settings-icon";
import StarIcon from "@/assets/icons/star-icon";
import TimerIcon from "@/assets/icons/timer-icon";

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "dashboard",
  },
  {
    label: "Conversations",
    icon: <ChatIcon />,
    path: "conversation",
  },
  {
    label: "Integrations",
    icon: <IntegrationsIcon />,
    path: "integration",
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    path: "settings",
  },
  {
    label: "Appointments",
    icon: <CalIcon />,
    path: "appointment",
  },
  {
    label: "Email Marketing",
    icon: <EmailIcon />,
    path: "email-marketing",
  },
];

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "unread",
    icon: <EmailIcon />,
  },
  {
    label: "all",
    icon: <EmailIcon />,
  },
  {
    label: "expired",
    icon: <TimerIcon />,
  },
  {
    label: "starred",
    icon: <StarIcon />,
  },
];

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "help desk",
  },
  {
    label: "questions",
  },
];

export const APPOINTMENT_TABLE_HEADER = [
  "Name",
  "RequestedTime",
  "Added Time",
  "Domain",
];

export const EMAIL_MARKETING_HEADER = ["Id", "Email", "Answers", "Domain"];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "chat",
    icon: <ChatIcon />,
  },
  {
    label: "helpdesk",
    icon: <HelpDeskIcon />,
  },
];
