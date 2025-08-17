/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

describe('DairyHub Frontend', () => {
  let html;
  beforeAll(() => {
    html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;
  });

  it('should have a meta description', () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta.content.length).toBeGreaterThan(10);
  });

  it('should have a navbar with categories', () => {
    const nav = document.getElementById('categoryNav');
    expect(nav).not.toBeNull();
    expect(nav.querySelectorAll('a[role="menuitem"]').length).toBeGreaterThan(0);
  });
});
