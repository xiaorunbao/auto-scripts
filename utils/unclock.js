auto.waitFor();
importClass(android.provider.Settings);
importClass(android.content.Context);

const w = device.width;
const h = device.height;
const maxSwipeNum = 5;

const {   pwd } = hamibot.env;

main();

//程序主入口
function main() {
  unlock();
}


//解锁
function unlock() {
  //点亮屏幕
  device.wakeUpIfNeeded();
  if (!isLocked()) {
    toastLog("无需解锁");
    return;
  }
  device.keepScreenOn(30000);
  swipeUp();
  sleep(1000);
  if (pwd) {
    // 输入屏幕解锁密码，其他密码请自行修改
    toastLog("开始输入屏幕解锁密码");
    enterPwd();
  } else {
    toastLog("请配置手机解锁密码");
    exitShell();
  }
}

function isLocked() {
  var km = context.getSystemService(Context.KEYGUARD_SERVICE);
  return km.isKeyguardLocked() && km.isKeyguardSecure();
}

function swipeUp() {
  gesture(1000, [w / 2, h * 0.9], [w / 2, h * 0.1]);
  sleep(1000);
  if (swipeUpSuc()) {
    return;
  }
  if (swipeUpMethodOne()) {
    toastLog("方式一上滑成功");
  } else if (swipeUpMethodTwo()) {
    toastLog("方式二上滑成功");
  } else {
    toastLog("当前程序无法上滑至桌面或密码输入界面");
    exitShell();
  }
}

function swipeUpMethodOne() {
  var xyArr = [220];
  var x0 = w / 2;
  var y0 = (h / 4) * 3;
  var angle = 0;
  var x = 0;
  var y = 0;
  for (let i = 0; i < 30; i++) {
    y = x * tan(angle);
    if (y0 - y < 0) {
      break;
    }
    var xy = [x0 + x, y0 - y];
    xyArr.push(xy);
    x += 5;
    angle += 3;
  }
  
  gesture.apply(null, xyArr);
  function tan(angle) {
    return Math.tan((angle * Math.PI) / 180);
  }
  return swipeUpSuc();
}

function swipeUpMethodTwo() {
  let swipeTime = 0;
  let addTime = 20;
  for (let i = 0; i < maxSwipeNum; i++) {
    swipeTime += addTime;
    gesture(swipeTime, [w / 2, h * 0.9], [w / 2, h * 0.1]);
    sleep(1000);
    if (swipeUpSuc()) {
      return true;
    }
  }
  return false;
}

function swipeUpSuc() {
  let km = context.getSystemService(Context.KEYGUARD_SERVICE);
  if (!km.inKeyguardRestrictedInputMode()) {
    return true;
  }
  for (let i = 0; i < 10; i++) {
    if (
      !text(i).clickable(true).exists() &&
      !desc(i).clickable(true).exists()
    ) {
      return false;
    }
  }
  return true;
}

function enterPwd() {
  if (text(0).clickable(true).exists()) {
    for (var i = 0; i < pwd.length; i++) {
      a = pwd.charAt(i);
      sleep(200);
      text(a).clickable(true).findOne().click();
    }
  } else {
    for (var i = 0; i < pwd.length; i++) {
      a = pwd.charAt(i);
      sleep(200);
      desc(a).clickable(true).findOne().click();
    }
  }
}