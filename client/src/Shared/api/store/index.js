import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userAPI } from "../../../Entities/User/api/service";
import { bookingApi } from "../../../Entities/Booking/api/service";
import { serviceApi } from "../../../Entities/Services/api/service";
import { reviewsApi } from "../../../Entities/Reviews/api/service";
import { masterApi } from "../../../Entities/Master/api/service";
import { newsApi } from "../../../Entities/News/api/service";

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [masterApi.reducerPath]: masterApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userAPI.middleware,
        bookingApi.middleware,
        reviewsApi.middleware,
        masterApi.middleware,
        serviceApi.middleware,
        newsApi.middleware
      ),
  });
};
