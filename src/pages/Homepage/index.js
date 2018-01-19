import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import Script from 'react-load-script';
import { setTheme } from 'src/utils/Theme';
import { withIntercom } from 'src/utils/Intercom';
import { addToWaitlist } from 'src/services/UserService';
import tetraLogo from 'src/images/hellephant/logo.svg';
import heroPhone from 'src/images/hellephant/hero_phone.png';
import heroPhoneMobile from 'src/images/hellephant/hero_phone_mobile.png';
import threeStepMobile from 'src/images/hellephant/3_step_mobile.png';
import threeStepMobileMobile from 'src/images/hellephant/3_step_mobile_mobile.png';
import threeSectionFocus from 'src/images/hellephant/3_sections_focus.png';
import threeSectionRemember from 'src/images/hellephant/3_sections_remember.png';
import threeSectionShare from 'src/images/hellephant/3_sections_share.png';
import tryForFreeMobile from 'src/images/hellephant/try_for_free_mobile.png';
import eightFeaturesSpeed from 'src/images/hellephant/8_features_speed.svg';
import eightFeaturesAccuracy from 'src/images/hellephant/8_features_accuracy.svg';
import eightFeaturesSpeakerLabels from 'src/images/hellephant/8_features_labels.svg';
import eightFeaturesHighlights from 'src/images/hellephant/8_features_highlights.svg';
import eightFeaturesKeywords from 'src/images/hellephant/8_features_keywords.svg';
import eightFeaturesSearch from 'src/images/hellephant/8_features_search.svg';
import eightFeaturesCalendar from 'src/images/hellephant/8_features_calendar.svg';
import eightFeaturesMagicHighlights from 'src/images/hellephant/8_features_magic_highlights.svg';
import lockIcon from 'src/images/hellephant/icon-lock.svg';
import microphoneIcon from 'src/images/hellephant/icon-mic.svg';
import footerPattern from 'src/images/hellephant/footer_pattern.svg';
import footerLogo from 'src/images/hellephant/logo_footer.svg';
import icoSkype from 'src/images/hellephant/ico_skype.svg';
import icoSlack from 'src/images/hellephant/ico_slack.svg';
import icoGtm from 'src/images/hellephant/ico_gtm.svg';
import icoUber from 'src/images/hellephant/ico_uber.svg';
import icoHangouts from 'src/images/hellephant/ico_hangouts.svg';
import icoZoom from 'src/images/hellephant/ico_zoom.svg';
import icoBlueJeans from 'src/images/hellephant/ico_bluejeans.svg';
import icoWebex from 'src/images/hellephant/ico_webex.svg';
import appStoreDownload from 'src/images/hellephant/app_store_download.svg';
import twitterIcon from 'src/images/hellephant/twitter_icon.svg';
import facebookIcon from 'src/images/hellephant/facebook_icon.svg';
import emailIcon from 'src/images/hellephant/email_icon.svg';
import greenRoundCheck from 'src/images/hellephant/green_round_check.svg';
// import carouselDivider from 'src/images/hellephant/divider.svg';
// import avatarRound from 'src/images/hellephant/avatar.png';
// import leftArrow from 'src/images/hellephant/left_arrow.svg';
// import rightArrow from 'src/images/hellephant/right_arrow.svg';

import './styles.scss';
import 'src/global-styles/bootstrap.css';

type FeatureComponentProps = {
  wrapperClass?: string,
  imgAlt?: string,
  heading?: string,
  paragraph?: string,
  imgSrc?: any,
};
class FeatureComponent extends Component {
  props: FeatureComponentProps;
  constructor(props: FeatureComponentProps) {
    super(props);
  }

  render() {
    const {
      wrapperClass = 'col-xs-12 col-md-3 displayed-flex_mobile displayed-flex_align-start',
      imgAlt = 'icon',
      heading = 'HEADING',
      paragraph = 'PARAGRAPH',
      imgSrc = eightFeaturesSpeed,
    } = this.props;

    return (
      <div className={wrapperClass}>
        <img
          className="img-responsive marginRight--24_mobile"
          src={imgSrc}
          alt={imgAlt}
        />
        <div>
          <h3 className="is-bold is-contrast-primary marginTop--0_mobile">
            {heading}
          </h3>
          <p className="is-contrast-secondary is-text-sized marginBottom--40_mobile">
            {paragraph}
          </p>
        </div>
      </div>
    );
  }
}

/*
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
  }
  switchSteps(ev) {
    let switchToStep = parseInt(ev.currentTarget.dataset.step, 10);
    this.setState({
      currentStep: switchToStep
    })
  }
  goToPrevious() {
    if (this.state.currentStep - 1 >= 0) {
      this.setState({
        currentStep: this.state.currentStep - 1
      })
    }
  }
  goToNext() {
    let maxStep = this.props.data.length;
    if (this.state.currentStep + 1 <= maxStep - 1) {
      this.setState({
        currentStep: this.state.currentStep + 1
      })
    }
  }
  render() {
    if (this.props.data !== undefined && this.props.data.length > 0) {

      let currentHeading = null;

      let sectionsLister = this.props.data.map((item, index) => {
        let liClass = '';
        if (this.state.currentStep === index) {
          currentHeading = <h3>{item.heading}</h3>;
          liClass = 'is-selected';
        }
        return <li key={index} data-step={index} onClick={this.switchSteps.bind(this)} className={liClass}>{item.section}</li>
      });

      let stepIndicator = this.props.data.map((item, index) => {
        if (this.state.currentStep === index) {
          return <div className="carousel_step-indicator_dot is-active" key={index}></div>
        }
        return <div className="carousel_step-indicator_dot" key={index}></div>
      })
  
      return (
        <div className="carousel" id="carousel">
          <div className="carousel_section-listing mobile-hidden">
            <ul>
              {sectionsLister}
            </ul>
          </div>
          <div className="carousel_section-listing desktop-hidden">
            <img className="img-responsive carousel_section-listing_arrow is-left" onClick={this.goToPrevious.bind(this)} alt="previous" src={leftArrow} />
            <div>
              <ul>
                {sectionsLister}
              </ul>
              <div className="carousel_step-indicator">
                {stepIndicator}
              </div>
            </div>
            <img className="img-responsive carousel_section-listing_arrow is-right" onClick={this.goToNext.bind(this)} alt="next" src={rightArrow} />
          </div>
          <div className="carousel_divider">
            <img className="img-responsive" src={carouselDivider} alt="divider" />
          </div>
          <div className="carousel_current-holder">
            {currentHeading}
            <div className="carousel_current-holder_user">
              <div className="carousel_current-holder_user-pic">
                <img className="img-responsive" alt="user_image" src={avatarRound} />
              </div>
              <div className="carousel_current-holder_user-name">
                Frank Lambert
                <small>CEO of Lambert Inc.</small>
              </div>
            </div>
          </div>
        </div>
      )

    }
    return null;
  }
}
*/

// prevent linter error message
/* global branch */

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.branch = null;
    this.state = {
      selectedCountry: 'us',
      selectedCountryPrefix: '+1',
      countrySelectOpen: false,
      countrySelectOpen2: false,
      integrationText: 'Where do you most frequently hold work meetings?',
      integrationClicked: false,
      integrationEmail: null,
      integrationSent: false,
      integrationSentError: false,
      integrationProvider: null,
      navOpen: false,
      scriptLoaded: false,
      branchNumberToSendTo: null,
      displayBranchErrorMessage: false,
      branchErrorMessage: '',
      branchSubmitButtonText: 'Text me a download link',
      branchMessageSent: false,
      carouselData: [
        {
          section: 'INVESTMENT RESEARCH',
          heading:
            'I have highly valuable investor and pospect meetings that our firm needs to better capture.',
        },
        {
          section: 'RECRUITING',
          heading:
            'Recruiting have highly valuable investor and pospect meetings that our firm needs to better capture.',
        },
        {
          section: 'SALES',
          heading:
            'Sales have highly valuable investor and pospect meetings that our firm needs to better capture.',
        },
        {
          section: 'DISTRIBUTED TEAM',
          heading:
            'Team have highly valuable investor and pospect meetings that our firm needs to better capture.',
        },
        {
          section: 'USER RESEARCH',
          heading:
            'User have highly valuable investor and pospect meetings that our firm needs to better capture.',
        },
      ],
    };
    this.scrollSpy = this.scrollSpy.bind(this);
    this.preventScroll = this.preventScroll.bind(this);
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    this.branch = branch;
  }

  handlePhoneNrChange(ev) {
    // new phone number from input el
    const newPhoneNr = ev.currentTarget.value;
    // check if the phone nr contains only digits
    if (/^\d+$/.test(newPhoneNr)) {
      // new phone nr is valid and is different than the previously stored phone nr
      this.setState({
        branchNumberToSendTo: newPhoneNr,
        displayBranchErrorMessage: false,
      });
    } else {
      // new phone nr is invalid
      const errorMessage = 'Invalid number format';
      this.setState({
        displayBranchErrorMessage: true,
        branchErrorMessage: errorMessage,
      });
    }
  }

  sendMessage(ev) {
    // prevent default html behaviour when the form submit causes a page refresh
    ev.preventDefault();
    if (this.branch !== null) {
      // "branch" is initialized
      const branch = this.branch;

      if (
        !this.state.displayBranchErrorMessage &&
        this.state.branchNumberToSendTo !== null
      ) {
        this.setState(
          {
            branchSubmitButtonText: 'Sending link',
          },
          () => {
            branch.init(CONFIG.BRANCH_KEY);
            const phoneNumber = `${this.state.selectedCountryPrefix}${this.state
              .branchNumberToSendTo}`;
            const linkData = {
              tags: [],
              channel: 'Website',
              feature: 'TextMeTheApp',
              data: {
                foo: 'bar',
              },
            };
            const options = {};
            branch.sendSMS(phoneNumber, linkData, options, err => {
              if (err) {
                this.setState({
                  branchSubmitButtonText: 'Error sending link',
                  branchMessageSent: false,
                });
              } else {
                this.setState({
                  branchSubmitButtonText: 'Link sent',
                  branchMessageSent: true,
                });
              }
            });
          }
        );
      }
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollSpy);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollSpy);
  }

  preventScroll(e) {
    e.preventDefault();
  }

  scrollSpy() {
    if (window.pageYOffset >= 330) {
      document.getElementById('navbar').className =
        'navbar navbar-default Homepage show-app-download';
    } else {
      document.getElementById('navbar').className =
        'navbar navbar-default Homepage';
    }
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

  validateEmail(email) {
    if (email !== null && email.length > 0 && email.trim().length > 0) {
      const criteria = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9] {1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
      return criteria.test(email);
    }
    if (email === null || email.length === 0) {
      return true;
    }
    return false;
  }

  integrationIconClick(ev) {
    ev.preventDefault();
    const integration = ev.currentTarget.dataset.integration;
    let integrationText = this.state.integrationText;
    const provider = integration;
    switch (integration) {
      case 'skype':
        integrationText =
          'Thanks! Should we notify you when we launch Skype support?';
        break;
      case 'slack':
        integrationText =
          'Thanks! Should we notify you when we launch Slack support?';
        break;
      case 'gtm':
        integrationText =
          'Thanks! Should we notify you when we launch GTM support?';
        break;
      case 'uber':
        integrationText =
          'Thanks! Should we notify you when we launch UberConference support?';
        break;
      case 'hangouts':
        integrationText =
          'Thanks! Should we notify you when we launch Google Hangouts support?';
        break;
      case 'zoom':
        integrationText =
          'Thanks! Should we notify you when we launch Zoom support?';
        break;
      case 'bluejeans':
        integrationText =
          'Thanks! Should we notify you when we launch BlueJeans support?';
        break;
      case 'webex':
        integrationText =
          'Thanks! Should we notify you when we launch Cisco WebEx support?';
        break;
      default:
        break;
    }
    this.setState({
      integrationText: integrationText,
      integrationClicked: true,
      integrationProvider: provider,
    });
  }

  integrationSend(ev) {
    ev.preventDefault();
    if (
      this.validateEmail(this.state.integrationEmail) &&
      this.state.integrationEmail !== null
    ) {
      addToWaitlist(this.state.integrationEmail, this.state.integrationProvider)
        .then(() => {
          this.setState(state => ({
            ...state,
            integrationSent: true,
          }));
        })
        .catch(() => {
          this.setState(state => ({
            ...state,
            integrationSent: true,
            integrationSentError: true,
          }));
          window.mixpanel.track('Video Conference Selection', {
            provider: this.state.integrationProvider,
          });
        });
    }
  }

  changeSelectedCountry(ev) {
    ev.preventDefault();
    const code = ev.currentTarget.dataset.code;
    const prefix = ev.currentTarget.dataset.prefix;
    this.setState({
      selectedCountry: code,
      selectedCountryPrefix: prefix,
      countrySelectOpen: false,
    });
  }

  changeSelectedCountry2(ev) {
    ev.preventDefault();
    const code = ev.currentTarget.dataset.code;
    const prefix = ev.currentTarget.dataset.prefix;
    this.setState({
      selectedCountry: code,
      selectedCountryPrefix: prefix,
      countrySelectOpen2: false,
    });
  }

  render() {
    // compacted components

    let branchSubmitBtnCmp = (
      <button className="btn is-primary" onClick={this.sendMessage.bind(this)}>
        {this.state.branchSubmitButtonText}
      </button>
    );

    if (this.state.branchMessageSent) {
      branchSubmitBtnCmp = (
        <button
          className="btn is-success"
          onClick={this.sendMessage.bind(this)}
        >
          {this.state.branchSubmitButtonText}
        </button>
      );
    }

    let integrationIconsCmp = (
      <div className="integration-icons">
        <img
          src={icoSkype}
          alt="skype_logo"
          data-integration="skype"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoSlack}
          alt="slack_logo"
          data-integration="slack"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoGtm}
          alt="gtm_logo"
          data-integration="gtm"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoUber}
          alt="uber_logo"
          data-integration="uber"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoHangouts}
          alt="hangouts_logo"
          data-integration="hangouts"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoZoom}
          alt="zoom_logo"
          data-integration="zoom"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoBlueJeans}
          alt="bluejeans_logo"
          data-integration="bluejeans"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
        <img
          src={icoWebex}
          alt="cisco_webex_logo"
          data-integration="webex"
          className="img-responsive marginRight--12 displayed-inline-block"
          onClick={this.integrationIconClick.bind(this)}
        />
      </div>
    );

    if (this.state.integrationClicked) {
      integrationIconsCmp = (
        <div className="integration-icons has-input">
          <input
            type="email"
            className="form-control is-dark displayed-inline-block"
            placeholder="Enter email address"
            onChange={ev =>
              this.setState({ integrationEmail: ev.target.value })}
          />
          <button
            className="btn btn-sm is-primary"
            onClick={this.integrationSend.bind(this)}
          >
            Notify me
          </button>
          {this.validateEmail(this.state.integrationEmail)
            ? null
            : <div className="is-medium displayed-block is-secondary marginTop--16">
                Incorrect email format
              </div>}
        </div>
      );
      if (this.state.integrationSent) {
        integrationIconsCmp = (
          <div className="integration-icons is-sent">
            <img
              className="img-responsive"
              alt="checkmark"
              src={greenRoundCheck}
            />{' '}
            Okay, we will notify you.
          </div>
        );
        if (this.state.integrationSentError) {
          integrationIconsCmp = (
            <div className="integration-icons is-sent is-error">
              There was a problem with your request. Please try again later.
            </div>
          );
        }
      }
    }

    const countryList = (
      <ul>
        <li
          data-code="af"
          data-prefix="+93"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag af" />
          <span className="country-name">Afghanistan</span>
          <span className="grey">+93</span>
        </li>
        <li
          data-code="ax"
          data-prefix="+358"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ax" />
          <span className="country-name">Åland Islands</span>
          <span className="grey">+358</span>
        </li>
        <li
          data-code="al"
          data-prefix="+355"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag al" />
          <span className="country-name">Albania</span>
          <span className="grey">+355</span>
        </li>
        <li
          data-code="dz"
          data-prefix="+213"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag dz" />
          <span className="country-name">Algeria</span>
          <span className="grey">+213</span>
        </li>
        <li
          data-code="as"
          data-prefix="+1684"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag as" />
          <span className="country-name">American Samoa</span>
          <span className="grey">+1684</span>
        </li>
        <li
          data-code="ad"
          data-prefix="+376"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ad" />
          <span className="country-name">Andorra</span>
          <span className="grey">+376</span>
        </li>
        <li
          data-code="ao"
          data-prefix="+244"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ao" />
          <span className="country-name">Angola</span>
          <span className="grey">+244</span>
        </li>
        <li
          data-code="ai"
          data-prefix="+1264"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ai" />
          <span className="country-name">Anguilla</span>
          <span className="grey">+1264</span>
        </li>
        <li
          data-code="aq"
          data-prefix="+672"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag aq" />
          <span className="country-name">Antarctica</span>
          <span className="grey">+672</span>
        </li>
        <li
          data-code="ag"
          data-prefix="+1268"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ag" />
          <span className="country-name">Antigua and Barbuda</span>
          <span className="grey">+1268</span>
        </li>
        <li
          data-code="ar"
          data-prefix="+54"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ar" />
          <span className="country-name">Argentina</span>
          <span className="grey">+54</span>
        </li>
        <li
          data-code="am"
          data-prefix="+374"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag am" />
          <span className="country-name">Armenia</span>
          <span className="grey">+374</span>
        </li>
        <li
          data-code="aw"
          data-prefix="+297"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag aw" />
          <span className="country-name">Aruba</span>
          <span className="grey">+297</span>
        </li>
        <li
          data-code="au"
          data-prefix="+61"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag au" />
          <span className="country-name">Australia</span>
          <span className="grey">+61</span>
        </li>
        <li
          data-code="at"
          data-prefix="+43"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag at" />
          <span className="country-name">Austria</span>
          <span className="grey">+43</span>
        </li>
        <li
          data-code="az"
          data-prefix="+994"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag az" />
          <span className="country-name">Azerbaijan</span>
          <span className="grey">+994</span>
        </li>
        <li
          data-code="bs"
          data-prefix="+1242"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bs" />
          <span className="country-name">Bahamas</span>
          <span className="grey">+1242</span>
        </li>
        <li
          data-code="bh"
          data-prefix="+973"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bh" />
          <span className="country-name">Bahrain</span>
          <span className="grey">+973</span>
        </li>
        <li
          data-code="bd"
          data-prefix="+880"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bd" />
          <span className="country-name">Bangladesh</span>
          <span className="grey">+880</span>
        </li>
        <li
          data-code="bb"
          data-prefix="+1246"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bb" />
          <span className="country-name">Barbados</span>
          <span className="grey">+1246</span>
        </li>
        <li
          data-code="by"
          data-prefix="+375"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag by" />
          <span className="country-name">Belarus</span>
          <span className="grey">+375</span>
        </li>
        <li
          data-code="be"
          data-prefix="+32"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag be" />
          <span className="country-name">Belgium</span>
          <span className="grey">+32</span>
        </li>
        <li
          data-code="bz"
          data-prefix="+501"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bz" />
          <span className="country-name">Belize</span>
          <span className="grey">+501</span>
        </li>
        <li
          data-code="bj"
          data-prefix="+229"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bj" />
          <span className="country-name">Benin</span>
          <span className="grey">+229</span>
        </li>
        <li
          data-code="bm"
          data-prefix="+1441"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bm" />
          <span className="country-name">Bermuda</span>
          <span className="grey">+1441</span>
        </li>
        <li
          data-code="bt"
          data-prefix="+975"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bt" />
          <span className="country-name">Bhutan</span>
          <span className="grey">+975</span>
        </li>
        <li
          data-code="bo"
          data-prefix="+591"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bo" />
          <span className="country-name">Bolivia</span>
          <span className="grey">+591</span>
        </li>
        <li
          data-code="bq"
          data-prefix="+5997"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bq" />
          <span className="country-name">Bonaire, Sint Eustatius and Saba</span>
          <span className="grey">+5997</span>
        </li>
        <li
          data-code="ba"
          data-prefix="+387"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ba" />
          <span className="country-name">Bosnia and Herzegovina</span>
          <span className="grey">+387</span>
        </li>
        <li
          data-code="bw"
          data-prefix="+267"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bw" />
          <span className="country-name">Botswana</span>
          <span className="grey">+267</span>
        </li>
        <li
          data-code="br"
          data-prefix="+55"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag br" />
          <span className="country-name">Brazil</span>
          <span className="grey">+55</span>
        </li>
        <li
          data-code="io"
          data-prefix="+246"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag io" />
          <span className="country-name">British Indian Ocean Territory</span>
          <span className="grey">+246</span>
        </li>
        <li
          data-code="bn"
          data-prefix="+673"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bn" />
          <span className="country-name">Brunei Darussalam</span>
          <span className="grey">+673</span>
        </li>
        <li
          data-code="bg"
          data-prefix="+359"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bg" />
          <span className="country-name">Bulgaria</span>
          <span className="grey">+359</span>
        </li>
        <li
          data-code="bf"
          data-prefix="+226"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bf" />
          <span className="country-name">Burkina Faso</span>
          <span className="grey">+226</span>
        </li>
        <li
          data-code="bi"
          data-prefix="+257"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bi" />
          <span className="country-name">Burundi</span>
          <span className="grey">+257</span>
        </li>
        <li
          data-code="kh"
          data-prefix="+855"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag kh" />
          <span className="country-name">Cambodia</span>
          <span className="grey">+855</span>
        </li>
        <li
          data-code="cm"
          data-prefix="+237"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cm" />
          <span className="country-name">Cameroon</span>
          <span className="grey">+237</span>
        </li>
        <li
          data-code="ca"
          data-prefix="+1"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ca" />
          <span className="country-name">Canada</span>
          <span className="grey">+1</span>
        </li>
        <li
          data-code="cv"
          data-prefix="+238"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cv" />
          <span className="country-name">Cabo Verde</span>
          <span className="grey">+238</span>
        </li>
        <li
          data-code="ky"
          data-prefix="+1345"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ky" />
          <span className="country-name">Cayman Islands</span>
          <span className="grey">+1345</span>
        </li>
        <li
          data-code="cf"
          data-prefix="+236"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cf" />
          <span className="country-name">Central African Republic</span>
          <span className="grey">+236</span>
        </li>
        <li
          data-code="td"
          data-prefix="+235"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag td" />
          <span className="country-name">Chad</span>
          <span className="grey">+235</span>
        </li>
        <li
          data-code="cl"
          data-prefix="+56"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cl" />
          <span className="country-name">Chile</span>
          <span className="grey">+56</span>
        </li>
        <li
          data-code="cn"
          data-prefix="+86"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cn" />
          <span className="country-name">China</span>
          <span className="grey">+86</span>
        </li>
        <li
          data-code="cx"
          data-prefix="+61"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cx" />
          <span className="country-name">Christmas Island</span>
          <span className="grey">+61</span>
        </li>
        <li
          data-code="cc"
          data-prefix="+61"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cc" />
          <span className="country-name">Cocos Islands</span>
          <span className="grey">+61</span>
        </li>
        <li
          data-code="co"
          data-prefix="+57"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag co" />
          <span className="country-name">Colombia</span>
          <span className="grey">+57</span>
        </li>
        <li
          data-code="km"
          data-prefix="+269"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag km" />
          <span className="country-name">Comoros</span>
          <span className="grey">+269</span>
        </li>
        <li
          data-code="cg"
          data-prefix="+242"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cg" />
          <span className="country-name">Congo</span>
          <span className="grey">+242</span>
        </li>
        <li
          data-code="cd"
          data-prefix="+243"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cd" />
          <span className="country-name">Congo</span>
          <span className="grey">+243</span>
        </li>
        <li
          data-code="ck"
          data-prefix="+682"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ck" />
          <span className="country-name">Cook Islands</span>
          <span className="grey">+682</span>
        </li>
        <li
          data-code="cr"
          data-prefix="+506"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cr" />
          <span className="country-name">Costa Rica</span>
          <span className="grey">+506</span>
        </li>
        <li
          data-code="hr"
          data-prefix="+385"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag hr" />
          <span className="country-name">Croatia</span>
          <span className="grey">+385</span>
        </li>
        <li
          data-code="cu"
          data-prefix="+53"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cu" />
          <span className="country-name">Cuba</span>
          <span className="grey">+53</span>
        </li>
        <li
          data-code="cw"
          data-prefix="+599"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cw" />
          <span className="country-name">Curaçao</span>
          <span className="grey">+599</span>
        </li>
        <li
          data-code="cy"
          data-prefix="+357"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cy" />
          <span className="country-name">Cyprus</span>
          <span className="grey">+357</span>
        </li>
        <li
          data-code="cz"
          data-prefix="+420"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag cz" />
          <span className="country-name">Czech Republic</span>
          <span className="grey">+420</span>
        </li>
        <li
          data-code="dk"
          data-prefix="+45"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag dk" />
          <span className="country-name">Denmark</span>
          <span className="grey">+45</span>
        </li>
        <li
          data-code="dj"
          data-prefix="+253"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag dj" />
          <span className="country-name">Djibouti</span>
          <span className="grey">+253</span>
        </li>
        <li
          data-code="dm"
          data-prefix="+1767"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag dm" />
          <span className="country-name">Dominica</span>
          <span className="grey">+1767</span>
        </li>
        <li
          data-code="do"
          data-prefix="+1809"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag do" />
          <span className="country-name">Dominican Republic</span>
          <span className="grey">+1809</span>
        </li>
        <li
          data-code="ec"
          data-prefix="+593"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ec" />
          <span className="country-name">Ecuador</span>
          <span className="grey">+593</span>
        </li>
        <li
          data-code="eg"
          data-prefix="+20"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag eg" />
          <span className="country-name">Egypt</span>
          <span className="grey">+20</span>
        </li>
        <li
          data-code="sv"
          data-prefix="+503"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sv" />
          <span className="country-name">El Salvador</span>
          <span className="grey">+503</span>
        </li>
        <li
          data-code="gq"
          data-prefix="+240"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gq" />
          <span className="country-name">Equatorial Guinea</span>
          <span className="grey">+240</span>
        </li>
        <li
          data-code="er"
          data-prefix="+291"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag er" />
          <span className="country-name">Eritrea</span>
          <span className="grey">+291</span>
        </li>
        <li
          data-code="ee"
          data-prefix="+372"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ee" />
          <span className="country-name">Estonia</span>
          <span className="grey">+372</span>
        </li>
        <li
          data-code="et"
          data-prefix="+251"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag et" />
          <span className="country-name">Ethiopia</span>
          <span className="grey">+251</span>
        </li>
        <li
          data-code="fk"
          data-prefix="+500"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag fk" />
          <span className="country-name">Falkland Islands</span>
          <span className="grey">+500</span>
        </li>
        <li
          data-code="fo"
          data-prefix="+298"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag fo" />
          <span className="country-name">Faroe Islands</span>
          <span className="grey">+298</span>
        </li>
        <li
          data-code="fj"
          data-prefix="+679"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag fj" />
          <span className="country-name">Fiji</span>
          <span className="grey">+679</span>
        </li>
        <li
          data-code="fi"
          data-prefix="+358"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag fi" />
          <span className="country-name">Finland</span>
          <span className="grey">+358</span>
        </li>
        <li
          data-code="fr"
          data-prefix="+33"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag fr" />
          <span className="country-name">France</span>
          <span className="grey">+33</span>
        </li>
        <li
          data-code="gf"
          data-prefix="+594"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gf" />
          <span className="country-name">French Guiana</span>
          <span className="grey">+594</span>
        </li>
        <li
          data-code="pf"
          data-prefix="+689"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pf" />
          <span className="country-name">French Polynesia</span>
          <span className="grey">+689</span>
        </li>
        <li
          data-code="ga"
          data-prefix="+241"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ga" />
          <span className="country-name">Gabon</span>
          <span className="grey">+241</span>
        </li>
        <li
          data-code="gm"
          data-prefix="+220"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gm" />
          <span className="country-name">Gambia</span>
          <span className="grey">+220</span>
        </li>
        <li
          data-code="ge"
          data-prefix="+995"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ge" />
          <span className="country-name">Georgia</span>
          <span className="grey">+995</span>
        </li>
        <li
          data-code="de"
          data-prefix="+49"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag de" />
          <span className="country-name">Germany</span>
          <span className="grey">+49</span>
        </li>
        <li
          data-code="gh"
          data-prefix="+233"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gh" />
          <span className="country-name">Ghana</span>
          <span className="grey">+233</span>
        </li>
        <li
          data-code="gi"
          data-prefix="+350"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gi" />
          <span className="country-name">Gibraltar</span>
          <span className="grey">+350</span>
        </li>
        <li
          data-code="gr"
          data-prefix="+30"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gr" />
          <span className="country-name">Greece</span>
          <span className="grey">+30</span>
        </li>
        <li
          data-code="gl"
          data-prefix="+299"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gl" />
          <span className="country-name">Greenland</span>
          <span className="grey">+299</span>
        </li>
        <li
          data-code="gd"
          data-prefix="+1473"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gd" />
          <span className="country-name">Grenada</span>
          <span className="grey">+1473</span>
        </li>
        <li
          data-code="gp"
          data-prefix="+590"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gp" />
          <span className="country-name">Guadeloupe</span>
          <span className="grey">+590</span>
        </li>
        <li
          data-code="gu"
          data-prefix="+1671"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gu" />
          <span className="country-name">Guam</span>
          <span className="grey">+1671</span>
        </li>
        <li
          data-code="gt"
          data-prefix="+502"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gt" />
          <span className="country-name">Guatemala</span>
          <span className="grey">+502</span>
        </li>
        <li
          data-code="gg"
          data-prefix="+44"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gg" />
          <span className="country-name">Guernsey</span>
          <span className="grey">+44</span>
        </li>
        <li
          data-code="gn"
          data-prefix="+224"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gn" />
          <span className="country-name">Guinea</span>
          <span className="grey">+224</span>
        </li>
        <li
          data-code="gw"
          data-prefix="+245"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gw" />
          <span className="country-name">Guinea-Bissau</span>
          <span className="grey">+245</span>
        </li>
        <li
          data-code="gy"
          data-prefix="+592"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gy" />
          <span className="country-name">Guyana</span>
          <span className="grey">+592</span>
        </li>
        <li
          data-code="ht"
          data-prefix="+509"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ht" />
          <span className="country-name">Haiti</span>
          <span className="grey">+509</span>
        </li>
        <li
          data-code="va"
          data-prefix="+379"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag va" />
          <span className="country-name">Holy See</span>
          <span className="grey">+379</span>
        </li>
        <li
          data-code="hn"
          data-prefix="+504"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag hn" />
          <span className="country-name">Honduras</span>
          <span className="grey">+504</span>
        </li>
        <li
          data-code="hk"
          data-prefix="+852"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag hk" />
          <span className="country-name">Hong Kong</span>
          <span className="grey">+852</span>
        </li>
        <li
          data-code="hu"
          data-prefix="+36"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag hu" />
          <span className="country-name">Hungary</span>
          <span className="grey">+36</span>
        </li>
        <li
          data-code="is"
          data-prefix="+354"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag is" />
          <span className="country-name">Iceland</span>
          <span className="grey">+354</span>
        </li>
        <li
          data-code="in"
          data-prefix="+91"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag in" />
          <span className="country-name">India</span>
          <span className="grey">+91</span>
        </li>
        <li
          data-code="id"
          data-prefix="+62"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag id" />
          <span className="country-name">Indonesia</span>
          <span className="grey">+62</span>
        </li>
        <li
          data-code="ir"
          data-prefix="+98"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ir" />
          <span className="country-name">Iran</span>
          <span className="grey">+98</span>
        </li>
        <li
          data-code="iq"
          data-prefix="+964"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag iq" />
          <span className="country-name">Iraq</span>
          <span className="grey">+964</span>
        </li>
        <li
          data-code="ie"
          data-prefix="+353"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ie" />
          <span className="country-name">Ireland</span>
          <span className="grey">+353</span>
        </li>
        <li
          data-code="im"
          data-prefix="+44"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag im" />
          <span className="country-name">Isle of Man</span>
          <span className="grey">+44</span>
        </li>
        <li
          data-code="il"
          data-prefix="+972"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag il" />
          <span className="country-name">Israel</span>
          <span className="grey">+972</span>
        </li>
        <li
          data-code="it"
          data-prefix="+39"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag it" />
          <span className="country-name">Italy</span>
          <span className="grey">+39</span>
        </li>
        <li
          data-code="jm"
          data-prefix="+1876"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag jm" />
          <span className="country-name">Jamaica</span>
          <span className="grey">+1876</span>
        </li>
        <li
          data-code="jp"
          data-prefix="+81"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag jp" />
          <span className="country-name">Japan</span>
          <span className="grey">+81</span>
        </li>
        <li
          data-code="je"
          data-prefix="+44"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag je" />
          <span className="country-name">Jersey</span>
          <span className="grey">+44</span>
        </li>
        <li
          data-code="jo"
          data-prefix="+962"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag jo" />
          <span className="country-name">Jordan</span>
          <span className="grey">+962</span>
        </li>
        <li
          data-code="kz"
          data-prefix="+76"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag kz" />
          <span className="country-name">Kazakhstan</span>
          <span className="grey">+76</span>
        </li>
        <li
          data-code="ke"
          data-prefix="+254"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ke" />
          <span className="country-name">Kenya</span>
          <span className="grey">+254</span>
        </li>
        <li
          data-code="ki"
          data-prefix="+686"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ki" />
          <span className="country-name">Kiribati</span>
          <span className="grey">+686</span>
        </li>
        <li
          data-code="kw"
          data-prefix="+965"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag kw" />
          <span className="country-name">Kuwait</span>
          <span className="grey">+965</span>
        </li>
        <li
          data-code="kg"
          data-prefix="+996"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag kg" />
          <span className="country-name">Kyrgyzstan</span>
          <span className="grey">+996</span>
        </li>
        <li
          data-code="la"
          data-prefix="+856"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag la" />
          <span className="country-name">
            Lao People&#39;s Democratic Republic
          </span>
          <span className="grey">+856</span>
        </li>
        <li
          data-code="lv"
          data-prefix="+371"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lv" />
          <span className="country-name">Latvia</span>
          <span className="grey">+371</span>
        </li>
        <li
          data-code="lb"
          data-prefix="+961"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lb" />
          <span className="country-name">Lebanon</span>
          <span className="grey">+961</span>
        </li>
        <li
          data-code="ls"
          data-prefix="+266"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ls" />
          <span className="country-name">Lesotho</span>
          <span className="grey">+266</span>
        </li>
        <li
          data-code="lr"
          data-prefix="+231"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lr" />
          <span className="country-name">Liberia</span>
          <span className="grey">+231</span>
        </li>
        <li
          data-code="ly"
          data-prefix="+218"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ly" />
          <span className="country-name">Libya</span>
          <span className="grey">+218</span>
        </li>
        <li
          data-code="li"
          data-prefix="+423"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag li" />
          <span className="country-name">Liechtenstein</span>
          <span className="grey">+423</span>
        </li>
        <li
          data-code="lt"
          data-prefix="+370"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lt" />
          <span className="country-name">Lithuania</span>
          <span className="grey">+370</span>
        </li>
        <li
          data-code="lu"
          data-prefix="+352"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lu" />
          <span className="country-name">Luxembourg</span>
          <span className="grey">+352</span>
        </li>
        <li
          data-code="mo"
          data-prefix="+853"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mo" />
          <span className="country-name">Macao</span>
          <span className="grey">+853</span>
        </li>
        <li
          data-code="mk"
          data-prefix="+389"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mk" />
          <span className="country-name">Macedonia</span>
          <span className="grey">+389</span>
        </li>
        <li
          data-code="mg"
          data-prefix="+261"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mg" />
          <span className="country-name">Madagascar</span>
          <span className="grey">+261</span>
        </li>
        <li
          data-code="mw"
          data-prefix="+265"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mw" />
          <span className="country-name">Malawi</span>
          <span className="grey">+265</span>
        </li>
        <li
          data-code="my"
          data-prefix="+60"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag my" />
          <span className="country-name">Malaysia</span>
          <span className="grey">+60</span>
        </li>
        <li
          data-code="mv"
          data-prefix="+960"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mv" />
          <span className="country-name">Maldives</span>
          <span className="grey">+960</span>
        </li>
        <li
          data-code="ml"
          data-prefix="+223"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ml" />
          <span className="country-name">Mali</span>
          <span className="grey">+223</span>
        </li>
        <li
          data-code="mt"
          data-prefix="+356"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mt" />
          <span className="country-name">Malta</span>
          <span className="grey">+356</span>
        </li>
        <li
          data-code="mh"
          data-prefix="+692"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mh" />
          <span className="country-name">Marshall Islands</span>
          <span className="grey">+692</span>
        </li>
        <li
          data-code="mq"
          data-prefix="+596"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mq" />
          <span className="country-name">Martinique</span>
          <span className="grey">+596</span>
        </li>
        <li
          data-code="mr"
          data-prefix="+222"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mr" />
          <span className="country-name">Mauritania</span>
          <span className="grey">+222</span>
        </li>
        <li
          data-code="mu"
          data-prefix="+230"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mu" />
          <span className="country-name">Mauritius</span>
          <span className="grey">+230</span>
        </li>
        <li
          data-code="yt"
          data-prefix="+262"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag yt" />
          <span className="country-name">Mayotte</span>
          <span className="grey">+262</span>
        </li>
        <li
          data-code="mx"
          data-prefix="+52"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mx" />
          <span className="country-name">Mexico</span>
          <span className="grey">+52</span>
        </li>
        <li
          data-code="fm"
          data-prefix="+691"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag fm" />
          <span className="country-name">Micronesia</span>
          <span className="grey">+691</span>
        </li>
        <li
          data-code="md"
          data-prefix="+373"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag md" />
          <span className="country-name">Moldova</span>
          <span className="grey">+373</span>
        </li>
        <li
          data-code="mc"
          data-prefix="+377"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mc" />
          <span className="country-name">Monaco</span>
          <span className="grey">+377</span>
        </li>
        <li
          data-code="mn"
          data-prefix="+976"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mn" />
          <span className="country-name">Mongolia</span>
          <span className="grey">+976</span>
        </li>
        <li
          data-code="me"
          data-prefix="+382"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag me" />
          <span className="country-name">Montenegro</span>
          <span className="grey">+382</span>
        </li>
        <li
          data-code="ms"
          data-prefix="+1664"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ms" />
          <span className="country-name">Montserrat</span>
          <span className="grey">+1664</span>
        </li>
        <li
          data-code="ma"
          data-prefix="+212"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ma" />
          <span className="country-name">Morocco</span>
          <span className="grey">+212</span>
        </li>
        <li
          data-code="mz"
          data-prefix="+258"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mz" />
          <span className="country-name">Mozambique</span>
          <span className="grey">+258</span>
        </li>
        <li
          data-code="mm"
          data-prefix="+95"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mm" />
          <span className="country-name">Myanmar</span>
          <span className="grey">+95</span>
        </li>
        <li
          data-code="na"
          data-prefix="+264"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag na" />
          <span className="country-name">Namibia</span>
          <span className="grey">+264</span>
        </li>
        <li
          data-code="nr"
          data-prefix="+674"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag nr" />
          <span className="country-name">Nauru</span>
          <span className="grey">+674</span>
        </li>
        <li
          data-code="np"
          data-prefix="+977"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag np" />
          <span className="country-name">Nepal</span>
          <span className="grey">+977</span>
        </li>
        <li
          data-code="nl"
          data-prefix="+31"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag nl" />
          <span className="country-name">Netherlands</span>
          <span className="grey">+31</span>
        </li>
        <li
          data-code="nc"
          data-prefix="+687"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag nc" />
          <span className="country-name">New Caledonia</span>
          <span className="grey">+687</span>
        </li>
        <li
          data-code="nz"
          data-prefix="+64"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag nz" />
          <span className="country-name">New Zealand</span>
          <span className="grey">+64</span>
        </li>
        <li
          data-code="ni"
          data-prefix="+505"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ni" />
          <span className="country-name">Nicaragua</span>
          <span className="grey">+505</span>
        </li>
        <li
          data-code="ne"
          data-prefix="+227"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ne" />
          <span className="country-name">Niger</span>
          <span className="grey">+227</span>
        </li>
        <li
          data-code="ng"
          data-prefix="+234"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ng" />
          <span className="country-name">Nigeria</span>
          <span className="grey">+234</span>
        </li>
        <li
          data-code="nu"
          data-prefix="+683"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag nu" />
          <span className="country-name">Niue</span>
          <span className="grey">+683</span>
        </li>
        <li
          data-code="nf"
          data-prefix="+672"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag nf" />
          <span className="country-name">Norfolk Island</span>
          <span className="grey">+672</span>
        </li>
        <li
          data-code="mp"
          data-prefix="+1670"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mp" />
          <span className="country-name">Northern Mariana Islands</span>
          <span className="grey">+1670</span>
        </li>
        <li
          data-code="no"
          data-prefix="+47"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag no" />
          <span className="country-name">Norway</span>
          <span className="grey">+47</span>
        </li>
        <li
          data-code="om"
          data-prefix="+968"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag om" />
          <span className="country-name">Oman</span>
          <span className="grey">+968</span>
        </li>
        <li
          data-code="pk"
          data-prefix="+92"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pk" />
          <span className="country-name">Pakistan</span>
          <span className="grey">+92</span>
        </li>
        <li
          data-code="pw"
          data-prefix="+680"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pw" />
          <span className="country-name">Palau</span>
          <span className="grey">+680</span>
        </li>
        <li
          data-code="ps"
          data-prefix="+970"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ps" />
          <span className="country-name">Palestine, State of</span>
          <span className="grey">+970</span>
        </li>
        <li
          data-code="pa"
          data-prefix="+507"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pa" />
          <span className="country-name">Panama</span>
          <span className="grey">+507</span>
        </li>
        <li
          data-code="pg"
          data-prefix="+675"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pg" />
          <span className="country-name">Papua New Guinea</span>
          <span className="grey">+675</span>
        </li>
        <li
          data-code="py"
          data-prefix="+595"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag py" />
          <span className="country-name">Paraguay</span>
          <span className="grey">+595</span>
        </li>
        <li
          data-code="pe"
          data-prefix="+51"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pe" />
          <span className="country-name">Peru</span>
          <span className="grey">+51</span>
        </li>
        <li
          data-code="ph"
          data-prefix="+63"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ph" />
          <span className="country-name">Philippines</span>
          <span className="grey">+63</span>
        </li>
        <li
          data-code="pn"
          data-prefix="+64"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pn" />
          <span className="country-name">Pitcairn</span>
          <span className="grey">+64</span>
        </li>
        <li
          data-code="pl"
          data-prefix="+48"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pl" />
          <span className="country-name">Poland</span>
          <span className="grey">+48</span>
        </li>
        <li
          data-code="pt"
          data-prefix="+351"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pt" />
          <span className="country-name">Portugal</span>
          <span className="grey">+351</span>
        </li>
        <li
          data-code="pr"
          data-prefix="+1787"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pr" />
          <span className="country-name">Puerto Rico</span>
          <span className="grey">+1787</span>
        </li>
        <li
          data-code="qa"
          data-prefix="+974"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag qa" />
          <span className="country-name">Qatar</span>
          <span className="grey">+974</span>
        </li>
        <li
          data-code="re"
          data-prefix="+262"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag re" />
          <span className="country-name">Réunion</span>
          <span className="grey">+262</span>
        </li>
        <li
          data-code="ro"
          data-prefix="+40"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ro" />
          <span className="country-name">Romania</span>
          <span className="grey">+40</span>
        </li>
        <li
          data-code="ru"
          data-prefix="+7"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ru" />
          <span className="country-name">Russian Federation</span>
          <span className="grey">+7</span>
        </li>
        <li
          data-code="rw"
          data-prefix="+250"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag rw" />
          <span className="country-name">Rwanda</span>
          <span className="grey">+250</span>
        </li>
        <li
          data-code="bl"
          data-prefix="+590"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag bl" />
          <span className="country-name">Saint Barthélemy</span>
          <span className="grey">+590</span>
        </li>
        <li
          data-code="sh"
          data-prefix="+290"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sh" />
          <span className="country-name">
            Saint Helena, Ascension and Tristan da Cunha
          </span>
          <span className="grey">+290</span>
        </li>
        <li
          data-code="kn"
          data-prefix="+1869"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag kn" />
          <span className="country-name">Saint Kitts and Nevis</span>
          <span className="grey">+1869</span>
        </li>
        <li
          data-code="lc"
          data-prefix="+1758"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lc" />
          <span className="country-name">Saint Lucia</span>
          <span className="grey">+1758</span>
        </li>
        <li
          data-code="mf"
          data-prefix="+590"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag mf" />
          <span className="country-name">Saint Martin</span>
          <span className="grey">+590</span>
        </li>
        <li
          data-code="pm"
          data-prefix="+508"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag pm" />
          <span className="country-name">Saint Pierre and Miquelon</span>
          <span className="grey">+508</span>
        </li>
        <li
          data-code="vc"
          data-prefix="+1784"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag vc" />
          <span className="country-name">Saint Vincent and the Grenadines</span>
          <span className="grey">+1784</span>
        </li>
        <li
          data-code="ws"
          data-prefix="+685"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ws" />
          <span className="country-name">Samoa</span>
          <span className="grey">+685</span>
        </li>
        <li
          data-code="sm"
          data-prefix="+378"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sm" />
          <span className="country-name">San Marino</span>
          <span className="grey">+378</span>
        </li>
        <li
          data-code="st"
          data-prefix="+239"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag st" />
          <span className="country-name">Sao Tome and Principe</span>
          <span className="grey">+239</span>
        </li>
        <li
          data-code="sa"
          data-prefix="+966"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sa" />
          <span className="country-name">Saudi Arabia</span>
          <span className="grey">+966</span>
        </li>
        <li
          data-code="sn"
          data-prefix="+221"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sn" />
          <span className="country-name">Senegal</span>
          <span className="grey">+221</span>
        </li>
        <li
          data-code="rs"
          data-prefix="+381"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag rs" />
          <span className="country-name">Serbia</span>
          <span className="grey">+381</span>
        </li>
        <li
          data-code="sc"
          data-prefix="+248"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sc" />
          <span className="country-name">Seychelles</span>
          <span className="grey">+248</span>
        </li>
        <li
          data-code="sl"
          data-prefix="+232"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sl" />
          <span className="country-name">Sierra Leone</span>
          <span className="grey">+232</span>
        </li>
        <li
          data-code="sg"
          data-prefix="+65"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sg" />
          <span className="country-name">Singapore</span>
          <span className="grey">+65</span>
        </li>
        <li
          data-code="sx"
          data-prefix="+1721"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sx" />
          <span className="country-name">Sint Maarten</span>
          <span className="grey">+1721</span>
        </li>
        <li
          data-code="sk"
          data-prefix="+421"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sk" />
          <span className="country-name">Slovakia</span>
          <span className="grey">+421</span>
        </li>
        <li
          data-code="si"
          data-prefix="+386"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag si" />
          <span className="country-name">Slovenia</span>
          <span className="grey">+386</span>
        </li>
        <li
          data-code="sb"
          data-prefix="+677"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sb" />
          <span className="country-name">Solomon Islands</span>
          <span className="grey">+677</span>
        </li>
        <li
          data-code="so"
          data-prefix="+252"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag so" />
          <span className="country-name">Somalia</span>
          <span className="grey">+252</span>
        </li>
        <li
          data-code="za"
          data-prefix="+27"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag za" />
          <span className="country-name">South Africa</span>
          <span className="grey">+27</span>
        </li>
        <li
          data-code="gs"
          data-prefix="+500"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag gs" />
          <span className="country-name">
            South Georgia and the South Sandwich Islands
          </span>
          <span className="grey">+500</span>
        </li>
        <li
          data-code="kr"
          data-prefix="+82"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag kr" />
          <span className="country-name">Korea</span>
          <span className="grey">+82</span>
        </li>
        <li
          data-code="ss"
          data-prefix="+211"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ss" />
          <span className="country-name">South Sudan</span>
          <span className="grey">+211</span>
        </li>
        <li
          data-code="es"
          data-prefix="+34"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag es" />
          <span className="country-name">Spain</span>
          <span className="grey">+34</span>
        </li>
        <li
          data-code="lk"
          data-prefix="+94"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag lk" />
          <span className="country-name">Sri Lanka</span>
          <span className="grey">+94</span>
        </li>
        <li
          data-code="sd"
          data-prefix="+249"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sd" />
          <span className="country-name">Sudan</span>
          <span className="grey">+249</span>
        </li>
        <li
          data-code="sr"
          data-prefix="+597"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sr" />
          <span className="country-name">Suriname</span>
          <span className="grey">+597</span>
        </li>
        <li
          data-code="sj"
          data-prefix="+4779"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sj" />
          <span className="country-name">Svalbard and Jan Mayen</span>
          <span className="grey">+4779</span>
        </li>
        <li
          data-code="sz"
          data-prefix="+268"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sz" />
          <span className="country-name">Swaziland</span>
          <span className="grey">+268</span>
        </li>
        <li
          data-code="se"
          data-prefix="+46"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag se" />
          <span className="country-name">Sweden</span>
          <span className="grey">+46</span>
        </li>
        <li
          data-code="ch"
          data-prefix="+41"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ch" />
          <span className="country-name">Switzerland</span>
          <span className="grey">+41</span>
        </li>
        <li
          data-code="sy"
          data-prefix="+963"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag sy" />
          <span className="country-name">Syrian Arab Republic</span>
          <span className="grey">+963</span>
        </li>
        <li
          data-code="tw"
          data-prefix="+886"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tw" />
          <span className="country-name">Taiwan</span>
          <span className="grey">+886</span>
        </li>
        <li
          data-code="tj"
          data-prefix="+992"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tj" />
          <span className="country-name">Tajikistan</span>
          <span className="grey">+992</span>
        </li>
        <li
          data-code="tz"
          data-prefix="+255"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tz" />
          <span className="country-name">Tanzania, United Republic of</span>
          <span className="grey">+255</span>
        </li>
        <li
          data-code="th"
          data-prefix="+66"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag th" />
          <span className="country-name">Thailand</span>
          <span className="grey">+66</span>
        </li>
        <li
          data-code="tl"
          data-prefix="+670"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tl" />
          <span className="country-name">Timor-Leste</span>
          <span className="grey">+670</span>
        </li>
        <li
          data-code="tg"
          data-prefix="+228"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tg" />
          <span className="country-name">Togo</span>
          <span className="grey">+228</span>
        </li>
        <li
          data-code="tk"
          data-prefix="+690"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tk" />
          <span className="country-name">Tokelau</span>
          <span className="grey">+690</span>
        </li>
        <li
          data-code="to"
          data-prefix="+676"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag to" />
          <span className="country-name">Tonga</span>
          <span className="grey">+676</span>
        </li>
        <li
          data-code="tt"
          data-prefix="+1868"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tt" />
          <span className="country-name">Trinidad and Tobago</span>
          <span className="grey">+1868</span>
        </li>
        <li
          data-code="tn"
          data-prefix="+216"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tn" />
          <span className="country-name">Tunisia</span>
          <span className="grey">+216</span>
        </li>
        <li
          data-code="tr"
          data-prefix="+90"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tr" />
          <span className="country-name">Turkey</span>
          <span className="grey">+90</span>
        </li>
        <li
          data-code="tm"
          data-prefix="+993"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tm" />
          <span className="country-name">Turkmenistan</span>
          <span className="grey">+993</span>
        </li>
        <li
          data-code="tc"
          data-prefix="+1649"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tc" />
          <span className="country-name">Turks and Caicos Islands</span>
          <span className="grey">+1649</span>
        </li>
        <li
          data-code="tv"
          data-prefix="+688"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag tv" />
          <span className="country-name">Tuvalu</span>
          <span className="grey">+688</span>
        </li>
        <li
          data-code="ug"
          data-prefix="+256"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ug" />
          <span className="country-name">Uganda</span>
          <span className="grey">+256</span>
        </li>
        <li
          data-code="ua"
          data-prefix="+380"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ua" />
          <span className="country-name">Ukraine</span>
          <span className="grey">+380</span>
        </li>
        <li
          data-code="ae"
          data-prefix="+971"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ae" />
          <span className="country-name">United Arab Emirates</span>
          <span className="grey">+971</span>
        </li>
        <li
          data-code="uy"
          data-prefix="+598"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag uy" />
          <span className="country-name">Uruguay</span>
          <span className="grey">+598</span>
        </li>
        <li
          data-code="uz"
          data-prefix="+998"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag uz" />
          <span className="country-name">Uzbekistan</span>
          <span className="grey">+998</span>
        </li>
        <li
          data-code="vu"
          data-prefix="+678"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag vu" />
          <span className="country-name">Vanuatu</span>
          <span className="grey">+678</span>
        </li>
        <li
          data-code="ve"
          data-prefix="+58"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ve" />
          <span className="country-name">Venezuela</span>
          <span className="grey">+58</span>
        </li>
        <li
          data-code="vn"
          data-prefix="+84"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag vn" />
          <span className="country-name">Viet Nam</span>
          <span className="grey">+84</span>
        </li>
        <li
          data-code="wf"
          data-prefix="+681"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag wf" />
          <span className="country-name">Wallis and Futuna</span>
          <span className="grey">+681</span>
        </li>
        <li
          data-code="eh"
          data-prefix="+212"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag eh" />
          <span className="country-name">Western Sahara</span>
          <span className="grey">+212</span>
        </li>
        <li
          data-code="ye"
          data-prefix="+967"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag ye" />
          <span className="country-name">Yemen</span>
          <span className="grey">+967</span>
        </li>
        <li
          data-code="zm"
          data-prefix="+260"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag zm" />
          <span className="country-name">Zambia</span>
          <span className="grey">+260</span>
        </li>
        <li
          data-code="zw"
          data-prefix="+263"
          onClick={this.changeSelectedCountry.bind(this)}
        >
          <span className="flag zw" />
          <span className="country-name">Zimbabwe</span>
          <span className="grey">+263</span>
        </li>
      </ul>
    );

    const countrySelectCmp = (
      <div className="text-download-link_input-wrapper">
        <div
          className="text-download-link_custom-select"
          onClick={ev => {
            ev.preventDefault();
            this.setState({ countrySelectOpen: !this.state.countrySelectOpen });
          }}
        >
          <div
            className={
              'text-download-link_custom-select_flag ' +
              this.state.selectedCountry
            }
          />
          <div className="text-download-link_custom-select_number is-bold">
            {this.state.selectedCountryPrefix}
          </div>
          <div
            className={
              this.state.countrySelectOpen
                ? 'text-download-link_custom-select_dropdown is-open'
                : 'text-download-link_custom-select_dropdown'
            }
          >
            <ul>
              <li
                data-code="us"
                data-prefix="+1"
                onClick={this.changeSelectedCountry.bind(this)}
              >
                <span className="flag us" />
                <span className="country-name">United States</span>
                <span className="grey">+1</span>
              </li>
              <li
                data-code="gb"
                data-prefix="+44"
                onClick={this.changeSelectedCountry.bind(this)}
                className="has-underline"
              >
                <span className="flag gb" />
                <span className="country-name">United Kingdom</span>
                <span className="grey">+44</span>
              </li>
              {countryList}
            </ul>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone number"
          onChange={this.handlePhoneNrChange.bind(this)}
        />
      </div>
    );

    const countrySelectCmp2 = (
      <div className="text-download-link_input-wrapper">
        <div
          className="text-download-link_custom-select"
          onClick={ev => {
            ev.preventDefault();
            this.setState({
              countrySelectOpen2: !this.state.countrySelectOpen2,
            });
          }}
        >
          <div
            className={
              'text-download-link_custom-select_flag ' +
              this.state.selectedCountry
            }
          />
          <div className="text-download-link_custom-select_number is-bold">
            {this.state.selectedCountryPrefix}
          </div>
          <div
            className={
              this.state.countrySelectOpen2
                ? 'text-download-link_custom-select_dropdown is-aligned-left is-open'
                : 'text-download-link_custom-select_dropdown is-aligned-left'
            }
          >
            <ul>
              <li
                data-code="us"
                data-prefix="+1"
                onClick={this.changeSelectedCountry2.bind(this)}
              >
                <span className="flag us" />
                <span className="country-name">United States</span>
                <span className="grey">+1</span>
              </li>
              <li
                data-code="gb"
                data-prefix="+44"
                onClick={this.changeSelectedCountry2.bind(this)}
                className="has-underline"
              >
                <span className="flag gb" />
                <span className="country-name">United Kingdom</span>
                <span className="grey">+44</span>
              </li>
              {countryList}
            </ul>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter phone number"
          onChange={this.handlePhoneNrChange.bind(this)}
        />
      </div>
    );

    return (
      <div className="container-fluid has-no-side-paddings">
        <div className="container">
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
        <div className="container container-x-overflow-visible container-hero marginTop--32">
          <div className="row">
            <div className="container-hero_text-wrapper">
              <h1 className="is-bold is-primary marginBottom--30 marginTop--64 marginTop--80_mobile is-centered_mobile">
                Never take call notes again
              </h1>
              <div className="text-download-link">
                <p className="is-tertiary marginBottom--32 is-centered_mobile paddingLeftRight--16_mobile">
                  Tetra uses AI to take notes on phone calls, to help you focus,
                  remember the details, and keep your team in sync.
                </p>
                <div className="desktop-hidden">
                  <Link
                    to="https://itunes.apple.com/us/app/tetra-automatic-call-notes/id1257309590?ls=1&mt=8"
                    target="_blank"
                  >
                    <img
                      src={appStoreDownload}
                      alt="app_store_download"
                      className="img-responsive margin-auto"
                    />
                  </Link>
                </div>
                <div className="text-download-link_action-wrapper is-aligned-left mobile-hidden">
                  {countrySelectCmp}
                  {branchSubmitBtnCmp}
                </div>
                {this.state.displayBranchErrorMessage
                  ? <div className="is-medium displayed-block is-secondary marginTop--16">
                      {this.state.branchErrorMessage}
                    </div>
                  : null}
              </div>
              <div className="marginTop--40 mobile-hidden">
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
            <div className="mobile-hidden container-hero_image-wrapper">
              <img
                className="img-responsive"
                src={heroPhone}
                alt="hero_image"
              />
              <div className="container-hero_mobile_bg_text">
                Nik<br />
                Got it, cool. And in the lifecycle of a research project, how
                many times do you actually find yourself referring back to the
                notes? What happens after the project?<br />
                <br />
                Jon<br />
                Yeah that&#39;s a good question. I think it depends on the
                complexity of the research. If it&#39;s like a quick concept
                test that I might refer to it once or twice to prepare the
                presentation. If it&#39;s a more involved field study I might be
                going through it many times and trying to decode and try to
                notice things I didn&#39;t notice the first time.<br />
                <br />
                Nik<br />
                You mentioned a couple of times that there might be a couple of
                people involved in the team. Do you ever share the raw
                transcript?<br />
              </div>
            </div>
            <div className="desktop-hidden marginTop--80_mobile container-hero_image-wrapper">
              <img
                className="img-responsive"
                src={heroPhoneMobile}
                alt="hero_image"
              />
              <div className="container-hero_mobile_bg_text">
                Nik<br />
                Got it, cool. And in the lifecycle of a research project, how
                many times do you actually find yourself referring back to the
                notes? What happens after the project?<br />
                <br />
                Jon<br />
                Yeah that&#39;s a good question. I think it depends on the
                complexity of the research. If it&#39;s like a quick concept
                test that I might refer to it once or twice to prepare the
                presentation. If it&#39;s a more involved field study I might be
                going through it many times and trying to decode and try to
                notice things I didn&#39;t notice the first time.<br />
                <br />
                Nik<br />
                You mentioned a couple of times that there might be a couple of
                people involved in the team. Do you ever share the raw
                transcript?<br />
              </div>
            </div>
          </div>
        </div>
        <div className="container container-3-steps marginBottom--56">
          <div className="row">
            <div className="col-xs-12 col-md-5 mobile-hidden">
              <img
                className="img-responsive"
                src={threeStepMobile}
                alt="3_steps_image"
              />
            </div>
            <div className="col-xs-12 col-md-7 paddingLeft--56 paddingLeft--16_mobile is-centered_mobile">
              <h2 className="is-bold is-primary marginBottom--64">
                Capture the details on your calls with artificial intelligence
              </h2>
              <div className="three-step_single-step has-vertical-line">
                <div className="three-step_single-step_number is-medium is-secondary">
                  1
                </div>
                <div className="three-step_single-step_text">
                  <h3 className="is-bold is-primary marginBottom--8 marginTop--0">
                    Call through the app
                  </h3>
                  <p className="is-text-sized is-tertiary marginBottom--48">
                    High definition VoIP connects you to your recipient with
                    crystal clear<br />audio quality, all over WiFi or 4G.
                  </p>
                </div>
              </div>
              <div className="three-step_single-step has-vertical-line">
                <div className="three-step_single-step_number is-medium is-secondary">
                  2
                </div>
                <div className="three-step_single-step_text">
                  <h3 className="is-bold is-primary marginBottom--8 marginTop--0">
                    Tag important moments
                  </h3>
                  <p className="is-text-sized is-tertiary marginBottom--48">
                    Save highlights and action items with a single tap, to skip
                    the busywork<br />and never miss a follow up again.
                  </p>
                </div>
              </div>
              <div className="three-step_single-step">
                <div className="three-step_single-step_number is-medium is-secondary">
                  3
                </div>
                <div className="three-step_single-step_text">
                  <h3 className="is-bold is-primary marginBottom--8 marginTop--0">
                    Get notes and share
                  </h3>
                  <p className="is-text-sized is-tertiary marginBottom--48">
                    Keep everyone on the same page by sharing Tetra notes with
                    team<br />members, even if they couldn&#39;t make the call.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-5 desktop-hidden">
              <img
                className="img-responsive"
                src={threeStepMobileMobile}
                alt="3_steps_image"
              />
            </div>
          </div>
        </div>
        <div className="container container-3-features marginBottom--100">
          <div className="row">
            <div className="col-xs-12 col-md-5 is-centered_mobile">
              <h4 className="is-secondary marginBottom--24 marginTop--80 marginTop--0_mobile is-extra-spaced">
                FOCUS
              </h4>
              <h2 className="is-primary is-bold marginBottom--24">
                Focus on the conversation
              </h2>
              <p className="is-tertiary">
                Engage in the discussion, without getting distracted writing it
                all down. Tetra recognizes the entire conversation so you’ll
                never forget a date or miss a follow-up later.
              </p>
            </div>
            <div className="col-xs-12 col-md-5 col-md-offset-2">
              <img
                className="img-responsive width-85_mobile"
                src={threeSectionFocus}
                alt="focus"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-5 mobile-hidden">
              <img
                className="img-responsive"
                src={threeSectionRemember}
                alt="focus"
              />
            </div>
            <div className="col-xs-12 col-md-5 col-md-offset-1 is-centered_mobile">
              <h4 className="is-secondary marginBottom--24 marginTop--80 is-extra-spaced">
                REMEMBER
              </h4>
              <h2 className="is-primary is-bold marginBottom--24">
                Remember the details
              </h2>
              <p className="is-tertiary">
                Instantly jump back to key moments in your conversation with
                automatic summarization and smart natural language search.
              </p>
            </div>
            <div className="col-xs-12 col-md-5 desktop-hidden">
              <img
                className="img-responsive width-85_mobile"
                src={threeSectionRemember}
                alt="focus"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-5 is-centered_mobile">
              <h4 className="is-secondary marginBottom--24 marginTop--80 is-extra-spaced">
                SHARE
              </h4>
              <h2 className="is-primary is-bold marginBottom--24">
                Share knowledge with the team
              </h2>
              <p className="is-tertiary">
                Tetra helps you keep an accurate record of everything that
                happened and hear the voice of the customer directly, so your
                team can focus on what matters.
              </p>
            </div>
            <div className="col-xs-12 col-md-5 col-md-offset-2">
              <img
                className="img-responsive width-85_mobile"
                src={threeSectionShare}
                alt="focus"
              />
            </div>
          </div>
        </div>

        <div className="container-fluid container-8-features paddingTop--100 paddingBottom--100 paddingTop--48_mobile paddingBottom--48_mobile">
          <div className="container">
            <div className="row">
              <FeatureComponent
                heading="Speed"
                paragraph="Get notes from most meetings within 10 minutes after the call."
                imgAlt="speed_icon"
                imgSrc={eightFeaturesSpeed}
              />
              <FeatureComponent
                heading="Accuracy"
                paragraph="Superior speech recognition, powered by research-grade deep learning. "
                imgAlt="accuracy_icon"
                imgSrc={eightFeaturesAccuracy}
              />
              <FeatureComponent
                heading="Speaker labels"
                paragraph="Remember who said what with two-way speaker labelling."
                imgAlt="labels_icon"
                imgSrc={eightFeaturesSpeakerLabels}
              />
              <FeatureComponent
                heading="Highlights"
                paragraph="Tag important moments and highlights with a single tap, on-call or after the fact."
                imgAlt="highlights_icon"
                imgSrc={eightFeaturesHighlights}
              />
              <FeatureComponent
                heading="Keywords"
                paragraph="Organize meetings effortlessly with automatically extracted topics."
                imgAlt="keywords_icon"
                imgSrc={eightFeaturesKeywords}
              />
              <FeatureComponent
                heading="Search"
                paragraph="Jump back to key moments and recall facts and figures with powerful search."
                imgAlt="search_icon"
                imgSrc={eightFeaturesSearch}
              />
              <FeatureComponent
                heading="Google Calendar Sync"
                paragraph="Dial into scheduled calls and conferences with a single tap."
                imgAlt="calendar_icon"
                imgSrc={eightFeaturesCalendar}
              />
              <FeatureComponent
                heading="Magic highlights"
                paragraph="Automatic summaries so you can effortlessly remember what’s important."
                imgAlt="magic_highlights_icon"
                imgSrc={eightFeaturesMagicHighlights}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid container-integrations paddingTop--100 paddingBottom--100 paddingTop--48_mobile paddingBottom--48_mobile">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-5">
                <h2 className="desktop-hidden is-bold is-contrast-primary marginBottom--56_mobile">
                  Frequently asked questions
                </h2>
                <div className="displayed-flex displayed-flex_align-start marginBottom--48">
                  <img
                    className="img-responsive displayed-inline-block marginRight--32 mobile-hidden"
                    src={lockIcon}
                    alt="lock_icon"
                  />
                  <div className="displayed-inline-block">
                    <h3 className="is-bold is-contrast-primary marginTop--0">
                      How does Tetra keep my data secure?
                    </h3>
                    <p className="is-contrast-secondary is-text-sized">
                      We use industry standard encryption to keep your data
                      secure, in our Amazon storage servers and with HTTPS
                      connections to our website. No humans are ever involved to
                      create your transcripts.
                    </p>
                  </div>
                </div>
                <div className="displayed-flex displayed-flex_align-start">
                  <img
                    className="img-responsive displayed-inline-block marginRight--32 mobile-hidden"
                    src={microphoneIcon}
                    alt="microphone_icon"
                  />
                  <div className="displayed-inline-block">
                    <h3 className="is-bold is-contrast-primary marginTop--0">
                      Is it illegal to record a call?
                    </h3>
                    <p className="is-contrast-secondary is-text-sized">
                      By default, Tetra announces to your recipient that a
                      recording is taking place — for legal purposes in
                      “two-party consent” states, and to be polite! You may
                      disable this announcement as long as you stay compliant
                      with local law or get recording consent yourself.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-md-offset-1 mobile-hidden">
                <div className="with-border with-border_has-radius padding--56">
                  <h3 className="is-bold is-contrast-primary marginTop--0 marginBottom--16">
                    Does Tetra integrate with Skype, Slack, or GoToMeeting?
                  </h3>
                  <p className="is-contrast-secondary is-text-sized marginBottom--24">
                    Not yet! Support for other calling platforms is on the
                    roadmap, vote below to help us prioritize integrations and
                    to receive early access.{' '}
                  </p>
                  <p className="is-contrast-primary is-text-sized marginBottom--8">
                    {this.state.integrationText}
                  </p>
                  {integrationIconsCmp}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid container-integrations paddingTop--100 paddingBottom--100 paddingTop--48_mobile paddingBottom--48_mobile desktop-hidden has-lighter-bg">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-6 col-md-offset-1">
                <h3 className="is-bold is-contrast-primary marginTop--0 marginBottom--16">
                  Does Tetra integrate with Skype, Slack, or GoToMeeting?
                </h3>
                <p className="is-contrast-secondary is-text-sized marginBottom--24">
                  Not yet! Support for other calling platforms is on the
                  roadmap, vote below to help us prioritize integrations and to
                  receive early access.{' '}
                </p>
                <p className="is-contrast-primary is-text-sized marginBottom--8">
                  {this.state.integrationText}
                </p>
                {integrationIconsCmp}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid container-carousel paddingTop--80 paddingBottom--80 paddingTop--48_mobile paddingBottom--48_mobile">
          <div className="container">
            <Carousel data={this.state.carouselData} />
          </div>
        </div> */}
        <div className="container container-try-free paddingTop--144 paddingBottom--144 paddingTop--72_mobile paddingBottom--0_mobile">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2 is-centered">
              <h2 className="is-primary is-bold marginBottom--16 marginTop--0">
                Try the future of business calls risk-free
              </h2>
              <div className="text-download-link marginBottom--56">
                <p className="is-tertiary marginBottom--48">
                  Tetra gives you 60 trial minutes for test calls when you get
                  started.
                </p>
                <div className="text-download-link_action-wrapper mobile-hidden">
                  {countrySelectCmp2}
                  {branchSubmitBtnCmp}
                </div>
                {this.state.displayBranchErrorMessage
                  ? <div className="is-medium displayed-block is-secondary marginTop--16">
                      {this.state.branchErrorMessage}
                    </div>
                  : null}
              </div>
              <Link
                to="https://itunes.apple.com/us/app/tetra-automatic-call-notes/id1257309590?ls=1&mt=8"
                target="_blank"
              >
                <img
                  src={appStoreDownload}
                  alt="app_store_download"
                  className="img-responsive margin-auto"
                />
              </Link>
            </div>
            <div className="col-xs-12 desktop-hidden paddingLeft--0 paddingRight--0 marginTop--64_mobile mobile-footer-phone-img">
              <img
                src={tryForFreeMobile}
                alt="phone_image"
                className="img-responsive image-no-side-margins"
              />
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
                    <Link
                      to="https://angel.co/tetra"
                      target="_blank"
                      className="marginBottom--8 is-text-sized"
                    >
                      AngelList
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Script
          url="https://cdn.branch.io/branch-latest.min.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </div>
    );
  }
}

export default compose(withIntercom(), setTheme('marketing'))(Homepage);
