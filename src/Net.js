class Net {
  constructor(gameCanvas, width, height, x_position, netColor) {
    this.gameCanvas = gameCanvas;
    this.width = width;
    this.height = height;
    this.x_position = x_position;
    this.netElement = document.createElement('div');
    this.netElement.classList.add('net');
    this.netColor = netColor;
    this.addNet();
  }
  addNet() {
    this.netElement.style.bottom = `0px`;
    this.netElement.style.left = `${this.x_position}px`;
    this.netElement.style.width = `${this.width}px`;
    this.netElement.style.height = `${this.height}px`;
    this.netElement.style.background = this.netColor;
    this.netElement.style.position = 'absolute';
    this.gameCanvas.appendChild(this.netElement);
  }
}
