module.exports.getAllContainersAsJSON = (containers) => {
    const containerArray = [];
    const interim = containers.split(':');
  
    for (let i = 0; i < (interim.length - 1) / 7; i++) {
      const containerObj = {};
  
      containerObj.containerID = interim[i*7].replace(/(\r\n|\n|\r)/gm, "");
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
