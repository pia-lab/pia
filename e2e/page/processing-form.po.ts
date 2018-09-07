import { browser, by, element, protractor } from 'protractor';

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
    if (fieldId === 'processing-storage') {
     await this.dataSection();
    }

    if (fieldId === 'processing-lifecycle') {
      await this.lifecycleSection();
    }

    const field = element(by.css('#' + fieldId));
    // wait for element to be in the DOM and visible
    browser.wait(protractor.ExpectedConditions.presenceOf(field), 5000);
    browser.wait(protractor.ExpectedConditions.visibilityOf(field), 5000);

    // Scroll to element
    browser.actions().mouseMove(field).perform();
    browser.executeScript('arguments[0].scrollIntoView()', field);

    await field.click();

    // fill tinymce editor
    browser.executeScript('tinyMCE.activeEditor.setContent("' + value + '")');
    // focus out to close editor
    await this.focusOut();
  }

  async getValue() {
    const values = {};

    await this.descriptionSection();

    // tslint:disable-next-line:forin
    for (const key in this.fields) {
      const fieldId = this.fields[key];

      if (fieldId === 'processing-storage') {
        await this.dataSection();
      }

      if (fieldId === 'processing-lifecycle') {
        await this.lifecycleSection();
      }

      if (fieldId === 'processing-data-types') {
        continue;
      }

      values[fieldId] = await element(by.id(fieldId)).getAttribute('value');
    }

    return values;
  }

  focusOut() {
    return element(by.css('div.processing-entryContentBlock-header-title')).click();
  }

  descriptionSection() {
    return element(by.css('div.description-section')).click();
  }

  dataSection() {
    return element(by.css('div.data-section')).click();
  }

  lifecycleSection() {
    return element(by.css('div.lifecycle-section')).click();
  }

}
