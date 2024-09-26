// Define the structure for the User object in the review
interface User {
  fullName: string;
  age: number;
  first_name: string;
  last_name: string | null;
  date_of_birth: string;
  country: string | null;
  gender: string;
  profileImage: string;
}

// Define the structure for each Review in the reviews list
export interface Review {
  date: string;
  review: string;
  service: string;
  name: string;
  id: number;
  coach_id: number;
  order_id: number;
  user_id: number;
  rating: number;
  review_text: string;
  createdAt: string;
  updatedAt: string;
  user: User | null; // user can be null
}

// Define the structure for pagination information
interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Define the structure for the data object in the response
interface Data {
  reviews: Review[];
  pagination: Pagination;
}

// Define the structure for the complete response
export interface ReviewsListResponse {
  code: number;
  message: string;
  data: Data;
  status: boolean;
}

// Define the structure for the complete response
export interface ConsultantDetails {
  code: number;
  message: string;
  data: Data;
  status: boolean;
  id:number;
}

// Define the structure for the complete response
export interface ConsultantPriceChange {
  code: number;
  message: string;
  data: Data;
  status: boolean;
  page:number;
  limit:number;
}

export interface FollwersListResponse {
  status: boolean;
  message: string;
  data: FollowersListData;
}

export interface CoachCategory {
  id: number;
  category_name: string;
}

export interface Skill {
  id: number;
  category_id: number;
  skill_name: string;
  icon: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  CoachCategory: CoachCategory | null; // CoachCategory can be null
}

export interface SkillsListResponse {
  code: number;
  status: boolean;
  message: string;
  data: Skill[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  status: "active" | "inactive";
}

export interface CategoriesListResponse {
  code: number;
  status: boolean;
  message: string;
  data: Category[];
}

export interface FollowersListData {
  total_follower: number;
  follower: Follower[];
}

export interface Follower {
  id: number;
  user_id: number;
  consultant_id: number;
  followed_at: string;
  first_name: string;
  last_name: string;
  fullName: string;
  date_of_birth: string | null;
  country: string;
  age: number | string; // 'age' can be a number or an empty string
  gender: string;
  photo_url: string;
}

export interface OrdersListResponse {
  status: boolean;
  message: string;
  data: OrdersListData;
  meta: PaginationMeta;
}

export interface OrdersListData {
  count: number;
  rows: Order[];
}

export interface Order {
  id: number;
  consultant_id: number;
  gift_id: number | null;
  user_id: number;
  order_duration: string;
  actual_duration: string | null;
  order_type: string; // can also be union type if the order type values are fixed like 'video_call' | 'audio_call' | 'chat' etc.
  status: string; // can also be union type if the status values are fixed like 'completed' | 'cancelled' etc.
  consultant_earning: string | null;
  order_revenue: string | null;
  flute_earning: string | null;
  commission_rate: string;
  consultant_rate: string | null;
  description: OrderDescription;
  scheduled_at: string;
  call_start_time: string | null;
  call_end_time: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDescription {
  userData?: UserData;
  detail?: string;
}

export interface UserData {
  id: number | string;
  name: string;
}

export interface PaginationMeta {
  total_page: number;
  total_count: number;
  current_page: number;
  current_size: number;
}
