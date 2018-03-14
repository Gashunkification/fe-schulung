const classConfig = {
  CLOSED: 'col-xs-2',
  OPENED: 'col-xs-10',
};

const changeView = (open, close) => {
  open.classList.add(classConfig.OPENED);
  open.classList.remove(classConfig.CLOSED);

  close.classList.add(classConfig.CLOSED);
  close.classList.remove(classConfig.OPENED);
};

/**
 * This class is responsible for the mobile behaviour of the app
 *
 * @class MobileController
 */
class MobileController {
  constructor(leftId, rightId) {
    this.leftSide = document.getElementById(leftId);
    this.rightSide = document.getElementById(rightId);

    this.leftSide.on('click', this.openCurrentView.bind(this));
    this.rightSide.on('click', this.openForecastView.bind(this));
  }

  openCurrentView() {
    changeView(this.leftSide, this.rightSide);
  }

  openForecastView() {
    changeView(this.rightSide, this.leftSide);
  }
}

const initMobileListener = (leftId, rightId) => {
  const mc = new MobileController(leftId, rightId);
  return mc;
};

export default initMobileListener;
