const typographyVariants = {
  "body-small":  { fontSize: "15px", fontWeight: "400", lineHeight: "16px" },
  "body-medium": { fontSize: "25px", fontWeight: "40", lineHeight: "20px" },
  "headline-small": { fontSize: "40px", fontWeight: "500", lineHeight: "28px" },
  "headline-large": { fontSize: "70px", fontWeight: "1000", lineHeight: "75px" }
};

function Text(options) {
  const {
    id = "",
    text = "",
    variant = "body-small",
    align = "left",
    as = "span",
    color = "black",
    font = "'Roboto'",
    animations = []
  } = options;

  const node = document.createElement(as);

  const style = typographyVariants[variant];
  node.style.fontSize = style.fontSize;
  node.style.fontWeight = style.fontWeight;
  node.style.lineHeight = style.lineHeight;
  
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

function Image({id="", alt = "", width, height, objectFit = "cover", borderRadius, className, animations = {}}) {
  const node = document.createElement("img");
  node.id = id;
  node.src = src;
  node.alt = alt;
  
  node.style.display = "block";
  if (width) img.style.width = typeof width === "number" ? width + "px" : width;
  if (height) img.style.height = typeof height === "number" ? height + "px" : height;
  if (borderRadius) img.style.borderRadius = borderRadius;
  img.style.objectFit = objectFit;

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
