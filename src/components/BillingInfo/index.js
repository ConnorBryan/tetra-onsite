/* globals Stripe:false */

import { compose, withProps, withState } from 'recompose';
import { withTetraUser } from 'src/utils/Auth';
import withData from 'src/utils/WithData';
import BillingInfo from './render';
import { saveCard, getDefaultCard } from 'src/services/PaymentService';
import { EXISTING_CARD, NEW_CARD } from './BillingInfoConstants';

export default compose(
  withTetraUser(),
  withData(() => getDefaultCard()),
  withState('stripe', 'setStripe', () => Stripe(CONFIG.STRIPE_API_KEY)),
  withState('elements', 'setElements', ({ stripe }) => stripe.elements()),
  withState('formError', 'setFormError', null),
  withState('isSubmitting', 'setIsSubmitting', false),
  withState('cardSelection', 'setCardSelection', NEW_CARD),
  withProps(
    ({
      stripe,
      setFormError,
      onCardSuccess,
      setIsSubmitting,
      cardSelection,
      setCardSelection,
    }) => ({
      setCardSelection: newCardSelection => {
        setFormError(null);
        setCardSelection(newCardSelection);
      },
      createToken: card => {
        setIsSubmitting(true);
        setFormError(null);

        if (cardSelection === EXISTING_CARD) {
          setIsSubmitting(false);
          onCardSuccess();
        } else {
          stripe
            .createToken(card)
            .then(({ error, token }) => {
              if (error) throw error;
              return saveCard(token.id);
            })
            .then(card => {
              setIsSubmitting(false);
              return onCardSuccess(card);
            })
            .catch(error => {
              setFormError(error.message);
              setIsSubmitting(false);
            });
        }
      },
    })
  )
)(BillingInfo);
