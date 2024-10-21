export interface Car {
  id: number;
  manufacturer: string;
  model: string;
  currentKilometers: number;
  insurances: Insurance[];
  technicalReviews: TechnicalReview[];
  vignettes: Vignette[];
  oilChanges: OilChange[];
}

export interface Insurance {
  id: number;
  startDate: string;
  expirationDate: string;
  insuranceCompany: string;
}

export interface TechnicalReview {
  id: number;
  reviewDate: string;
  expirationDate: string;
}

export interface Vignette {
  id: number;
  startDate: string;
  expirationDate: string;
  vignetteType: string;
}

export interface OilChange {
  id: number;
  changeDate: string;
  currentKilometers: number;
  filtersChanged: string[];
}
