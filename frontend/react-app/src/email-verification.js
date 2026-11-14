export function hasVerifiedEmail(user) {
  return !!user && typeof user.uid === 'string' && user.uid.length > 0
    && user.isAnonymous !== true && user.emailVerified === true
    && typeof user.email === 'string' && user.email.trim().length > 0;
}
