export const BASE_URL = "https://dev-api.fluteconnect.com";
export const API_ENDPOINTS = {
  //*********************************** Auth **************************************** //
  generateOtp: "/api/v1/consultant/auth/generate-otp",
  login: "/api/v1/consultant/auth/login",
  register: "/consultant/profile/register",
  logout: "/api/v1/consultant/auth/logout",
  //*********************************** App ****************************************** //
  galleryPhotosList: "/coach/profile/gallery",
  imageUpdateRequest: "/coach/profile/image-update-request/",
  imageUpdateRequestCancel: "/coach/profile/reject-image-request/",
  goLiveConsultants: "/api/v1/live-stream/stream/",
  liveSessionList: "/api/v1/live-stream/stream/",
  getConsultantOptionData: "/api/v1/consultant/profile/constants/",
  updateLiveStreamStatus: "/api/v1/live-stream/stream/",
  UpDateProfile: "/api/v1/consultant/profile",
  userDetails: "/api/v1/consultant/profile/",

  uploadProfileImage: "/coach/profile/upload-profile",
  coachPriceschange: "/coach/profile/add-coach-price",
  FollowersList: "api/v1/consultant/profile/follower",
  ordersList:
    "api/v1/consultant/management/order/get-consultant-orders?consultant_id=",
  callingHistory: "/coach-management/order/get-coach-orders",
  CoachWaitingList: "/coach-management/order/waiting-request?coach_id=",
  CoachReviewsList: "/coach-rating/get_all_reviews_on_coach/",
  posts: "/posts",

  //*********************************** Meta ****************************************** //
  coachMenu: "/meta/menu_items/get_all/0",
  coachMenuSetting: "/meta/menu_items/get_all/9",
};
