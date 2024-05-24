import * as React from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";

export const Nav = ({setDropdownData ,handleDropdownSelect}) => {

  return (
    <TopNavigation
      identity={{
        href: "#",
        title: "Service",
        logo: {
          src: "https://cloudscape.design/logo-small-top-navigation.svg",
          alt: "Service"
        }
      }}
      utilities={[
        {
          type: "button",
          text: "Link",
          href: "https://example.com/",
          external: true,
          externalIconAriaLabel: " (opens in a new tab)"
        },
        {
          type: "button",
          iconName: "notification",
          title: "Notifications",
          ariaLabel: "Notifications (unread)",
          badge: true,
          disableUtilityCollapse: false
        },
        {
          type: "menu-dropdown",
          iconName: "settings",
          ariaLabel: "Settings",
          title: "Settings",
          onItemClick: (e) => handleDropdownSelect(e),
          items: [
            {
              id: "users",
              text: "Users",
            },
            {
              id: "product",
              text: "Product"
            },
            {
              id: "orders",
              text: "Orders",
            },
            {
              id: "settings",
              text: "Settings",
            }
          ]
        },
        {
          type: "menu-dropdown",
          text: "Customer Name",
          description: "email@example.com",
          iconName: "user-profile",
          items: [
            { id: "profile", text: "Profile" },
            { id: "preferences", text: "Preferences" },
            { id: "security", text: "Security" },
            {
              id: "support-group",
              text: "Support",
              items: [
                {
                  id: "documentation",
                  text: "Documentation",
                  href: "#",
                  external: true,
                  externalIconAriaLabel:
                    " (opens in new tab)"
                },
                { id: "support", text: "Support" },
                {
                  id: "feedback",
                  text: "Feedback",
                  href: "#",
                  external: true,
                  externalIconAriaLabel:
                    " (opens in new tab)"
                }
              ]
            },
            { id: "signout", text: "Sign out" }
          ]
        }
      ]}
    >egehfg</TopNavigation>
  );
}