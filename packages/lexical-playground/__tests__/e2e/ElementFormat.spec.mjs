/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {moveLeft} from '../keyboardShortcuts/index.mjs';
import {
  assertHTML,
  focusEditor,
  html,
  initialize,
  selectFromAlignDropdown,
  test,
} from '../utils/index.mjs';

test.describe('Element format', () => {
  test.beforeEach(({isCollab, isPlainText, page}) => {
    test.skip(isPlainText);
    initialize({isCollab, page});
  });

  test('can indent/align paragraph when caret is within link', async ({
    page,
    isPlainText,
  }) => {
    await focusEditor(page);
    await page.keyboard.type('Hello https://lexical.io world');
    await moveLeft(page, 10);
    await selectFromAlignDropdown(page, '.indent');
    await selectFromAlignDropdown(page, '.indent');
    await selectFromAlignDropdown(page, '.center-align');

    await assertHTML(
      page,
      html`
        <p
          class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
          style="padding-inline-start: 80px; text-align: center;"
          dir="ltr">
          <span data-lexical-text="true">Hello</span>
          <a
            href="https://lexical.io"
            class="PlaygroundEditorTheme__link PlaygroundEditorTheme__ltr"
            dir="ltr">
            <span data-lexical-text="true">https://lexical.io</span>
          </a>
          <span data-lexical-text="true">world</span>
        </p>
      `,
      {
        ignoreClasses: false,
        ignoreInlineStyles: false,
      },
    );
  });
});
