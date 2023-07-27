import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { useEffect } from 'react';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const CornerstoneViewer = ({id}) => {
  cornerstoneTools.init({
    globalToolSyncEnabled: true,
  });

  const WwwcTool = cornerstoneTools.WwwcTool;
  const PanTool = cornerstoneTools.PanTool;
  const PanMultiTouchTool = cornerstoneTools.PanMultiTouchTool;
  const ZoomTool = cornerstoneTools.ZoomTool;
  const ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
  const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;

  cornerstoneTools.addTool(PanTool);
  cornerstoneTools.addTool(ZoomTool);
  cornerstoneTools.addTool(WwwcTool);
  cornerstoneTools.addTool(PanMultiTouchTool);
  cornerstoneTools.addTool(ZoomTouchPinchTool);
  cornerstoneTools.addTool(ZoomMouseWheelTool);

  cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 4 });
  cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 2 });
  cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('PanMultiTouch', {});
  cornerstoneTools.setToolActive('ZoomMouseWheel', {});
  cornerstoneTools.setToolActive('ZoomTouchPinch', {});

  useEffect(() => {
    const canvas = document.getElementById('canvas');

    cornerstone.enable(canvas, {
      renderer: 'webgl',
    });

    const serverUrl = 'https://goldfish-app-ofd38.ondigitalocean.app';
    const imageId = `wadouri:${serverUrl}/dicom/${id}`;
    cornerstone.loadImage(imageId).then((image) => {
      cornerstone.displayImage(canvas, image);
    });
  }, []);

  return (
    <div className="flex h-screen items-center flex-col justify-center">
      <div id="canvas" className="flex " style={{ width: '80%', height: '500px' }}></div>
    </div>
  );
};

export default CornerstoneViewer;
