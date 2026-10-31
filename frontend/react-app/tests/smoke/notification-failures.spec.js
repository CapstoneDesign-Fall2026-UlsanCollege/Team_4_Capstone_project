import { test, expect } from '@playwright/test';

const notificationModule = `
  export function watchNotifications(user, receive, fail) {
    window.deliverInbox = receive;
    queueMicrotask(() => receive([], { fromCache: false }));
    return () => {};
  }
  export async function markNotificationsRead() { if (window.rejectRead) throw new Error('Read acknowledgement failed. Retry.'); }
  export async function ensureSuggestionNotification() {}
  export const notificationError = error => error.message;
`;
const suggestionModule = `
  export function watchMySuggestions(user, receive, fail) {
    window.failSuggestions = fail;
    window.suggestionSubscriptions = (window.suggestionSubscriptions || 0) + 1;
    queueMicrotask(() => receive([]));
    return () => {};
  }
`;

async function fixture(page, context) {
  await context.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await context.route('**/notification-component-check.html', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><body><main id="test"></main></body></html>' }));
  await context.route('**/src/notifications-store.js*', route => route.fulfill({ contentType: 'text/javascript', body: notificationModule }));
  await context.route('**/src/suggestions-store.js*', route => route.fulfill({ contentType: 'text/javascript', body: suggestionModule }));
  await page.goto('/notification-component-check.html');
  await page.evaluate(async () => {
    const { default: refresh } = await import('/@react-refresh');
    refresh.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {}; window.$RefreshSig$ = () => type => type;
    window.__vite_plugin_react_preamble_installed__ = true;
    const react = await import('/node_modules/.vite/deps/react.js'), client = await import('/node_modules/.vite/deps/react-dom_client.js');
    window.fixtureElement = (react.default || react).createElement;
    window.fixtureRoot = (client.default || client).createRoot(document.getElementById('test'));
  });
}

async function inbox(page, context) {
  await fixture(page, context);
  await page.evaluate(async () => {
    const { default: Notifications } = await import('/src/Notifications.jsx');
    window.fixtureRoot.render(window.fixtureElement(Notifications, { user: { id: 'alice', name: 'Alice' }, onOpen: () => {} }));
  });
  await page.getByRole('button', { name: 'Notifications', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Notifications', exact: true })).toContainText('No recent notifications here.');
}

test('a suggestion subscription error survives unrelated inbox updates until retry', async ({ page, context }) => {
  await inbox(page, context);
  await page.evaluate(() => window.failSuggestions('Simulated subscription failure'));
  await expect(page.getByRole('alert')).toContainText('Suggestion notifications could not connect');
  await page.evaluate(() => window.deliverInbox([{ id: 'comment_post_c1', kind: 'comment', parentId: 'post', sourceId: 'c1', actorId: 'bob', actorName: 'Bob', title: '', createdAt: Date.now(), readAt: 0 }], { fromCache: false }));
  await expect(page.getByRole('dialog')).toContainText('Bob commented on your post');
  await expect(page.getByRole('alert')).toContainText('Suggestion notifications could not connect');
  await page.getByRole('button', { name: 'Retry notifications' }).click();
  await expect.poll(() => page.evaluate(() => window.suggestionSubscriptions)).toBe(2);
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('a failed read acknowledgement survives background refresh and can be retried', async ({ page, context }) => {
  await inbox(page, context);
  await page.evaluate(() => {
    window.rejectRead = true;
    window.notificationRows = [{ id: 'comment_post_c1', kind: 'comment', parentId: 'post', sourceId: 'c1', actorId: 'bob', actorName: 'Bob', title: '', createdAt: Date.now(), readAt: 0, stamp: 'fixture-stamp' }];
    window.deliverInbox(window.notificationRows, { fromCache: false });
  });
  const mark = page.getByRole('button', { name: 'Mark recent notifications as read' });
  await mark.click();
  await expect(page.getByRole('alert')).toContainText('Read acknowledgement failed');
  await page.evaluate(() => {
    window.notificationRows = window.notificationRows.map(row => ({ ...row, actorName: 'Bob Updated' }));
    window.deliverInbox(window.notificationRows, { fromCache: false });
  });
  await expect(page.getByRole('dialog')).toContainText('Bob Updated commented on your post');
  await expect(page.getByRole('alert')).toContainText('Read acknowledgement failed');
  await expect(page.getByRole('button', { name: /^Notifications,/ })).toHaveAttribute('aria-label', /1 unread recent/);
  await page.evaluate(() => { window.rejectRead = false; });
  await mark.click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Notifications', exact: true })).toBeVisible();
});

async function messages(page, context, ready) {
  await fixture(page, context);
  await page.evaluate(async ready => {
    await import('/src/shared-feed.css');
    const { default: SharedMessages } = await import('/src/SharedMessages.jsx');
    window.renderMessages = ready => window.fixtureRoot.render(window.fixtureElement(SharedMessages, {
      user: { id: 'alice', name: 'Alice' }, profiles: [], connections: [], query: '', ready,
      connectionsReady: ready, inbox: {}, unread: () => false, drafts: {}, onDraft: () => {},
      notification: { userId: 'alice', requestId: 'removed-request', item: { kind: 'message', parentId: 'alice_removed' } },
    }));
    window.renderMessages(ready);
  }, ready);
}

test('a removed conversation has a visible fallback on desktop and mobile', async ({ page, context }) => {
  await messages(page, context, true);
  await expect(page.getByRole('status')).toContainText('This conversation is unavailable in your current connections.');
  await expect(page.getByRole('textbox', { name: 'Message text' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Back to conversations', exact: true }).click();
  await expect(page.getByRole('complementary', { name: 'Conversations', exact: true })).toBeVisible();
  await expect(page.getByText('No accepted friends yet', { exact: true })).toBeVisible();
});

test('a conversation waits for server connections before declaring a target unavailable', async ({ page, context }) => {
  await messages(page, context, false);
  await expect(page.getByRole('status')).toContainText('Loading conversation');
  await expect(page.getByText('This conversation is unavailable in your current connections.')).toHaveCount(0);
  await page.evaluate(() => window.renderMessages(true));
  await expect(page.getByRole('status')).toContainText('This conversation is unavailable in your current connections.');
});
