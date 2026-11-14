import { publicMemberName } from './profile-photo.js';

const publicCollege = profile => typeof profile?.college === 'string' ? profile.college.trim().slice(0, 100) : '';

export function publicMemberLabel(profile) {
  return [publicMemberName(profile?.name), publicCollege(profile)].filter(Boolean).join(', ');
}

export function matchesPublicMember(profile, query = '') {
  return `${publicMemberName(profile?.name)} ${publicCollege(profile)}`.toLowerCase().includes(String(query ?? '').trim().toLowerCase());
}
