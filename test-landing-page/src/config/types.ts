export interface SystemParams {
    _id: string;
    pInterfaceId: string;
    pRoleId: string;
    relationCode: string;
    relationName: string;
    __v: number;
    createdAt: string;
    defaultAuthority: number;
    isDefault: boolean;
    updatedAt: string;
  }
  
  export interface Login {
    otp: string;
    individualId: string;
    indLanPref: string;
    indFingerPrint: string;
    pInterfaceId: string;
    pRoleId: string;
    pRelationId: string;
  }
  
  export interface Signup {
    individualId: string;
    indLanPref: string;
    indFingerPrint: string;
    pInterfaceId: string;
    pRoleId: string;
    pRelationId: string;
    otp: string;
    pInterface: string;
    isBusinessUser: boolean;
  }
  
  export interface Dashboard {
    _id: Id;
    data: DashboardCategory[];
  }
  
  export interface Id {
    primaryCategoryId: string;
    primaryCategoryName: string;
    secondaryCategoryLevel1Id: string;
    secondaryCategoryLevel1Name: string;
    secondaryCategoryLevel2Id: string;
    secondaryCategoryLevel2Name: string;
  }
  
  export interface DashboardCategory {
    totalComments: string | number;
    _id: string;
    videoId: string;
    shortVideoId: string;
    hastags: string[];
    desc: string;
    avgRating: number;
    cdnVideoPath: string;
    cdnThumbPath: string;
    totalViewCount: number;
    totalLikes: number;
    totalDislikes: number;
    userDetails: UserDetails;
    primaryCategoryId: string;
    secondaryCategoryLevel1Id: string;
    secondaryCategoryLevel2Id: string;
    primaryCategoryName: string;
    secondaryCategoryLevel1Name: string;
    secondaryCategoryLevel2Name: string;
    isLiked: boolean;
  }
  
  export interface UserDetails {
    firstName: string;
    lastName: string;
    userName: string;
    pRoleId: string;
    pRelationId: string;
    userCompositeId: string;
    isFollowed: boolean;
    isOwnProfile: boolean;
    indPic: IndPic;
  }
  
  export interface Profile {
    _id: string;
    indEmail: string;
    indFirstName: string;
    indLastName: string;
    indGender: string;
    indLanPref: string;
    indContentPref: string;
    indPic: IndPic;
    updatedAt: string;
    bio: string;
    isBusinessUser: boolean;
    desc: string;
    indDob: string;
    userName: string;
    __v: number;
    totalPublishedPosts: number;
    totalUnpublishedPosts: number;
    totalFollowers: number;
    totalFollowing: number;
    pRoleId: string;
    pRelationId: string;
    compositeId: string;
    shortCompositeId: string;
  }
  
  export interface IndPic {
    original: string;
    thumbnail: string;
    _id: string;
  }
  
  export interface VideosData {
    _id: string;
    individualId: string;
    videoId: string;
    pRoleId: string;
    pRelationId: string;
    hastags: string[];
    desc: string;
    cdnVideoPath: string;
    cdnThumbPath: string;
    srcCdnThumPath: string;
    isPublished: boolean;
    totalViewCount: number;
    totalLikes: number;
    totalDislikes: number;
    updatedAt: string;
    __v: number;
    primaryCategory: string;
    primaryCategoryName: string;
    secondaryCategoryLevel1: string;
    secondaryCategoryLevel1Name: string;
    secondaryCategoryLevel2: string;
    secondaryCategoryLevel2Name: string;
  }
  
  export interface Categories {
    _id: string;
    __v: number;
    createdAt: string;
    name: string;
    updatedAt: string;
    image: string;
    isDefault: boolean;
  }
  
  export interface VideoLike {
    rating: number;
  }
  
  export interface CommentResponse {
    data: CommentData;
    message: string;
  }
  
  export interface CommentData {
    count: number;
    data: Comment[];
  }
  export interface Comment {
    _id: string;
    firstName: string;
    lastName: string;
    userName: String;
    comment: string;
    commentedDateTime: string;
    profilePic: IndPic;
  }
  
  export interface ViewProfile {
    uploadedVideos: { data: VideosData[]; count: string | number };
    userInfo: Profile;
  }
  
  export interface AuthData {
    pRelationId: string;
    pRoleId: string;
  }
  
  export interface UserBasicInfo {
    _id: string;
    indCountryCode: string;
    indMobileNum: string;
    indFirstName: string;
    indLastName: string;
    indGender: string;
    indPic: IndPic;
    indLanPref: string;
    indContentPref: string;
    bio: string;
    desc: string;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    location: string;
    userName: string;
    totalFollowers: number;
    totalFollowing: number;
    totalPublishedPosts: number;
    totalUnpublishedPosts: number;
    websiteUrl: string;
    indDob: string;
    isBusinessUser: boolean;
    profileImages: IndPic[];
    shortCompositeId: string;
  }
  
  export interface UserRoleData {
    _id: string;
    source: string;
    indCountryCode: string;
    indMobileNum: string;
    pInterfaceId: string;
    pRoleId: string;
    pRoleAuthority: number;
    pRelationId: string;
    pRelationAuthority: number;
    indEmailNotify: boolean;
    indMobileNotify: boolean;
    isAccountVerified: boolean;
    isPrivateAccount: boolean;
    totalFollowers: number;
    totalFollowing: number;
    totalPublishedPosts: number;
    totalUnpublishedPosts: number;
    prefCat: string[];
    shortCompositeId: string;
    accessToken: string;
    refreshToken: string;
    deviceData: DeviceData;
    userCompositeId: string;
  }
  
  export interface DeviceData {
    indCurrLocLongLat: number[];
    indPushNotify: boolean;
    indFingerPrint: string;
  }
  
  export interface FollowingData {
    firstName: string;
    lastName: string;
    userName: string;
    profilePic: IndPic;
    userCompositeId: string;
  }
  
  export interface FollowerData {
    firstName: string;
    lastName: string;
    userName: string;
    profilePic: IndPic;
    userCompositeId: string;
  }
  
  export interface TaggedData {
    _id: string;
    shortVideoId: string;
    videoId: string;
    hastags: string[];
    desc: string;
    cdnVideoPath: string;
    cdnThumbPath: string;
    srcCdnThumPath: string;
    totalViewCount: number;
    totalComments: number;
    totalLikes: number;
    avgRating: number;
    userDetails: UserDetails;
    primaryCategoryId: string;
    secondaryCategoryLevel1Id: string;
    secondaryCategoryLevel2Id: string;
    primaryCategoryName: string;
    secondaryCategoryLevel1Name: string;
    secondaryCategoryLevel2Name: string;
  }
  