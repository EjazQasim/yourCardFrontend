export type PricingPlanType = {
  id: string
  title: string
  imgSrc?: string
  subtitle: string
  imgWidth?: number
  imgHeight?: number
  currentPlan: boolean
  popularPlan: boolean
  monthlyPrice: number
  planBenefits: string[]
  yearlyPlan?: {
    perMonth: number
    totalAnnual: number
  }
  monthlyPriceId?: string
  yearlyPriceId?: string
}

export type PricingPlanProps = {
  billingPeriod: string
  data?: PricingPlanType
  onPlanSelect: (planId: string) => void
}

export type PricingFaqType = {
  id: string
  answer: string
  question: string
}

export type PricingTableRowType = { feature: string; starter: boolean; pro: boolean | string; enterprise: boolean }

export type PricingTableType = {
  header: { title: string; subtitle: string; isPro?: boolean }[]
  rows: PricingTableRowType[]
}

export type PricingDataType = {
  faq: PricingFaqType[]
  pricingTable: PricingTableType
  pricingPlans: PricingPlanType[]
}
