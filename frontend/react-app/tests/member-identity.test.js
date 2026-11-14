import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesPublicMember, publicMemberLabel } from '../src/member-identity.js';

const profile = { name: 'Same Name', college: 'North College', id: 'private-uid-12345678901234567890', email: 'private@example.com' };
test('identity labels use public name and college without account IDs or email addresses', () => {
  assert.equal(publicMemberLabel(profile), 'Same Name, North College');
  assert.equal(publicMemberLabel({ ...profile, college: 'South College' }), 'Same Name, South College');
  assert.equal(publicMemberLabel({ id: profile.id, email: profile.email }), 'Student');
  assert.equal(publicMemberLabel(undefined), 'Student');
});
test('people and conversation search matches only public identity fields', () => {
  for (const query of ['', 'same name', 'NORTH', '  north college  ', 'Same Name North']) assert.equal(matchesPublicMember(profile, query), true);
  for (const query of [profile.id, profile.email, 'South College']) assert.equal(matchesPublicMember(profile, query), false);
});
