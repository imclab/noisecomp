'use strict';

var indexedToRGBA = function(index, colors) {
  if (colors === undefined) 
    colors = [
    [255,255,255,255],   // 0 white
    [0,0,0,255]          // 1 black
  ];

  return colors[index];
};

module.exports.showCanvas = function(sourceData, width, height, convert) {
  var canvases = document.getElementsByTagName('canvas');
  var canvas = (canvases.length > 0) ? canvases[0] : document.createElement('canvas');

  if (convert === undefined) {
    if (sourceData instanceof Uint8Array)
      convert = indexedToRGBA;
  }

  canvas.setAttribute('style', 'border: 1px solid black; width: '+width+'px; height: '+height+'px;');
  var context = canvas.getContext('2d');
  var imageData = context.createImageData(width, height);
  var rgbaData = imageData.data;

  var i = sourceData.length;
  while(i--) {
    var rgba = convert(sourceData[i]);

    rgbaData[i * 4 + 0] = rgba[0];
    rgbaData[i * 4 + 1] = rgba[1];
    rgbaData[i * 4 + 2] = rgba[2];
    rgbaData[i * 4 + 3] = rgba[3];
  }

  context.putImageData(imageData, 0, 0);

  document.body.appendChild(canvas);
};

module.exports.fillXY = function(data, width, height, cb) {
  var n = data.length;
  while (n-- > 0) {
    var x = n % width;
    var y = n / width;

    data[n] = cb(x, y);
  }
};

module.exports.gradient = function(opts) {
  return function(x, y) {
    var dx = x - 0;
    var dy = y - 1;
    return dx + dy;
  };
};

window.noisecomp = module.exports; // for debugging

