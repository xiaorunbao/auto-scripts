auto.waitFor();
importClass(android.provider.Settings);
importClass(android.content.Context);

const w = device.width;
const h = device.height;
const maxSwipeNum = 5;

const {pwd} = hamibot.env;

mainEntrence();

//程序主入口
function mainEntrence(){
  // 解锁
  unlock();
   sleep(1000);
 // 打开支付宝
  openAlipay();
  getAlipayPoints();
  exit();
}

//蚂蚁会员积分
function getAlipayPoints(){
  // 首页有我的小程序
  click("我的",1);
  sleep(2000);
  // 个人信息页面被切成了5大部分区域，会员和商家服务在一个组件下，获取不到desc和text了
  setScreenMetrics(w,h);
  // 区域bands值为（0,431,1080,732）
  click(540,500);
  toastLog("等待个人信息页面加载...")
  sleep(5000);

  if(!text("全部领取").exists()){
    toastLog("全部领取还未加载出来，再等三秒钟")
    sleep(3000)
  }
  text("全部领取").findOne().click();

  sleep(2000);
  toastLog("退出程序");
  back();
  sleep(2000);
  back();
}


//解锁
function unlock(){
  //点亮屏幕
  device.wakeUpIfNeeded();
  if (!isLocked()) {
    toastLog("无需解锁");
    return;
  }
  device.keepScreenOn(20000);
  swipeUp();
  sleep(1000);
  if (pwd) {
    // 输入屏幕解锁密码，其他密码请自行修改
    toastLog("开始输入屏幕解锁密码")
    enterPwd();
  } else {
    toastLog("请配置手机解锁密码");
    exitShell();
  }
}

function openAlipay(){
    launchApp("支付宝");
    toastLog("等待支付宝启动");
    sleep(3000);
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
    var y0 = h / 4 * 3;
    var angle = 0;
    var x = 0;
    var y = 0;
    for (let i = 0; i < 30; i++) {
        y = x * tan(angle);
        if ((y0 - y) < 0) {
            break;
        }
        var xy = [x0 + x, y0 - y];
        xyArr.push(xy);
        x += 5;
        angle += 3;
    }
    gesture.apply(null, xyArr);
    function tan(angle) {
        return Math.tan(angle * Math.PI / 180);
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
    // 判断是否在锁屏界面
    if (!km.inKeyguardRestrictedInputMode()) {
        return true;
    }
    for (let i = 0; i < 10; i++) {
        if (!text(i).clickable(true).exists() && !desc(i).clickable(true).exists()) {
            return false;
        }
    }
    return true;
}


function enterPwd() {
    //点击
    toastLog("enterPwd开始执行");
    if (text(0).clickable(true).exists()) {
        for (var i = 0; i < pwd.length; i++) {
            a = pwd.charAt(i)
            sleep(200);
            text(a).clickable(true).findOne().click()
        }
    } else {
        for (var i = 0; i < pwd.length; i++) {
            a = pwd.charAt(i)
            sleep(200);
            desc(a).clickable(true).findOne().click()
        }
    }
}
