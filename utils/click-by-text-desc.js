function clickByTextDesc(energyType, paddingY) {
  var clicked = false;
  if (descEndsWith(energyType).exists()) {
    descEndsWith(energyType)
      .find()
      .forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() < 0 || posb.centerY() - paddingY < 0) {
          return false;
        }
        var str = pos.id();
        if (str != null) {
          if (str.search("search") == -1) {
            click(posb.centerX(), posb.centerY() - paddingY);
            clicked = true;
          }
        } else {
          click(posb.centerX(), posb.centerY() - paddingY);
          clicked = true;
        }
        sleep(200);
      });
  }

  if (textEndsWith(energyType).exists() && clicked == false) {
    textEndsWith(energyType)
      .find()
      .forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() < 0 || posb.centerY() - paddingY < 0) {
          return false;
        }
        var str = pos.id();
        if (str != null) {
          if (str.search("search") == -1) {
            click(posb.centerX(), posb.centerY() - paddingY);
            clicked = true;
          }
        } else {
          click(posb.centerX(), posb.centerY() - paddingY);
          clicked = true;
        }
        sleep(200);
      });
  }

  return clicked;
}
