import React, { Component } from 'react';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import type User from 'src/models/User';
import './styles.scss';
import { EXISTING_CARD, NEW_CARD } from './BillingInfoConstants';

type BillingInfoProps = {
  className: string | null,
  formError: string | null,
  setFormError: string => void,
  createToken: any => void,
  onCardSuccess: (any, string) => void,
  isSubmitting: boolean,
  tetraUser: User,
  data: any | null,
  cardSelection: string,
  setCardSelection: string => void,
  elements: any,
};

const stripeElementStyle = {
  base: {},
};

export default class BillingInfo extends Component {
  props: BillingInfoProps;
  card: any;

  componentDidMount() {
    const { props: { elements } } = this;

    this.card = elements.create('cardNumber', { style: stripeElementStyle });
    this.card.mount('#billingCard');

    const expiry = elements.create('cardExpiry', { style: stripeElementStyle });
    expiry.mount('#billingExpiry');

    const cvc = elements.create('cardCvc', { style: stripeElementStyle });
    cvc.mount('#billingCvc');
  }

  render() {
    const {
      props: {
        className,
        formError,
        createToken,
        isSubmitting,
        data,
        cardSelection,
        setCardSelection,
      },
    } = this;

    return (
      <div className={className}>
        <div className="billingForm">
          <div className="entrySelection">
            <div
              display-if={data != null}
              className={
                cardSelection === EXISTING_CARD
                  ? 'active entrySelector'
                  : 'entrySelector'
              }
              onClick={() => setCardSelection(EXISTING_CARD)}
            >
              <input
                id="useExistingCard"
                name="useExistingCard"
                type="radio"
                value="existing"
                onChange={() => setCardSelection(EXISTING_CARD)}
                checked={cardSelection === EXISTING_CARD}
              />
              <label htmlFor="useExistingCard">
                {data != null ? `${data.brand} ending in ${data.last4}` : ''}
              </label>
              <div className="row contents">
                <div className="formError">
                  {cardSelection === EXISTING_CARD ? formError : null}
                </div>
              </div>
            </div>
            <div
              className={
                cardSelection === NEW_CARD
                  ? 'active entrySelector'
                  : 'entrySelector'
              }
              onClick={() => setCardSelection(NEW_CARD)}
            >
              <input
                id="useNewCard"
                name="useExistingCard"
                type="radio"
                value="new"
                onChange={() => setCardSelection(NEW_CARD)}
                checked={cardSelection === NEW_CARD}
              />
              <label htmlFor="useNewCard">Enter new card</label>

              <div
                className={`newCard ${cardSelection === NEW_CARD
                  ? 'expanded'
                  : ''}`}
              >
                <div className="row contents">
                  <div className="billingFormFieldWrapper">
                    <div className="billingFormIcon">
                      <Icon glyph="credit_card" />
                    </div>
                    <div id="billingCard" className="billingFormField" />
                  </div>
                </div>
                <div className="row contents">
                  <div className="billingFormFieldWrapper">
                    <div className="billingFormIcon">
                      <Icon glyph="date_range" />
                    </div>
                    <div id="billingExpiry" className="billingFormField" />
                  </div>
                  <div className="billingFormFieldWrapper">
                    <div className="billingFormIcon">
                      <Icon glyph="fingerprint" />
                    </div>
                    <div id="billingCvc" className="billingFormField" />
                  </div>
                </div>
              </div>
              <div className="row contents">
                <div className="formError">
                  {cardSelection === NEW_CARD ? formError : null}
                </div>
              </div>
            </div>
          </div>
          <div className="centered-x">
            <Button
              className="purchaseButton"
              onClick={() => createToken(this.card)}
              showSpinner={isSubmitting}
              disabled={isSubmitting}
              text="Purchase"
            />
          </div>
        </div>
      </div>
    );
  }
}
