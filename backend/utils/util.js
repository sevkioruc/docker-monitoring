module.exports.getContainersAsJSON = (containers) => {
    const containerArray = [];
    const interim = containers.split(':');
  
    for (let i = 0; i < (interim.length - 1) / 7; i++) {
      const containerObj = {};
  
      containerObj.containerID = interim[i*7].replace(/(\r\n|\n|\r)/gm, '');
      containerObj.image = interim[i*7 + 1];
      containerObj.command = interim[i*7 + 2];
      containerObj.created = interim[i*7 + 3];
      containerObj.status = interim[i*7 + 4];
      containerObj.names = interim[i*7 + 5];
      containerObj.ports = interim[i*7 + 6];
  
      containerArray.push(containerObj);
    }
  
    return containerArray;
}

module.exports.getAllImagesAsJSON = (images) => {
  const imageArray = [];
  const interim = images.split(':');
  
  for(let i = 0; i < (interim.length -1) / 5; i++) {
    const imageObj = {};

    imageObj.repository = interim[i*5].replace(/(\r\n|\n|\r)/gm, "");
    imageObj.tag = interim[i*5 + 1];
    imageObj.imageID = interim[i*5 +2];
    imageObj.created = interim[i*5 +3];
    imageObj.size = interim[i*5 +4];

    imageArray.push(imageObj);
  }
  
  return imageArray;
}
