export type ClientTabParamList = {
  Home: undefined;
  PostRequest: undefined;
  Quotes: undefined;
  Messages: undefined;
  Account: undefined;
};

export type ClientStackParamList = ClientTabParamList & {
  ClientTabs: undefined;
  ArtisanProfile: { artisanId: string };
  AppointmentConfirmed: { artisanId: string };
  CompletedReview: { artisanId: string };
};

export type WorkerTabParamList = {
  Leads: undefined;
  MyQuotes: undefined;
  Credits: undefined;
  Status: undefined;
  Profile: undefined;
};

export type WorkerStackParamList = WorkerTabParamList & {
  WorkerTabs: undefined;
  LeadDetail: { leadId: string };
};
