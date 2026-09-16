export type ClientTabParamList = {
  Home: undefined;
  Search: { categoryId?: string; categoryName?: string } | undefined;
  Bookings: undefined;
  Messages: undefined;
  Account: undefined;
};

export type ClientStackParamList = ClientTabParamList & {
  ClientTabs: undefined;
  ProfessionalProfile: { proId: string };
  Booking: { proId: string };
  Tracking: { proId: string };
  Review: { proId: string };
};

export type WorkerTabParamList = {
  Jobs: undefined;
  Diary: undefined;
  Earnings: undefined;
  WorkerMessages: undefined;
  Profile: undefined;
};

export type WorkerStackParamList = WorkerTabParamList & {
  WorkerTabs: undefined;
  JobDetail: { jobId: string };
  ActiveJob: { jobId: string };
};
