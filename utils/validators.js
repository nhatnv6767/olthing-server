module.exports.validateRegisterInput = (
  name, username, email, phone, password,
) => {
  const errors = {}

  if (name.trim() === '') {
    errors.name = 'Tên không được để trống'
  }
  if (username.trim() === '') {
    errors.username = 'Tên đăng nhập không được để trống'
  }
  if (email.trim() === '') {
    errors.email = 'Email không được để trống'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Cần phải đúng định dạng của 1 email'
    }
  }
  if (phone.trim() === '') {
    errors.phone = 'Không được để trống số điện thoại'
  }
  if (password === '') {
    errors.password = 'Mật khẩu không được để trống'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }

}

module.exports.validateLoginInput = (email, password) => {
  const errors = {}

  if (email.trim() === '') {
    errors.email = 'Email không được để trống'
  }
  if (password.trim() === '') {
    errors.password = 'Mật khẩu không được để trống'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports.validateOrder = (
  firstName, lastName, email, phone, country, address, city, postCode,
) => {
  const errors = {}
  console.log(firstName)

  if (firstName.trim() === '') {
    errors.firstName = 'Họ không được để trống'
  }
  if (lastName.trim() === '') {
    errors.lastName = 'Tên không được để trống'
  }
  if (email.trim() === '') {
    errors.email = 'Email không được để trống'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Cần phải đúng định dạng của 1 email'
    }
  }
  if (phone.trim() === '') {
    errors.phone = 'Không được để trống số điện thoại'
  }
  if (country.trim() === '') {
    errors.country = 'Không được để trống tỉnh'
  }

  if (address.trim() === '') {
    errors.address = 'Không được để trống địa chỉ'
  }
  if (city.trim() === '') {
    errors.city = 'Không được để trống tên thành phố'
  }
  if (postCode.trim() === '') {
    errors.postCode = 'Không được để trống mã bưu điện'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }

}