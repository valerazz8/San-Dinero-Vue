const BASE_URL = "https://san-dinero-game.herokuapp.com"
const LOGIN_URL = BASE_URL+"/users/sign_in"
const REGISTER_URL = BASE_URL+"/users"
const HEALTH = BASE_URL+"/health"
const HEALTH_OPTIONS = BASE_URL + "/health_options"
const CHARACTERS = BASE_URL + "/characters"
const CHARACTERS_HEALTH_UPDATE = BASE_URL + "/characters/%character_id%/health_options"
const CHARACTERS_HEALTH_REFRESH = BASE_URL + "/characters/%character_id%/refresh_health_options"
const CHARACTERS_TRANSACTION = BASE_URL + "/characters/%character_id%/money_transfer"

const ADMIN_CHARACTERS = BASE_URL + "/admin/characters"
const ADMIN_UNLOCK_SKILL = BASE_URL + "/admin/unlock_skill"
const ADMIN_UPDATE_BALANCE = BASE_URL + "/admin/update_balance"
const ADMIN_FREEZE_HEALTH_OPTIONS = BASE_URL + "/admin/freeze_health_options"

function userToApiLogin(email, password) {
  return {
    "user": {
      "email": email,
      "password": password
    }
  }
}

export {
  BASE_URL,
  LOGIN_URL,
  REGISTER_URL,
  HEALTH,
  HEALTH_OPTIONS,
  CHARACTERS,
  CHARACTERS_HEALTH_UPDATE,
  CHARACTERS_HEALTH_REFRESH,
  CHARACTERS_TRANSACTION,

  ADMIN_CHARACTERS,
  ADMIN_UNLOCK_SKILL,
  ADMIN_UPDATE_BALANCE,
  ADMIN_FREEZE_HEALTH_OPTIONS,
  userToApiLogin
}