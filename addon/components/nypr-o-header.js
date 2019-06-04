// BEGIN-SNIPPET nypr-o-header.js
import Component from '@ember/component';
import { debounce, bind } from '@ember/runloop';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { inject } from '@ember/service';
import layout from '../templates/components/nypr-o-header';


const DEBOUNCE_TIMER = 75;
const DOWN = 'down';
const UP = 'up';

/**
 Site header

 See [usage docs](/docs/organisms/nypr-o-header) for more.

 @class nypr-o-header
 @yield {Hash} hash
 @yield {Block} hash.leaderboard `nypr-o-header/leaderboard`
 @yield {Boolean} hash.outOfViewport
 @yield {Component} hash.menu `nypr-o-header/menu`
 @yield {Block} hash.menu.branding `blank-template`
 @yield {Component} hash.menu.primaryNav `nypr-o-header/nav`
 @yield {Component} hash.menu.social `nypr-m-share-tools`
 @yield {Component} hash.menu.secondaryNav `nypr-m-secondary-nav`
 @yield {Component} hash.menu.search `nypr-m-inline-search`
 @yield {Component} hash.menu.tipButton `nypr-a-button`
 @yield {Component} hash.left `nypr-o-header/left`
 @yield {Block} hash.left.branding `blank-template`
 @yield {Block} hash.left.headline `nypr-o-header/headline`
 @yield {Component} hash.nav `nypr-o-header/nav`
 @yield {Component} hash.right `nypr-o-header/right`
 @yield {Component} hash.right.search `nypr-m-inline-search`
 @yield {Object} hash.rules Current ruleset as generated by `service:nypr-o-header`
*/
export default Component.extend({
  layout,
  tagName: 'header',
  classNames: ['c-main-header'],
  classNameBindings: ['isOpen:side-menu-is-active', 'outOfViewport'],
  attributeBindings: ['spacerHeight:style'],

  headerService: inject('nypr-o-header'),

  /**
    Controls whether the side menu is open

    @field isOpen
    @type {Boolean}
  */
  isOpen: false,

  /**
    Indicates whether or not the header has been scrolled up, out of the viewport.

    @field outOfViewport
    @type {Boolean}
  */
  outOfViewport: false,

  /**
    CSS Selector to target for "out of viewport" state

    @argument floatLandmark
    @type {String}
  */

  /**
    Offset for menu height to make room for an ad at the top of the screen

    @field menuHeightOffset
    @type {Number}
  */
  menuHeightOffset: 0,

  init() {
    this._super(...arguments);

    this.headerService.register(this);
  },

  didInsertElement() {
    this._super(...arguments);

    this._boundListener = bind(this, '_scrollListener');
    window.addEventListener('scroll', this._boundListener);
  },

  willDestroyElement() {
    this._super(...arguments);

    window.removeEventListener('scroll', this._boundListener);
    // test cleanup
    document.body.classList.remove('side-menu-is-active');
  },

  /**
   Computes current vertical spacing of the header to prevent proceding elements from moving up
   or down when the header is removed from/added to the document flow.

   Returned as an inline CSS declaration

   @accessor spacerHeight
   @type {String}
  */
  spacerHeight: computed('outOfViewport', function() {
    let style = '';
    if (typeof FastBoot === 'undefined' && this.outOfViewport) {
      let { height } = this.element.getBoundingClientRect();
      style = `height: ${height}px;`;
    }
    return htmlSafe(style);
  }),
  /**
   Toggle open menu state and corresponding state class on body element

   @method toggleMenu
   @param {Boolean} force optional boolean value to set the value instead of toggling it
   @param {Event} e click event
   @return {void}
  */
  toggleMenu(force, _e) { // eslint-disable-line no-unused-vars
    // arg order can change depending where it's called
    if (force instanceof Event) {
      _e = force;
      force = undefined;
    }
    if (typeof force === 'boolean') {
      this.set('isOpen', force);
    } else {
      this.toggleProperty('isOpen');
    }

    document.body.classList.toggle('side-menu-is-active', force);

    if (this.isOpen === true){
      this.focusMenu();
      this.setMenuHeightOffset();
    }
  },

  /**
    Measure vertical space taken up by leaderboard ad, if any.
    It's the top of the screen, so the offsetTop of the header wrapper will give us the desired value

    @method setMenuHeightOffset
    @return {void}
  */
  setMenuHeightOffset() {
    let header = this.element.querySelector('#header-inner');
    if (header) {
      this.set('menuHeightOffset', header.offsetTop);
    }
  },

  /**
    Focus on the side menu
    For accessibility, so screenreaders go to the menu once it is open

    @method focusMenu
    @return {void}
  */
  focusMenu(){
    let menu = this.element.querySelector(".c-side-menu__aria-begin");
    menu.setAttribute('tabIndex', -1);
    menu.focus();
  },

  /**
    Measures whether the bottom of the element is out of the viewport

    @method _scrollListener
    @param {EventObject} event
    @return {void}
  */
  _scrollListener(/* e */) {
    let direction;
    let lastScroll = window.pageYOffset;
    debounce(this, () => {
      if (lastScroll < window.pageYOffset) {
        direction = this._lastDirection = DOWN;
      } else if (lastScroll > window.pageYOffset) {
        direction = this._lastDirection = UP;
      } else {
        direction = this._lastDirection;
      }

      let el;
      if (this.floatLandmark) {
        el = document.querySelector(this.floatLandmark);
      }
      if (!el && this.element) {
        el = this.element;
      } else if (!el) {
        return;
      }

      let { top, height } = el.getBoundingClientRect();
      let { paddingBottom } = window.getComputedStyle(el);

      let threshold = direction === DOWN ? 0 : height - parseInt(paddingBottom, 10);

      this.set('outOfViewport', top + height < threshold);
    }, DEBOUNCE_TIMER);
  }
});
// END-SNIPPET
