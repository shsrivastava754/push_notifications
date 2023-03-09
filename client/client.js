const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const public_vapid_key = "BJyonnOO4w01WTxUCFNV0L-cw1LXK4NweHULjQDHD7hkAe7BvJ5gL_qVNu6BgCkkdzhmL5vdQFJJJhxC2CGyUfY";
const sendBtn = document.querySelector(".sendBtn");

const send = async () => {
  // register service worker
  const register = await navigator.serviceWorker.register("/helper.js", {
    scope: "/",
  });

  // register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(public_vapid_key),
  });

  // send push i.e. send a POST request to the subscribe url
  await fetch("/subscribe", {
    method: "post",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
};

if ("serviceWorker" in navigator) {
  sendBtn.addEventListener("click", () => {
    send().catch((error) => console.error(error));
  });
}
