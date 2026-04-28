const sessions = {};

function getSession(user) {
  if (!sessions[user]) {
    sessions[user] = { step: 'start' };
  }
  return sessions[user];
}

module.exports = { getSession };