import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nypr-svg', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{nypr-svg}}`);
    assert.equal(this.element.textContent.trim(), '', 'renders nothing with no inputs');

    await render(hbs`{{nypr-svg icon="whatever"}}`);
    assert.ok('renders ok with a bad filename');
  });
});
