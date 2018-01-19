import React from 'react';
import PlanSelector from 'src/components/PlanSelector';
import type { Plan } from 'src/components/PlanSelector';
import BillingInfo from 'src/components/BillingInfo';
import './styles.scss';

type PlanEnrollProps = {
  planDetails: Plan | null,
  onCardSuccess: (any, string) => void,
  setPlanDetails: Plan => void,
  subscriptionError: string | null,
  setSubscriptionError: (string | null) => void,
  onEnroll: () => void,
};

export default function PlanEnroll({
  planDetails,
  setPlanDetails,
  onCardSuccess,
  subscriptionError,
}: PlanEnrollProps) {
  return (
    <div>
      <PlanSelector onSelect={setPlanDetails} />
      <BillingInfo
        className="billingInfo"
        display-if={planDetails}
        onCardSuccess={onCardSuccess}
      />
      <div className="centered-x formError">
        {subscriptionError}
      </div>
    </div>
  );
}
