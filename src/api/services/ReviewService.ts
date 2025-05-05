import axios from '../axiosConfig';
import API_ENDPOINTS from "api/endpoints";
import { AxiosResponse } from 'axios';
import { ReviewCode } from "/api/types/ReviewTypes";

const ReviewService = {
  leaveReview: (code: string): Promise<AxiosResponse<ReviewCode>> => {
    return axios.post(
      API_ENDPOINTS.REVIEW.LEAVE_REVIEW + "/" + code + "/use",
    );
  }
};

export default ReviewService;