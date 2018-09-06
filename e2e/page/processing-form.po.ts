import { browser, by, element } from 'protractor';
import { filterEffects } from 'ngx-drag-drop/dnd-utils';

export class ProcessingForm {

  private fields = [
    'processing-description',
    'processing-standards',
    'processing-data-types',
    'processing-storage',
    'processing-lifecycle',
    'processing-processors',
    'processing-non-eu-transfer'
  ];

  navigateTo(processingId: any) {
    return browser.get('/#/processing/' + processingId);
  }

  clickOnReturn() {
    return  element(by.css('a.pia-icon-close-big')).click();
  }

  async fill(data: any) {
    // tslint:disable-next-line:forin
    for (const key in data) {
      if (key !== 'processing-data-types') {
        await this.fillField(key, data[key]);
      }
    }
  }

  async fillField(fieldId: string, value: any) {
    console.log('fill field', fieldId);
    if (fieldId === 'processing-storage' || fieldId === 'processing-lifecycle') {
      await this.nextSection();
      browser.sleep(1000);
    }

    const field = element(by.css('#' + fieldId));
    // Scroll to element
    browser.executeScript('arguments[0].scrollIntoView()', field);

    await field.click();
    console.log('field clicked');

    // fill tinymce editor
    browser.executeScript('tinyMCE.activeEditor.setContent("' + value + '")');
    // focus out to close editor
    this.focusOut();
  }

  async getValue() {
    const values = {};

    await this.resetSection();

    // tslint:disable-next-line:forin
    for (const key in this.fields) {
      const fieldId = this.fields[key];

      if (fieldId === 'processing-storage' || fieldId === 'processing-lifecycle') {
        await this.nextSection();
        browser.sleep(1000);
      }

      if (fieldId === 'processing-data-types') {
        return;
      }

      const field = element(by.id(fieldId));

      browser.executeScript('arguments[0].scrollIntoView()', field);
console.log('getValue', fieldId);
      const value = await field.getAttribute('value');
      console.log('value: ', value);
      values[fieldId] = value;
    }

    return values;
  }

  async nextSection() {
    console.log('nextSection');
    browser.sleep(1000);
    return await element(by.css('a.processing-next')).click();
  }

  async resetSection() {
    await element(by.css('a.processing-previous')).click();
    return await element(by.css('a.processing-previous')).click()
  }

  focusOut() {
    console.log('focus out');
    element(by.css('div.processing-entryContentBlock-header-title')).click();
  }

}
