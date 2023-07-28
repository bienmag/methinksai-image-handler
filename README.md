# methinksai-image-handler

It is a small image handling application created with TurboRepo. 
A simple React app serves as the client. The app allows you to view a list of images, with tree images fetched from an API and Dicom images loaded from my server.
Each image page features a comment section, which utilizes a simple Express server and MongoDB for data storage. I've also implemented socket communication to ensure comments update instantly.
For Dicom image display, I've used Cornerstone.js, enabling features like a zoom tool and contrast adjustment. I added Cornerstone at the last minute, so there's definitely room for improvement, such as expanding the toolset and making the UI more responsive.
I also added some unit tests for the frontend using Vitest. While most tests are passing, one test is currently failing (as expected) due to recent changes in the List component.

To install the project copy the repo and install dependencies. ```yarn dev``` from the root to run both client and server. 
```yarn test``` from apps/client to run tests. 
 
