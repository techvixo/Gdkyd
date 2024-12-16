const WebHome = require('./webHome.model');

// General Service for initializing WebHome if not created
const initializeWebHome = async () => {
  let webHome = await WebHome.findOne();
  if (!webHome) {
    webHome = await WebHome.create({});
  }
  return webHome;
};

// General Service to get WebHome data
const getWebHome = async () => {
  return await WebHome.findOne();
};

// Service to create featured_video
const createFeaturedVideo = async (left_side_video_url, right_side_video_url) => {
  const webHome = await initializeWebHome(); 
  const featured_video = {...webHome.featured_video};
  if(left_side_video_url && right_side_video_url){
    featured_video.left_side_video = left_side_video_url
    featured_video.right_side_video = right_side_video_url
  }else if(left_side_video_url){
    featured_video.left_side_video = left_side_video_url
  }else if(right_side_video_url){
    featured_video.right_side_video = right_side_video_url
  }

  webHome.featured_video = featured_video
  await webHome.save();
  return webHome;
};

// Service to delete featured_video
const deleteFeaturedVideo = async (side) => {
  const webHome = await initializeWebHome(); 
  if(side === 'left_side'){
    webHome.featured_video.left_side_video = null
  }else if(side === 'right_side'){
    webHome.featured_video.right_side_video = null
  }else{
    webHome.featured_video.left_side_video = null
    webHome.featured_video.right_side_video = null
  }

  await webHome.save();
  return webHome;
};

// Service to create featured_video
const createCustomPartsVideo = async (video_url) => {
  const webHome = await initializeWebHome(); 
  webHome.custom_parts_video = video_url
  await webHome.save();
  return webHome;
};

// Service to delete featured_video
const deleteCustomPartsVideo = async () => {
  const webHome = await initializeWebHome(); 
  webHome.custom_parts_video = null
  await webHome.save();
  return webHome;
};

// Service to add a new item to cnc_machine_part array
const addCncMachinePart = async (partData) => {
  const webHome = await initializeWebHome(); 
  webHome.cnc_machine_parts.push(partData)
  await webHome.save()
  return webHome;
};

// Service to delete an item from cnc_machine_part array by part ID
const deleteCncMachinePart = async (partId) => {
  const webHome = await initializeWebHome(); 
  webHome.cnc_machine_parts = webHome.cnc_machine_parts.filter(part => !part._id.equals(partId))
  await webHome.save();
  return webHome;
};

// service for update cnc machine part
const updateCncMachinePart = async (partId, partData) => {
  const webHome = await WebHome.findOneAndUpdate(
    { 'cnc_machine_parts._id': partId },
    {
      $set: {
        'cnc_machine_parts.$': partData,
      },
    },
    { new: true } // Return the updated document
  );

  return webHome;
};

module.exports = {
  initializeWebHome,
  getWebHome,
  createFeaturedVideo,
  deleteFeaturedVideo,
  createCustomPartsVideo,
  deleteCustomPartsVideo,
  addCncMachinePart,
  deleteCncMachinePart,
  updateCncMachinePart,
};
