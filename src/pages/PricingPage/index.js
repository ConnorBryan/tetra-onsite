import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { setTheme } from 'src/utils/Theme';
import { withIntercom } from 'src/utils/Intercom';
import tetraLogo from 'src/images/hellephant/logo.svg';
import footerPattern from 'src/images/hellephant/footer_pattern.svg';
import footerLogo from 'src/images/hellephant/logo_footer.svg';
import appStoreDownload from 'src/images/hellephant/app_store_download.svg';
import twitterIcon from 'src/images/hellephant/twitter_icon.svg';
import facebookIcon from 'src/images/hellephant/facebook_icon.svg';
import emailIcon from 'src/images/hellephant/email_icon.svg';
import './styles.scss';

type PricingCardProps = {
  isLifted?: boolean,
  heading?: string,
  paragraph?: string,
  buttonText?: string,
  hoursDuration?: string,
  hoursDurationSubtext?: string,
  price?: string,
  priceSubtext?: string,
  listItems?: Array<string>,
};
class PricingCard extends Component {
  props: PricingCardProps;

  constructor(props: PricingCardProps) {
    super(props);
  }

  render() {
    const {
      isLifted = false,
      heading = '',
      paragraph = '',
      buttonText = 'Get started',
      hoursDuration = '',
      hoursDurationSubtext = '',
      price: unformattedPrice,
      priceSubtext = '',
      listItems = [
        'Near-real time notes',
        'Accurate AI transcription',
        'Automatic summarization',
        'Highlights',
        'Speaker labels',
        'Search and share',
      ],
    } = this.props;

    const generalClass = isLifted
      ? 'col-xs-12 col-md-4 pricing-plans_card is-lifted'
      : 'col-xs-12 col-md-4 pricing-plans_card';
    const price = unformattedPrice !== undefined ? `$${unformattedPrice}` : '';
    const listMapper = listItems.map((item, index) =>
      <li key={index}>
        {item}
      </li>
    );

    return (
      <div className={generalClass}>
        <div className="pricing-plans_card-head is-centered">
          <h3 className="is-bold is-primary">
            {heading}
          </h3>
          <p className="is-text-sized is-tertiary marginBottom--24">
            {paragraph}
          </p>
        </div>
        <div className="pricing-plans_card-body is-centered">
          <h2 className="is-bold is-primary marginTop--48">
            {hoursDuration}
          </h2>
          <p className="is-text-sized is-tertiary is-bold marginBottom--32">
            {hoursDurationSubtext}
          </p>
          <hr className="marginBottom--32" />
          <h3 className="pricing-plans_card-body_price is-tertiary">
            {price}
          </h3>
          <p className="is-text-sized is-tertiary is-bold marginBottom--56">
            {priceSubtext}
          </p>
          <button className="btn is-hollow marginBottom--32">
            {buttonText}
          </button>
        </div>
        <div className="pricing-plans_card-list">
          <ul className="marginTop--32 marginBottom--48">
            {listMapper}
          </ul>
        </div>
      </div>
    );
  }
}

class PricingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
  }

  preventScroll(e) {
    e.preventDefault();
  }

  openNav() {
    if (this.state.navOpen) {
      this.setState({ navOpen: false });
      document.getElementsByTagName('body')[0].className = '';
      document
        .getElementsByTagName('body')[0]
        .removeEventListener('touchmove', this.preventScroll, false);
    } else {
      this.setState({ navOpen: true });
      document.getElementsByTagName('body')[0].className = 'menu-open';
      document
        .getElementsByTagName('body')[0]
        .addEventListener('touchmove', this.preventScroll, false);
    }
  }

  render() {
    // compacted components

    return (
      <div className="container-fluid has-no-side-paddings PricingPage">
        <div className="container mobile-full-width">
          <nav className="navbar navbar-default" id="navbar">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  onClick={this.openNav.bind(this)}
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="/">
                  <img
                    className="img-responsive"
                    src={tetraLogo}
                    alt="website_logo"
                  />
                </a>
                <div className="navbar-header_app-store-download">
                  <Link
                    to="https://itunes.apple.com/us/app/tetra-automatic-call-notes/id1257309590?ls=1&mt=8"
                    target="_blank"
                  >
                    <img
                      className="img-responsive"
                      src={appStoreDownload}
                      alt="app_store_download"
                    />
                  </Link>
                </div>
              </div>
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link
                      to="https://angel.co/tetra/"
                      target="_blank"
                      onClick={() =>
                        window.mixpanel.track('Footer - About Clicked')}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="https://jobs.lever.co/tetra" target="_blank">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:help@asktetra.com">Support</a>
                  </li>
                  <li>
                    <Link className="has-rounded-border" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={
                  this.state.navOpen ? 'menu-overlay is-open' : 'menu-overlay'
                }
              >
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link
                      to="https://angel.co/tetra/"
                      target="_blank"
                      onClick={() =>
                        window.mixpanel.track('Footer - About Clicked')}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="https://jobs.lever.co/tetra" target="_blank">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:help@asktetra.com">Support</a>
                  </li>
                  <li>
                    <Link
                      className="has-rounded-border mobile-hidden"
                      to="/login"
                    >
                      Login
                    </Link>
                    <div className="button-group desktop-hidden">
                      <Link to="/login" className="btn is-hollow">
                        Login
                      </Link>
                      <Link
                        to="https://itunes.apple.com/us/app/tetra-automatic-call-notes/id1257309590?ls=1&mt=8"
                        target="_blank"
                        className="btn is-secondary"
                      >
                        Get the app
                      </Link>
                    </div>
                  </li>
                </ul>
                <div className="menu-overlay_social-icons">
                  <ul>
                    <li>
                      <Link to="https://twitter.com/asktetra" target="_blank">
                        <img
                          className="img-responsive"
                          alt="twitter_icon"
                          src={twitterIcon}
                        />{' '}
                        Twitter
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://www.facebook.com/calltetra/"
                        target="_blank"
                      >
                        <img
                          className="img-responsive"
                          alt="facebook_icon"
                          src={facebookIcon}
                        />{' '}
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img
                          className="img-responsive"
                          alt="email_icon"
                          src={emailIcon}
                        />{' '}
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="container">
          <div className="is-centered">
            <h2 className="is-primary is-bold marginBottom--40_mobile marginTop--128_mobile">
              Simple plans to get you started
            </h2>
            <p className="is-text-sized is-tertiary marginBottom--64 mobile-hidden">
              All plans come with 60 free trial minutes. No credit card needed
              to start.
            </p>
          </div>
          <div className="pricing-plans marginBottom--132">
            <div className="row">
              <div className="col-xs-12 col-md-10 col-md-offset-1">
                <div className="row">
                  <PricingCard
                    heading="Plus"
                    paragraph="Artificial intelligence early adopter"
                    hoursDuration="5hrs"
                    hoursDurationSubtext="Call time/month"
                    price="9"
                    priceSubtext="/month"
                  />
                  <PricingCard
                    isLifted={true}
                    heading="Pro"
                    paragraph="For your important calls"
                    hoursDuration="10hrs"
                    hoursDurationSubtext="Call time/month"
                    price="29"
                    priceSubtext="/month"
                  />
                  <PricingCard
                    heading="Business"
                    paragraph="The future of business calling"
                    hoursDuration="Unlimited"
                    hoursDurationSubtext="Call time/month"
                    price="99"
                    priceSubtext="/month"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer
          className="container-fluid"
          style={{ backgroundImage: 'url(' + footerPattern + ')' }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <img
                  src={footerLogo}
                  alt="tetra_logo"
                  className="img-responsive footer-logo"
                />
                <p className="is-text-sized marginBottom--56">
                  Never take call notes again.
                </p>
                <small>(c) 2018 Tetrachrome Inc. All right reserved.</small>
              </div>
              <div className="col-xs-12 col-md-6">
                <div className="row">
                  <div className="col-xs-12 col-md-4">
                    <p className="is-bold is-contrast-primary is-text-sized marginBottom--24">
                      Tetra
                    </p>
                    <Link
                      to="/pricing"
                      className="marginBottom--8 is-text-sized"
                    >
                      Pricing
                    </Link>
                    <Link
                      to="https://angel.co/tetra/"
                      target="_blank"
                      onClick={() =>
                        window.mixpanel.track('Footer - About Clicked')}
                      className="marginBottom--8 is-text-sized"
                    >
                      About us
                    </Link>
                    <Link
                      to="https://jobs.lever.co/tetra"
                      target="_blank"
                      className="marginBottom--8 is-text-sized"
                    >
                      Jobs
                    </Link>
                  </div>
                  <div className="col-xs-12 col-md-4">
                    <p className="is-bold is-contrast-primary is-text-sized marginBottom--24">
                      Support
                    </p>
                    <a
                      href="mailto:help@asktetra.com"
                      className="marginBottom--8 is-text-sized"
                    >
                      Contact support
                    </a>
                    <Link
                      to="http://tos.asktetra.com"
                      target="_blank"
                      className="marginBottom--8 is-text-sized"
                    >
                      Terms
                    </Link>
                    <Link
                      to="http://privacy.asktetra.com"
                      target="_blank"
                      className="marginBottom--8 is-text-sized"
                    >
                      Privacy
                    </Link>
                  </div>
                  <div className="col-xs-12 col-md-4">
                    <p className="is-bold is-contrast-primary is-text-sized marginBottom--24">
                      Get in touch
                    </p>
                    <a
                      href="mailto:hello@asktetra.com"
                      className="marginBottom--8 is-text-sized"
                    >
                      Email
                    </a>
                    <Link
                      to="https://twitter.com/asktetra"
                      target="_blank"
                      className="marginBottom--8 is-text-sized"
                    >
                      Twitter
                    </Link>
                    <Link
                      to="https://www.facebook.com/calltetra/"
                      target="_blank"
                      className="marginBottom--8 is-text-sized"
                    >
                      Facebook
                    </Link>
                    <Link to="#" className="marginBottom--8 is-text-sized">
                      AngelList
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default compose(withIntercom(), setTheme('marketing'))(PricingPage);
