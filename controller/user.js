const bcrypt = require('bcryptjs')

const User = require('../models/User')
const genAccTkn = require('../helpers/genAccessToken')
// const {
//   validateRegisterInput,
//   validateLoginInput,
// } = require("../utils/va")