import * as Components from './components.js';

//modify these to add more pages
//ensure each title has a coressponding page (if no file yet, just use an empty string)
//two buttons with identical names will not be able to lead to different page_files
const pages_titles = ["Home", "Leadership", "Invitational", "Gallery", "Sponsors"];
const page_files = ["index.js", "contact.js", "", "photos.js", "sponsors.js"];

//do not modify unless you know what you're doing
const navbar_widgets = ["padding", "logo", "SWHS text", ...pages_titles, "padding"]

//builds one widget:
function BuildNavBarWidget(widget_str, selected) {
  switch (widget_str) {
    case "padding":
      return SizedBox({width: "0.5em", backgroundColor: "transparent"});
    case "logo":
      return Components.Image({
        src: "images/Bobcats_Logo_prev_ui.png",
        alt: "The Logo and Mascot of South Windsor High School",
        height: "1em",
      });
    case "SWHS text":
      return Components.Text({
        text: "SWHS Science Olympiad",
        variant: "body-medium",
        whiteSpace: "nowrap",
        color: "white",
      });
    default: //if it isnt any of the above, the str must be a button name
      return Components.Button({
        child: Components.Text({
          color: (widget_str==selected) ? "white" : "",
          text: widget_str,
          variant: "navbar",                  
          align: "center"
        }),
        backgroundColor: "transparent",
        borderRadius: "0px",
        padding: "1 10px",
        margin: "0px",
        height: "1em",
        align: "center",
        onClick: () => window.location.href = page_files[pages_titles.indexOf(widget_str)]
      });
  }
}
export function BuildNavBar(selected) {
  return Components.SizedBox({
    color: "rgba(32, 32, 32, 0.9)",
    margin: "0px",
    child: Row({
      children: navbar_widgets.forEach(widget => BuildNavBarWidget(widget, selected)),
      justify: "left",
      gap: "0.5em"
    })
  });
}
