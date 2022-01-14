auto.waitFor();
importPackage(android.content);

function isOpend() {
  var wifiManager = context.getSystemService(Context.WIFI_SERVICE);
  return wifiManager.isWifiEnabled();
}

function open() {
  const w = device.width;
  const h = device.height;
  setScreenMetrics(w, h);
  var intent = new Intent();
  intent.setAction("android.settings.WIFI_SETTINGS");
  app.startActivity(intent);
  sleep(2000);
  click(540, 500);
}

function exitRecent() {
  toastLog("退出程序");
  recents();
  sleep(1000);
  swipe(400, 1300, 0, 1300, 300);
  sleep(500);
  home();
  exit();
}

if (isOpend()) {
  log("wifi is opend");
} else {
  log("wifi is closed");
  open();
  sleep(2000);
  exitRecent();
}

