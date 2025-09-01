/*
Widgets implemented so far:
- Text
- Button
- Row
- Column
- Image
- SizedBox (altho it's kinda not working?)
- Line (---------------------)
*/

const typographyVariants = {
  "body-small":  { fontSize: "23px", fontWeight: "40", lineHeight: "30px" },
  "body-medium": { fontSize: "20px", fontWeight: "50", lineHeight: "25px" },
  "headline-small": { fontSize: "30px", fontWeight: "100000", lineHeight: "30px" },
  "headline-large": { fontSize: "70px", fontWeight: "1000", lineHeight: "75px" }
};

function isMobile() {
  return window.innerWidth <= 768;
}

function Text(options) {
  const {
    id = "",
    text = "",
    variant = "body-small",
    align = "left",
    as = "span",
    color = "black",
    font = "Georgia",
    animations = []
  } = options;

  const node = document.createElement(as);

  const style = typographyVariants[variant];
  node.style.fontSize = style.fontSize;
  node.style.fontWeight = style.fontWeight;
  node.style.lineHeight = style.lineHeight;
  node.style.textAlign = align;
  
  node.style.color = color;
  node.style.fontFamily = font;

  node.textContent = text;

  if (id) node.id = id;

  animations.forEach(anim => node.classList.add(`animate-${anim}`));

  return node;
}

function Button(options) {
  const {
    id = "",
    child,
    className,
    onClick = () => console.log("Button Pressed"),
    margin,
    padding = "10px 20px",
    border = "none",
    borderRadius = 8,
    width,
    height,
    animations = [],
    backgroundColor = "white"
  } = options;
  const node = document.createElement("button");
  node.type = "button";
  node.id = id;
  node.onclick = onClick 
  if (className) node.className = className;

  if (margin) node.style.margin = margin;
  if (padding) node.style.padding = padding;
  node.style.border = border;
  node.style.borderRadius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
  if (width) node.style.width = width;
  if (height) node.style.height = height;
  if (backgroundColor) node.style.backgroundColor = backgroundColor;
  

  if (child) node.append(child);
  
  animations.forEach(anim => node.classList.add(`animate-${anim}`));

  return node;
}

function Image({id="", src, alt = "", width, height, objectFit = "cover", borderRadius, className, animations = {}}) {
  const node = document.createElement("img");
  node.id = id;
  node.src = src;
  node.alt = alt;
  
  node.style.display = "block";
  if (width) node.style.width = typeof width === "number" ? width + "px" : width;
  if (height) node.style.height = typeof height === "number" ? height + "px" : height;
  if (borderRadius) node.style.borderRadius = borderRadius;
  node.style.objectFit = objectFit;

  if (className) node.classList.add(className);
  
  return node; 
}

function Row({ children = [], gap = "10px", align = "center", justify = "center"}) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.flexDirection = "row";
  node.style.gap = gap; // space between elements
  node.style.alignItems = align; // vertical alignment
  node.style.justifyContent = justify; // horizontal alignment

  children.forEach(child => node.append(child));
  
  setTimeout(() => {
    let maxHeight = 0;
    children.forEach(child => {
      const rect = child.getBoundingClientRect();
      if (rect.height > maxHeight) maxHeight = rect.height;
    });
   children.forEach(child => {
      if (child.tagName === "IMG") {
        child.style.maxHeight = maxHeight + "px";
      }
    });
  }, 0);
  return node;
}

function Column({ children = [], gap = "10px", align = "center", justify = "center"}) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.flexDirection = "column";
  node.style.gap = gap;               // space between elements
  node.style.alignItems = align;      // horizontal alignment
  node.style.justifyContent = justify; // vertical alignment

  children.forEach(child => node.append(child));

  return node;
}

function Line({
  width = "100%",
  height = "2px",
  color = "#ccc",
  margin = "10px 0"
}) {
  const node = document.createElement("div");
  node.style.width = width;
  node.style.height = height;
  node.style.backgroundColor = color;
  node.style.margin = margin;
  return node;
}

function SizedBox({
  child,
  width,
  height,
  color = "white",
  margin,
  align
}) {
  const node = document.createElement("div");
  node.style.width = width;
  node.style.height = height;
  node.style.backgroundColor = color;
  
  if (margin) node.style.margin = margin;
  if (child) node.appendChild(child);
  return node;
}
