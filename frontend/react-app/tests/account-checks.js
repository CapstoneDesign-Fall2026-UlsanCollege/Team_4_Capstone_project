import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
if(process.env.GCLOUD_PROJECT !== 'demo-campusvibe-feed' || !process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST)throw new Error('Run this coordinator through emulators:exec for demo-campusvibe-feed only.');
const cwd=fileURLToPath(new URL('../',import.meta.url));
const env={...process.env,FEED_TEST_URL:process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186',SUGGEST_TEST_URL:process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186'};
for(const args of [['--test','tests/feed-rules.test.js'],['tests/account-persistence.browser.js'],['tests/suggestions.browser.js'],['tests/shared-feed.browser.js'],['tests/profile-photos.browser.js']]){
  const result=spawnSync(process.execPath,args,{cwd,env,stdio:'inherit'});
  if(result.status !== 0)process.exit(result.status || 1);
}
