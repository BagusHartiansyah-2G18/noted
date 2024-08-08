import React, { useRef, useEffect} from 'react';
import WebViewer from '@pdftron/webviewer'; 
 
export default function PVpdf({ onOff, start, initialDoc }) { 
  const viewer = useRef(null);  
  const loadDoc=()=>{
    WebViewer.WebComponent(
      {
        path: '/webviewer/lib',
        // initialDoc: '/files/PDFTRON_about.pdf',
        initialDoc,

        licenseKey: 'demo:1720581293305:7f8256100300000000972bc1041c69be983d0b9c8a883b2940788d06e2',  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }  
  useEffect(() => {
    if(onOff){
      loadDoc();
    }
  }, []); 
  if(start.start){ 
    start.start=false;
    loadDoc();
  } 
  return (
    <div className={(onOff?'scroll-600':'scroll-10 hidden')}> 
      <div className="webviewer" ref={viewer}></div>
    </div> 
  );
}
 