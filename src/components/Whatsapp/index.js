import React, { useEffect } from "react";

const WhatsAppChatWidget = () => {
  useEffect(() => {
    const url =
      "https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?82294";
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url;

    const options = {
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#00e785",
        ctaText: "Chat with us",
        borderRadius: "25",
        marginLeft: "0",
        marginRight: "20",
        marginBottom: "20",
        ctaIconWATI: false,
        position: "right",
      },
      brandSetting: {
        brandName: "RIE 2025",
        brandSubTitle: "undefined",
        brandImg:
          "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
        welcomeText: "Hi there!\nHow can I help you?",
        messageText: "Hello, %0A I have a question about ",
        backgroundColor: "#00e785",
        ctaText: "Chat with us",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "9663038328",
      },
    };

    // Function to initialize the widget
    const initializeWidget = () => {
      if (window.CreateWhatsappChatWidget) {
        window.CreateWhatsappChatWidget(options);
      } else {
        console.error("CreateWhatsappChatWidget is not defined");
      }
    };

    script.onload = initializeWidget;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything in the DOM
};

export default WhatsAppChatWidget;
