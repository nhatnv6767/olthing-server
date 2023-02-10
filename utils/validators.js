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
      errors.email = "Cần phải đúng định dạng của 1 email"
    }
  }
  if (phone.trim() === "") {
    errors.phone = "Không được để trống số điện thoại"
  }
  if (password === "") {
    errors.password = "Mật khẩu không được để trống"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }

}