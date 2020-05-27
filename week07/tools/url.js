var dataList = JSON.parse("<%-JSON.stringify(dataList)%>");
let iframe = document.createElement("iframe");
iframe.width = "70%";
iframe.height = "600px";
document.body.innerHTML = "";
document.body.appendChild(iframe);

const happen = (element, event) => {
  return new Promise((resolve) => {
    let handler = () => {
      resolve();
      element.removeEventListener(event, handler);
    };
    element.addEventListener(event, handler);
  });
};

void (async function () {
  for (let item of dataList) {
    iframe.src = item.url;
    await happen(iframe, "load");
  }
})();