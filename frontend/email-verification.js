let verificationUser = null;
let verificationBusy = false;
let verificationGeneration = 0;
let verificationSendAfter = 0;
let verificationTimer = null;

function resetEmailVerification() {
  verificationUser = null;verificationBusy = false;verificationSendAfter = 0;
  ++verificationGeneration;clearTimeout(verificationTimer);
}

function paintVerificationControls() {
  $('#sendVerificationEmail').disabled = verificationBusy || Date.now() < verificationSendAfter || !verificationUser?.email;
  $('#checkEmailVerification').disabled = verificationBusy;
  $('#emailVerification').setAttribute('aria-busy', String(verificationBusy));
}

function verificationFeedback(message, failed = false) {
  const feedback = $('#emailVerificationFeedback');
  feedback.textContent = message;
  feedback.classList.toggle('is-error', failed);
}

function beginEmailVerification(user) {
  const changed = verificationUser?.uid !== user.uid;
  if (changed) resetEmailVerification();
  verificationUser = user;currentSession = null;
  closeAuth();$('#dashboardDialog').close();$('#passwordResetDialog').close();
  $('#verificationEmail').textContent = user.email || 'this account';
  if (changed) verificationFeedback('Confirm your email before using member features.');
  updateNav();paintVerificationControls();
  if (changed) $('#emailVerificationTitle').focus();
}

async function sendVerificationEmail() {
  const { auth, sendEmailVerification } = window.campusFirebaseAuth;
  const user = verificationUser, generation = verificationGeneration;
  if (!user || verificationBusy || Date.now() < verificationSendAfter || auth.currentUser?.uid !== user.uid) return;
  const current = () => verificationUser?.uid === user.uid && auth.currentUser?.uid === user.uid && generation === verificationGeneration;
  verificationBusy = true;paintVerificationControls();verificationFeedback('Sending your verification email...');
  try {
    await sendEmailVerification(user);
    if (!current()) return;
    verificationSendAfter = Date.now() + 60000;
    verificationTimer = setTimeout(() => { if (current()) paintVerificationControls(); }, 60000);
    verificationFeedback('Verification email sent. Check your inbox and spam folder, open the link, then return here. You can resend after one minute.');
  } catch (error) {
    if (!current()) return;
    verificationFeedback(error?.code === 'auth/too-many-requests' ? 'Too many email requests. Please wait a few minutes before trying again.' : 'The verification email could not be sent. Check your connection and try again.', true);
  } finally { if (current()) { verificationBusy = false;paintVerificationControls(); } }
}

async function checkEmailVerification() {
  const { auth, reload, getIdToken, hasVerifiedEmail } = window.campusFirebaseAuth;
  const user = verificationUser, generation = verificationGeneration;
  if (!user || verificationBusy || auth.currentUser?.uid !== user.uid) return;
  const current = () => verificationUser?.uid === user.uid && auth.currentUser?.uid === user.uid && generation === verificationGeneration;
  verificationBusy = true;paintVerificationControls();verificationFeedback('Checking your email verification...');
  try {
    await reload(user);
    if (!current()) return;
    if (!hasVerifiedEmail(user)) { verificationFeedback('Your email is not verified yet. Open the link in your inbox, then select “I have verified my email”.', true);return; }
    await getIdToken(user, true);
    if (!current()) return;
    startSession(user);showToast('Email verified. Welcome to CampusVibes!');
  } catch {
    if (current()) verificationFeedback('Verification could not be checked. Check your connection and try again.', true);
  } finally { if (current()) { verificationBusy = false;paintVerificationControls(); } }
}

async function leaveEmailVerification() {
  const { auth, signOut } = window.campusFirebaseAuth;
  try {
    if (auth.currentUser) await signOut(auth);
    resetEmailVerification();currentSession = null;updateNav();$('#landingEmail').focus();
  } catch { verificationFeedback('Could not sign out. Check your connection and try again.', true); }
}

function setupEmailVerification() {
  $('#sendVerificationEmail').addEventListener('click', sendVerificationEmail);
  $('#checkEmailVerification').addEventListener('click', checkEmailVerification);
  $('#verificationDifferentEmail').addEventListener('click', leaveEmailVerification);
}
