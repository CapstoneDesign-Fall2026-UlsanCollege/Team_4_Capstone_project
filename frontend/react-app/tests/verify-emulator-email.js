import assert from 'node:assert/strict';

// Exercises the emulator's verification-code handler; never marks a live user verified.
export async function verifyEmulatorEmail(page) {
  assert.match(page.url(), /^http:\/\/(127\.0\.0\.1|localhost):\d+\//);
  await page.waitForFunction(() => window.campusFirebaseAuth?.auth.currentUser);
  const config = await page.evaluate(() => {
    const auth = window.campusFirebaseAuth.auth;
    return { project: auth.app.options.projectId, emulator: auth.emulatorConfig,
      email: auth.currentUser.email, apiKey: auth.app.options.apiKey };
  });
  assert.equal(config.project, 'demo-campusvibe-feed');
  assert.ok(config.emulator && ['127.0.0.1','localhost'].includes(config.emulator.host));
  const origin = `http://${config.emulator.host}:${config.emulator.port}`;
  let code;
  for (let attempt = 0; attempt < 60; attempt++) {
    const response = await fetch(`${origin}/emulator/v1/projects/${config.project}/oobCodes`);
    assert.equal(response.status, 200);
    const records = (await response.json()).oobCodes || [];
    code = records.filter(item => item.email === config.email && item.requestType === 'VERIFY_EMAIL').at(-1)?.oobCode;
    if (code) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(code, 'Signup must request a verification email before the emulator fixture can continue.');
  const response = await fetch(`${origin}/identitytoolkit.googleapis.com/v1/accounts:update?key=${config.apiKey}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ oobCode: code }),
  });
  assert.equal(response.status, 200, 'The emulator verification code must be valid.');
  await page.locator('#checkEmailVerification').click();
  await page.waitForFunction(() => window.campusFirebaseAuth.auth.currentUser?.emailVerified === true && document.querySelector('#emailVerification').classList.contains('hidden'));
}
