
function exitRecent(){
    toastLog("退出程序");
    recents();
    sleep(1000);
    swipe(400, 1300, 0, 1300, 300);
    sleep(500);
    home();  
    exit();
  }